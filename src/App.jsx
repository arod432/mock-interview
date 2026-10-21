import { useEffect, useState } from 'react';
import { requestProducts } from './api.js';
import ProductList from './ProductList.jsx';

export default function App() {
  const [query, setQuery] = useState('phone');
  const [products, setProducts] = useState([]);
  const [budgetOnly, setBudgetOnly] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function search() {
      setLoading(true);
      setError('');

      try {
        const response = await requestProducts(query);
        const data = await response.json();
        setProducts(data.products ?? []);
      } catch {
        setError('Could not load products. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    search();
  }, [query]);

  useEffect(() => {
    setVisibleProducts(
      budgetOnly ? products.filter((product) => product.price < 50) : products,
    );
  }, [products]);

  return (
    <main>
      <header>
        <span className="eyebrow">A small search exercise</span>
        <h1>Product Finder</h1>
        <p>Explore a sample catalog. Find something that fits your budget.</p>
      </header>

      <section className="controls" aria-label="Search controls">
        <label htmlFor="query">Search products</label>
        <input
          id="query"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try phone, laptop, or perfume"
        />
        <label className="checkbox">
          <input
            type="checkbox"
            checked={budgetOnly}
            onChange={(event) => setBudgetOnly(event.target.checked)}
          />
          Only products under $50
        </label>
      </section>

      {loading && <p role="status">Loading products…</p>}
      {!loading && error && <p role="alert">{error}</p>}
      {!loading && !error && (
        <section aria-label="Search results">
          <p className="result-count" role="status">
            {visibleProducts.length} products shown · up to 24 matches loaded
          </p>
          {visibleProducts.length === 0 ? (
            <p>No products found. Try another search or change your filter.</p>
          ) : (
            <ProductList products={visibleProducts} />
          )}
        </section>
      )}

      <footer>
        Sample data from <a href="https://dummyjson.com/">DummyJSON</a>.
        No account or API key required.
      </footer>
    </main>
  );
}
