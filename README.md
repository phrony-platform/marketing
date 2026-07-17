# Phrony marketing site

Source for [phrony.com](https://phrony.com): the marketing homepage, product pages, and documentation (Agent Spec, runtime guides, TypeScript SDK reference, quick start).

Related open-source projects live under [github.com/phrony-platform](https://github.com/phrony-platform), including the [runtime](https://github.com/phrony-platform/runtime).

## Development

Requires Node.js 20+ and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3020](http://localhost:3020).

## Scripts

| Command       | Description              |
| ------------- | ------------------------ |
| `pnpm dev`    | Dev server (port 3020)   |
| `pnpm build`  | Production build         |
| `pnpm start`  | Serve production build   |
| `pnpm lint`   | ESLint                   |

## Environment variables

Optional overrides for local development:

| Variable | Purpose |
| -------- | ------- |
| `NEXT_PUBLIC_COCKPIT_ORIGIN` | Phrony app origin (default `https://app.phrony.com`) |

`.env*` files are gitignored. No secrets are required to run the site locally.

## Deployment

The app is configured for standalone output (`next.config.ts`). Build with `pnpm build`, then run `pnpm start` or deploy the `.next/standalone` output in a container.
