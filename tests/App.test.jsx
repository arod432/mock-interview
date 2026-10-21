// These are acceptance tests, not a description of the starter's buggy behavior.
// They intentionally fail until the candidate fixes the app.
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, test, vi } from 'vitest';
import { requestProducts } from '../src/api.js';
import App from '@interview-app';

vi.mock('../src/api.js', () => ({ requestProducts: vi.fn() }));

const cheap = { id: 1, title: 'Budget Phone', price: 25 };
const boundary = { id: 2, title: 'Exactly Fifty', price: 50 };
const expensive = { id: 3, title: 'Premium Phone', price: 200 };
const laptop = { id: 4, title: 'Laptop Result', price: 900 };

function response(products, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => products === null ? { message: 'Unavailable' } : { products },
  };
}

function deferred() {
  let resolve;
  const promise = new Promise((done) => { resolve = done; });
  return { promise, resolve };
}

beforeEach(() => {
  vi.resetAllMocks();
});

test('the budget filter updates immediately and can be turned off', async () => {
  requestProducts.mockResolvedValue(response([cheap, boundary, expensive]));
  const user = userEvent.setup();
  render(<App />);
  await screen.findByText('Premium Phone');

  await user.click(screen.getByRole('checkbox'));
  expect(screen.getByText('Budget Phone')).toBeInTheDocument();
  expect(screen.queryByText('Exactly Fifty')).not.toBeInTheDocument();
  expect(screen.queryByText('Premium Phone')).not.toBeInTheDocument();

  await user.click(screen.getByRole('checkbox'));
  expect(screen.getByText('Premium Phone')).toBeInTheDocument();
  expect(requestProducts).toHaveBeenCalledTimes(1);
});

test('an older response cannot overwrite results for the newest query', async () => {
  const slow = deferred();
  requestProducts.mockImplementation((query) => query === 'phone'
    ? slow.promise
    : Promise.resolve(response([laptop])));
  render(<App />);

  fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'laptop' } });
  await screen.findByText('Laptop Result');
  // The mock deliberately ignores AbortSignal: stale writes still need guarding.
  await act(async () => { slow.resolve(response([cheap])); });

  expect(screen.getByText('Laptop Result')).toBeInTheDocument();
  expect(screen.queryByText('Budget Phone')).not.toBeInTheDocument();
});

test('an older request cannot clear the newest request loading indicator', async () => {
  const first = deferred();
  const second = deferred();
  requestProducts.mockImplementation((query) => query === 'phone'
    ? first.promise
    : second.promise);
  render(<App />);
  fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'laptop' } });

  await act(async () => { first.resolve(response([cheap])); });
  expect(screen.getByRole('status')).toHaveTextContent('Loading products');

  await act(async () => { second.resolve(response([laptop])); });
  expect(screen.getByText('Laptop Result')).toBeInTheDocument();
});

test('HTTP 503 is an error, not an empty catalog', async () => {
  requestProducts.mockResolvedValue(response(null, 503));
  render(<App />);
  expect(await screen.findByRole('alert')).toHaveTextContent('Could not load products');
  expect(screen.queryByText(/No products found/)).not.toBeInTheDocument();
});

test('a successful empty response shows the empty state', async () => {
  requestProducts.mockResolvedValue(response([]));
  render(<App />);
  expect(await screen.findByText(/No products found/)).toBeInTheDocument();
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});

test('a network failure shows an error', async () => {
  requestProducts.mockRejectedValue(new TypeError('Network unavailable'));
  render(<App />);
  expect(await screen.findByRole('alert')).toHaveTextContent('Could not load products');
});
