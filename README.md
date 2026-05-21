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

## Running Tests

```bash
bin/rails test
```

## Deployment

```bash
bin/rails tailwindcss:build   # compile CSS before deploying
bin/rails assets:precompile
```
