# Product Finder: debugging exercise

## Context

You have inherited a small product-search app. Users say it sometimes behaves unexpectedly. Your task is to investigate, explain what is happening, and improve its correctness.

Use JavaScript and React. You do not need to redesign the page or introduce libraries.

## Setup

If you don't have Node.js yet, follow [NODE_SETUP.md](NODE_SETUP.md). With Node.js 22.12+ installed, run these commands in the project folder:

```sh
npm ci
npm run dev
```

The app uses DummyJSON's public API. A search loads at most 24 matches. An empty search loads the first page of the catalog; it does not need special validation. The budget filter applies to **loaded results only**, not to all products in the API.

## Expected behavior

- Search results reflect the latest text in the search box.
- “Only products under $50” updates immediately, without another API request.
- Turning that filter off restores the loaded results. Exactly $50 is **not** under $50.
- While the current search is pending, show a loading message.
- Distinguish a successful search with no matches from a failed request.

## Working agreement

Start by reproducing a problem, then talk through your hypothesis before changing code. Explain why a fix works and how you would test it. It is fine to ask questions or look up API details.

Most changes should be in `src/App.jsx`. `src/api.js` is provided interview support and does not need to be changed. There is no need for pagination, debouncing, caching, or a new architecture unless we discuss it as a follow-up.

The interviewer can provide slow-request and server-error scenarios. You may run `npm test` for acceptance checks and `npm run build` to check compilation. Some acceptance tests fail intentionally on the starter.

Please do not open `INTERVIEWER_GUIDE.md` or `interviewer/` during the exercise if they are present.
