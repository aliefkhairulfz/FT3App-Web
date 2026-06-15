<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Commands

- `pnpm dev` — dev server at localhost:3000
- `pnpm build` — production build
- `pnpm lint` — ESLint (flat config: `eslint.config.mjs`); only verification step (no tests, no typecheck)
- Prettier config: singleQuote, trailingComma: all, arrowParens: avoid, tabWidth: 4, printWidth: 200
- Use `pnpm dlx shadcn@latest add <component>` to add components

# Stack

- Next.js 16 (App Router) + React 19 + TypeScript 5 + pnpm (no lockfiles other than pnpm-lock.yaml)
- Tailwind CSS v4 via `@tailwindcss/postcss` — no `tailwind.config.js`; theme tokens defined in `app/globals.css` with `@theme`
- shadcn/ui radix-nova style — components use `data-slot` attributes; CSS imported via `@import "shadcn/tailwind.css"`
- `radix-ui` (monorepo v1.5), `class-variance-authority`, `tw-animate-css`, `sonner` (toasts), `next-themes`
- Path alias `@/*` maps to project root (`tsconfig.json`)

# Conventions

- **Imports**: `@/components/...`, `@/lib/...`, `@/components/ui/...`
- **Utils**: `cn()` from `@/lib/utils` (clsx + tailwind-merge)
- **Components**: `function` declarations; shadcn components use 2-space indent, app pages use 4-space (Prettier tabWidth: 4)
- **Radix slot pattern**: `asChild` prop uses `Slot.Root` from `radix-ui`
- **API**: backend at `NEXT_PUBLIC_API_URL` (default `http://localhost:3001`); uses `fetch()` with JSON, `credentials: 'include'`
- **Response types**: `ErrorResponseData<T>` and `SuccessResponseData<T>` in `@/lib/types`

# Structure

- `app/(auth)/login`, `app/(auth)/register`, `app/(auth)/register-verification` — auth pages
- `components/ui/` — shadcn-generated primitives (edit via registry re-import, not by hand)
- `lib/types.ts` — shared response type helpers
