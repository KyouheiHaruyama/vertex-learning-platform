# Vertex

An AI-powered learning platform. Authors create courses in Sanity; a Next.js
site serves them to learners. Search returns ranked cards that link to the exact
second in a lesson video where a topic is taught.

## Workspaces

This repo holds two standalone workspaces. They deploy independently and each
manages its own dependencies — there is no workspace tooling at the root.

| Path      | What it is                                            | Dev server |
|-----------|-------------------------------------------------------|------------|
| `web/`    | Next.js app: pages, search UI, server-side integration | `:3000`    |
| `studio/` | Sanity Studio: schema and content authoring            | `:3333`    |

## Getting started

```bash
# 1. Environment. Copy the canonical list and fill in the values.
cp .env.example web/.env.local     # then delete the studio-only lines
cp studio/.env.example studio/.env

# 2. Install
npm --prefix web install
npm --prefix studio install

# 3. Run (separate terminals)
npm --prefix web run dev           # http://localhost:3000
npm --prefix studio run dev        # http://localhost:3333
```

The dataset is private, so `web` needs a Sanity **Viewer** token in
`SANITY_API_READ_TOKEN`. Create one at
<https://www.sanity.io/manage> → your project → API → Tokens.

## Types

TypeGen lives in the Studio and writes into the web app:

```bash
npm --prefix studio run typegen    # schema.json + web/sanity.types.ts
```

`sanity dev` regenerates them automatically as queries change, so you rarely
need to run this by hand. Both `studio/schema.json` and `web/sanity.types.ts`
are committed.

## Checks

```bash
cd web && npx tsc --noEmit && npm run lint && npm run build
cd studio && npx tsc --noEmit
```

## Conventions

See `AGENTS.md` for the architecture rules this project is built to, and
`prompts/` for the implementation prompt behind each change.
