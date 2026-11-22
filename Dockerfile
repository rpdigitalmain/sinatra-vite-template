FROM node:24-bookworm-slim AS frontend
WORKDIR /build

COPY package.json package-lock.json ./
RUN npm ci

COPY vite.config.js ./
COPY src/ ./src/
RUN npm run build

FROM ruby:4.0-bookworm AS gems
WORKDIR /app
ENV BUNDLE_DEPLOYMENT=1 BUNDLE_WITHOUT=development:test

COPY Gemfile Gemfile.lock ./
RUN bundle install

FROM ruby:4.0-slim-bookworm AS runtime
WORKDIR /app
ENV APP_ENV=production RACK_ENV=production PUMA_HOST=0.0.0.0 PORT=4567 \
    BUNDLE_DEPLOYMENT=1 BUNDLE_WITHOUT=development:test

RUN groupadd --system app && useradd --system --gid app --no-create-home app

COPY --from=gems /usr/local/bundle /usr/local/bundle
COPY Gemfile Gemfile.lock app.rb config.ru ./
COPY app/ ./app/
COPY config/ ./config/
COPY public/ ./public/
COPY --from=frontend /build/dist/ ./dist/

USER app
EXPOSE 4567
CMD ["bundle", "exec", "puma", "-C", "config/puma.rb", "config.ru"]
