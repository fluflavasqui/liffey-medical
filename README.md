# Liffey Medical — website redesign concept

A redesign proposal for [liffeymedical.ie](https://www.liffeymedical.ie), built with the practice's existing content, prices and online booking calendars.

> This is a design concept, not the official website. It is excluded from search engines (`noindex` + `robots.txt`).

## What's improved

- **Book without leaving the page** — every "Book" button opens a booking drawer with the practice's existing Acuity calendars embedded (GP in clinic, phone, medical card/EHIC, bloods, STI, PrEP, visa, flu vaccine).
- **One GP appointments page** instead of three — in clinic / by phone / medical card & EHIC as tabs.
- **Searchable price list** with category filters, and one source of truth for every price.
- **Blood test catalogue** with filters and an expandable "What's included" for each test.
- **Mobile first** — sticky Call / Book / Directions bar, full-screen menu, large tap targets.
- **Clear navigation** — services menu with prices, breadcrumbs, FAQ built from the practice policies.
- **Getting here** — map, Luas, bus routes and parking in one place, with copy-address and directions.
- **Accessible** — semantic HTML, keyboard-navigable tabs and drawer (focus trap, Esc to close), skip link, reduced-motion support.

## Stack

Plain HTML, CSS and JavaScript (ES modules). No build step, no dependencies.

```
index.html        page shell
css/styles.css    design system and layout
js/data.js        all content: services, prices, policies, contact details, booking links
js/app.js         router, pages and interactions
js/icons.js       inline SVG icons and logo mark
```

To change a price or text, edit `js/data.js` — every page reads from it.

## Run locally

```bash
npx http-server . -p 5173
```

Then open http://127.0.0.1:5173.
