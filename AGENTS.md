# AGENTS.md

## Cursor Cloud specific instructions

### Overview

Bonfire Bestiary is a TTRPG bestiary/monster database web app (Lerna monorepo with npm workspaces):
- **Frontend** (`app/`): React 19 + Vite + TypeScript
- **Backend** (`backend/server/`): Express.js + TypeScript
- **Shared** (`backend/common/`): Common interfaces/utilities

### Config files (gitignored)

Two config files are gitignored and must be created for the app to run:
- `app/src/frontend-config.ts` — exports URL constants (e.g. `accessURL`, `catalogURL`, `beastURL`). Point them at `http://localhost:3535`.
- `backend/server/server-config.ts` — exports server port, auth config, DB credentials, and feature flags. Set `fakeAuth` as a passthrough middleware and `collectMonsterCacheOn = false` for local dev.

### Running the dev environment

- **Install deps**: `npm install --legacy-peer-deps` (required due to `react-responsive-combo-box` peer dep conflict with React 19)
- **Frontend dev server**: `npm run dev` (Vite on port 5173)
- **Backend server**: `npm run server` (Express on port 3535, requires `tsx`)
- **Lint**: `npm run lint` (ESLint, pre-existing warnings/errors in the codebase)
- **Tests**: `npx jest --config app/jest.config.ts` (Jest + ts-jest; the `.tsx` tests pass, the `.js` duplicates fail due to ESM — this is pre-existing)

### PostgreSQL

The backend requires PostgreSQL. Tables include `bbindividualbeast`, `bbroles`, `usersAuth`, `obBase`, `obChallenges`, and many more. No migration files exist in the repo; tables must be created manually. For a minimal dev setup, create a `bestiary` database with user `bestiary`/`bestiary` and create at minimum the tables above.

### Key gotchas

- The `pg` package is used by the backend but was not listed in any `package.json` — install it at root level.
- `tsx` is used to run the backend in dev mode (`npx tsx`); it may prompt for installation on first use.
- The backend calls external APIs on startup (`srdEndpoint`, `treasureEndpoint`); these will fail in local dev (non-fatal, the server continues).
- `collectMonsterCacheOn` should be `false` in local dev to avoid heavy startup processing.
