# Once Minji

A Rails application with a **Retro OS (Win95/98)** UI theme built on TailwindCSS v4 + DaisyUI v5.

---

## ⚠️ CSS — After Every Edit

The CSS source lives in:

```
app/assets/tailwind/application.css
```

TailwindCSS does **not** auto-compile in production or when running `bin/rails server` alone.
After editing any CSS you **must** rebuild manually:

```bash
bin/rails tailwindcss:build
```

The compiled output is written to `app/assets/builds/tailwind.css` and served by the asset pipeline.

### Watch mode (auto-rebuild during development)

Use the full dev process manager so Tailwind rebuilds on every save:

```bash
bin/dev
```

This runs both the Rails server and `tailwindcss:watch` together via `Procfile.dev`.

---

## Getting Started

* Ruby version — see `.ruby-version`
* Database: `bin/rails db:create db:migrate db:seed`
* Start dev server: `bin/dev`

---

## 🏷️ App Version

The version string is read from environment variables at boot time and displayed in:
- The **taskbar** version badge (bottom-right, click to open About dialog)
- The **window status bar** (bottom-right panel)
- The **About dialog** (Start menu → About Once Minji…)

### Environment variables

| Variable | Description | Example |
|---|---|---|
| `APP_VERSION` | Semantic version shown in the UI | `2.1.0` |
| `APP_BUILD` | Build identifier (`YYMMDDNN`) | `26052201` |

If neither variable is set the app starts fine using the defaults (`1.0.0` / `26052201`).

### Local development

Copy the example file and edit it:

```bash
cp .env.example .env
# then edit .env:
#   APP_VERSION=1.2.0
#   APP_BUILD=26052201
```

> `.env` is git-ignored. `.env.example` is committed as a reference template.

To load `.env` automatically install [dotenv-rails](https://github.com/bkeepers/dotenv):
```bash
# Gemfile (development/test group)
gem "dotenv-rails", groups: [:development, :test]
```
Or pass variables inline:
```bash
APP_VERSION=1.2.0 APP_BUILD=26052201 bin/dev
```

### Docker / docker-compose

```yaml
# docker-compose.yml
services:
  web:
    environment:
      APP_VERSION: "2.1.0"
      APP_BUILD:   "26052202"
```

### Dockerfile

```dockerfile
ENV APP_VERSION=2.1.0
ENV APP_BUILD=26052202
```

Or inject at build time:

```bash
docker build \
  --build-arg APP_VERSION=2.1.0 \
  --build-arg APP_BUILD=26052202 \
  -t once_minji .
```

```dockerfile
# Dockerfile — receive build args
ARG APP_VERSION=1.0.0
ARG APP_BUILD=26052201
ENV APP_VERSION=$APP_VERSION
ENV APP_BUILD=$APP_BUILD
```

### Kamal (deploy.yml)

```yaml
# config/deploy.yml
env:
  clear:
    APP_VERSION: "2.1.0"
    APP_BUILD:   "26052202"
```

### Bumping the version

1. Decide the new version string (follow [semver](https://semver.org): `MAJOR.MINOR.PATCH`)
2. Set `APP_BUILD` to today's date + sequence — e.g. `26052201` = 22 May 2026, build #1
3. Update `.env` locally, and set the env vars in your deployment config

No code changes are required.

---

## Running Tests

```bash
bin/rails test
```

## Deployment

```bash
bin/rails tailwindcss:build   # compile CSS before deploying
bin/rails assets:precompile
```
