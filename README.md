# Product Finder — mock interview

A small React + JavaScript app that searches the public [DummyJSON API](https://dummyjson.com/docs/products). No API key, backend, or account needed.

**This app is intentionally buggy.** It is an interview exercise, not production-ready code.

## Run it

Install **Node.js 22.12+** (a current Node LTS is recommended). See [NODE_SETUP.md](NODE_SETUP.md) for step-by-step installation instructions for macOS, Windows, and Linux, plus troubleshooting.

Then run in this folder:

```sh
npm ci
npm run dev
```

Open the local URL printed in the terminal (normally http://127.0.0.1:5173). Internet access is required for live product data. Stop the server with **Ctrl+C**.

## Where to start

- **Candidate:** read [CANDIDATE_BRIEF.md](CANDIDATE_BRIEF.md), then work in `src/App.jsx`.
- **Reference implementation:** `interviewer/App.solution.jsx`. It is not used by the running app.

This is set up for a **45–60 minute** practice interview. For 30 minutes, focus on the filter and discuss one other issue.

## Checks

```sh
npm run build          # Check the app builds
npm test               # Acceptance tests for the candidate's current code
npm run test:solution  # Run the same tests against the reference implementation
```

**On the untouched starter, `npm test` should report 4 failed tests and 2 passed tests.** Those failures represent the exercise. The reference solution should pass all 6 tests. Tests mock the API and work offline after installation.

The app deliberately uses ordinary React state and effects: no TypeScript, routing, UI framework, or state-management library.

## Sharing with your colleague

For an open-book practice session, you can share the whole folder and ask them not to open the answer key. For a blind interview, share only:

- `src/`
- `index.html`, `package.json`, `package-lock.json`, `.gitignore`
- `vite.config.js`, `tests/`, `CANDIDATE_BRIEF.md`, `NODE_SETUP.md`

Do **not** share `INTERVIEWER_GUIDE.md` or `interviewer/`. If you also want them to discover requirements without test hints, hold back `tests/` initially. `npm run test:solution` is interviewer-only and will not work without the `interviewer/` folder; normal development, build, and candidate tests do not require it.
