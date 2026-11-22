# Sinatra + Vite Template

![Ruby 3.4 or 4.0](https://img.shields.io/badge/Ruby-3.4%20%7C%204.0-CC342D?logo=ruby&logoColor=white)
![Sinatra 4.2](https://img.shields.io/badge/Sinatra-4.2-222222)
![Node.js 24+](https://img.shields.io/badge/Node.js-24%2B-339933?logo=nodedotjs&logoColor=white)
![Vite 8](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)
[![MIT License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

Starter for a Sinatra application served by Puma, with vanilla JavaScript and Sass built by Vite.

## Requirements

- Ruby 3.4 or 4.0 and Bundler
- Node.js 24 or newer and npm

## Development

Install dependencies with `bundle install` and `npm ci`. Run the two servers in separate terminals.

```sh
bundle exec puma -C config/puma.rb config.ru
```

```sh
npm run dev
```

Open http://localhost:5173. Vite proxies `/health` to Puma on port 4567. If you change the backend port for development, update the proxy in `vite.config.js`.

## Build and run

Run `npm run build`, then start Puma and open http://127.0.0.1:4567. Sinatra serves the contents of `dist/`, which is generated from `src/`. Set `APP_ENV=production` for production. Puma uses `PUMA_HOST` and `PORT` for its bind address.

## Checks

```sh
bundle exec rake lint test
npm run lint
npx playwright install chromium
npm run test:e2e
```

RSpec tests live in `spec/` and Playwright tests in `test/`. The browser test builds the frontend and starts its own Puma process.
