# Frame.byFrame Photo Gallery

A responsive photo gallery built with React, Vite, Tailwind CSS, and the JSONPlaceholder photos API.

## Features

- Loads and displays the first 100 photos with native `fetch()`.
- Search by photo title or ID and combine the search with album filtering.
- Preview full-size images in an accessible, keyboard-operable modal.
- Persist the light/dark theme preference in local storage.
- Responsive photo grid, loading skeletons, retryable errors, and helpful empty states.

## Getting started

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

## Checks

```sh
npm run lint
npm run build
```

The production output is written to `dist/`. The app fetches public photo data from `https://jsonplaceholder.typicode.com/photos`; no API key or environment variables are required.
