# AhVir.github.io

Personal academic portfolio built with Jekyll and deployed to GitHub Pages.

## Run Locally

### 1) Prerequisites

- Ruby + Bundler
- Node.js + npm
- Python 3 + pip

Install project dependencies:

```bash
bundle install
npm install
pip install -r requirements.txt
```

This project uses `jekyll-jupyter-notebook`, so make sure the `jupyter` CLI is available:

```bash
pip install jupyter
```

### 2) Start the development server

```bash
bundle exec jekyll serve --livereload
```

Then open:

- http://127.0.0.1:4000

### 3) Build the site

```bash
bundle exec jekyll build
```

## Prettier

This repo already includes Prettier with the Liquid plugin.

Check formatting:

```bash
npx prettier . --check
```

Auto-fix formatting:

```bash
npx prettier . --write
```

Prettier uses:

- `.prettierrc`
- `.prettierignore`
