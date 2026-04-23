# Gymshark Shopify Theme Clone

A Shopify theme built as a training project to replicate the look, feel, and functionality of the [Gymshark](https://gymshark.com) website.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Theme Structure](#theme-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Connecting to a Shopify Store](#connecting-to-a-shopify-store)
  - [Development Workflow](#development-workflow)
- [Key Features](#key-features)
- [Customisation (Theme Editor)](#customisation-theme-editor)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## About the Project

This repository is a learning/training ground for Shopify theme development. The goal is to build a pixel-perfect (or close-to-it) recreation of the Gymshark storefront using Shopify's **Liquid** templating language, standard **HTML/CSS/JavaScript**, and Shopify's **Online Store 2.0** section/block architecture.

> **Disclaimer:** This is a non-commercial, educational project. Gymshark branding, assets, and trademarks belong to Gymshark Ltd.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Templating | [Shopify Liquid](https://shopify.dev/docs/api/liquid) |
| Styles | CSS (custom properties + BEM) |
| Scripts | Vanilla JavaScript (ES2020+) |
| CLI tooling | [Shopify CLI 3](https://shopify.dev/docs/themes/tools/cli) |
| Version control | Git / GitHub |

---

## Theme Structure

```
shopify-theme/
├── assets/                  # CSS, JS, fonts, images
│   ├── base.css             # CSS custom properties & global resets
│   ├── theme.css            # Component styles
│   └── theme.js             # Global JavaScript
├── config/
│   ├── settings_schema.json # Theme Editor schema
│   └── settings_data.json   # Default theme settings
├── layout/
│   ├── theme.liquid         # Main layout (wraps every page)
│   └── password.liquid      # Password / Coming-soon page layout
├── locales/
│   └── en.default.json      # English translations
├── sections/                # Online Store 2.0 sections (drag-and-drop)
│   ├── announcement-bar.liquid
│   ├── header.liquid
│   ├── hero-banner.liquid
│   ├── featured-collection.liquid
│   ├── image-with-text.liquid
│   ├── newsletter.liquid
│   ├── rich-text.liquid
│   └── footer.liquid
├── snippets/                # Reusable Liquid partials
│   ├── product-card.liquid
│   ├── price.liquid
│   ├── breadcrumbs.liquid
│   ├── icon-cart.liquid
│   ├── icon-search.liquid
│   └── icon-account.liquid
└── templates/               # Page templates (JSON or Liquid)
    ├── index.json
    ├── product.json
    ├── collection.json
    ├── cart.liquid
    ├── page.json
    ├── blog.json
    ├── article.json
    ├── search.json
    ├── 404.json
    └── password.liquid
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18 (required by Shopify CLI)
- **Shopify CLI 3** – install once globally:
  ```bash
  npm install -g @shopify/cli @shopify/theme
  ```
- A **Shopify Partner account** and a development store (free at [partners.shopify.com](https://partners.shopify.com))

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/ephraimm-zm/shopify-theme.git
cd shopify-theme

# 2. Authenticate with your store
shopify auth login --store your-store.myshopify.com
```

### Connecting to a Shopify Store

1. Log in to your Shopify Partner account and create a **development store**.
2. Run `shopify auth login` and follow the browser prompt.
3. Use `shopify theme dev` to start the local preview server (see below).

### Development Workflow

```bash
# Start local development with hot-reload preview
shopify theme dev --store your-store.myshopify.com

# Push theme to the store (creates a new unpublished theme)
shopify theme push --store your-store.myshopify.com

# Pull the current live theme to sync remote changes locally
shopify theme pull --store your-store.myshopify.com

# Run the Shopify theme linter
shopify theme check
```

> The `shopify theme dev` command syncs local file changes to a preview URL in real time — no manual uploads needed.

---

## Key Features

| Feature | Description |
|---|---|
| **Announcement Bar** | Configurable top banner (promo messages, links) |
| **Sticky Header** | Navigation stays visible on scroll; transparent over hero |
| **Mega Menu** | Multi-column dropdown navigation matching Gymshark's layout |
| **Hero Banner** | Full-width video or image hero with headline + CTA |
| **Featured Collection** | Horizontal-scroll product grid with hover quick-add |
| **Image-with-Text** | Two-column editorial section |
| **Newsletter** | Email capture section |
| **Product Page** | Gallery, variant selectors, size guide, add-to-cart |
| **Collection Page** | Sidebar filters, sort, infinite scroll / pagination |
| **Cart Drawer** | Slide-in cart with upsell tiles |
| **Dark / Light Mode** | CSS custom-property driven colour switch |
| **Responsive** | Mobile-first layouts throughout |

---

## Customisation (Theme Editor)

All sections expose settings that are editable directly in the Shopify Theme Editor (`Customize` → Online Store):

- Colours, typography, and spacing via **Theme Settings**
- Each section has its own block-level controls (image, text, buttons, colours)
- Sections can be reordered, hidden, or duplicated without touching code

---

## Deployment

```bash
# Push and immediately publish as the live theme
shopify theme push --store your-store.myshopify.com --publish

# Or push without publishing (review in Theme Editor first)
shopify theme push --store your-store.myshopify.com
```

---

## Roadmap

- [x] Repo scaffold & README
- [ ] Global layout (`theme.liquid`, `password.liquid`)
- [ ] Header section with mega-menu
- [ ] Hero banner section
- [ ] Featured collection section
- [ ] Product page template & sections
- [ ] Collection page with filters
- [ ] Cart drawer (AJAX)
- [ ] Account pages
- [ ] Blog / Article templates
- [ ] Animations & micro-interactions
- [ ] Performance audit (Core Web Vitals)
- [ ] Accessibility audit (WCAG 2.1 AA)

---

## Contributing

Pull requests are welcome! Please:

1. Fork the repo and create a feature branch (`git checkout -b feature/my-section`).
2. Commit your changes with a descriptive message.
3. Open a PR against `main` describing what was changed and why.

---

## License

This project is for **educational purposes only**. All Gymshark brand assets, trademarks, and intellectual property belong to Gymshark Ltd. This repository does not distribute any Gymshark-owned content.
