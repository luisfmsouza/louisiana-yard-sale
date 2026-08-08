# Louisiana Yard Sale

A single-page listing site for Luis & Ana's garage sale ("Louisiana" = **Lu**is + **Ana**). Each item is a card with a photo, price, discount badge, and a **BUY** button that opens a pre-filled WhatsApp chat.

Built with [Next.js](https://nextjs.org/) (App Router) and TypeScript.

## Requirements

- Node.js version pinned in [`.nvmrc`](./.nvmrc) (`nvm use`)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site. It hot-reloads as you edit.

## Managing listings

Products are plain data in [`src/app/data.json`](./src/app/data.json) — no CMS or database. Each entry looks like:

```json
{
  "name": "Ikea BEKANT - Standing desk",
  "url": "https://www.ikea.com/...",
  "imageUrl": "/img/office_desk.jpeg",
  "originalPrice": 469,
  "price": 200,
  "details": ["Pick up in December"],
  "state": "available",
  "purchaser": "1"
}
```

- `imageUrl` points at a file under [`public/img`](./public/img).
- `url` is the original product listing, opened when the photo is clicked.
- `state` is one of `available`, `reserved`, `sold`, `notavailable` and controls the badge/overlay shown on the card.
- The discount badge is derived automatically from `price` vs `originalPrice`.

To add an item: drop its photo into `public/img`, then append an entry to `data.json`.

## Scripts

| Script                 | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start the dev server (Turbopack)         |
| `npm run build`        | Production build                         |
| `npm run start`        | Serve the production build               |
| `npm run lint`         | Lint with ESLint                         |
| `npm run typecheck`    | Type-check with `tsc --noEmit`           |
| `npm run format`       | Format the codebase with Prettier        |
| `npm run format:check` | Check formatting without writing changes |

CI (see [`.github/workflows/ci.yml`](./.github/workflows/ci.yml)) runs all of the above on every push and pull request.

## Tech stack

- [Next.js 15](https://nextjs.org/docs) (App Router, Turbopack)
- [React 19](https://react.dev/)
- TypeScript
- ESLint (flat config) + Prettier

## Deployment

The easiest way to deploy is [Vercel](https://vercel.com/new), the creators of Next.js. See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for other options.
