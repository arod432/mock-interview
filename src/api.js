// Interview support, not part of the debugging exercise.
// Normal mode always calls the public API. Scenarios make bugs easy to reproduce.
function wait(ms, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Aborted', 'AbortError'));
      return;
    }

    const onAbort = () => {
      clearTimeout(timer);
      reject(new DOMException('Aborted', 'AbortError'));
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);
      resolve();
    }, ms);
    signal?.addEventListener('abort', onAbort, { once: true });
  });
}

export async function requestProducts(query, { signal } = {}) {
  const scenario = new URLSearchParams(window.location.search).get('scenario');

  if (scenario === 'http-error') {
    return new Response(JSON.stringify({ message: 'Service temporarily unavailable' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const url = new URL('https://dummyjson.com/products/search');
  url.searchParams.set('q', query);
  url.searchParams.set('limit', '24');
  const response = await fetch(url, { signal });

  if (scenario === 'race') {
    // Hold the default search so a later search can finish first.
    await wait(query === 'phone' ? 4000 : 100, signal);
  }

  return response;
}
