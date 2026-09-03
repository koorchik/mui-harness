# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**mui-harness** is a TypeScript library of test harnesses for Material UI (MUI) v6, v7 and v9 components, built on `dom-harness`. Each harness wraps a MUI component and exposes a clean API for querying state and simulating interactions — no raw DOM selectors in tests.

- **Language/Runtime:** TypeScript 5.9, ESM-only, Node >=20 (CI runs 22, 24, 26)
- **Framework:** React 19, MUI 9.4 (dev target); peer range `^6 || ^7 || ^9`, all three majors run in CI
- **Testing:** Vitest 4.1 + @testing-library/react 16 + jsdom 30
- **Base class:** `DomHarness` from `dom-harness` (sibling dir at `../dom-harness`)

## Commands

```bash
npm test          # Run tests in watch mode
npm run test:run  # Run tests once (CI mode)
npm run test:matrix  # Run tests against @mui/material 6, 7 and 9 (installs each with --no-save, then restores the lockfile)
npm run typecheck # tsc --noEmit with the dev config
npm run build     # Compile TypeScript → dist/
npm run clean     # Remove dist/
```

Run a single test file:
```bash
npx vitest run src/ButtonHarness.test.tsx
```

Run tests matching a pattern:
```bash
npx vitest run --testNamePattern "disables"
```

## Architecture

All source lives in `src/`. Flat structure — no subdirectories.

**Each harness follows this pattern:**
- Extends `DomHarness` (or another harness like `TextFieldHarness` for `AutocompleteHarness`)
- Declares `static selector` (MUI CSS class)
- Provides static finders: `getByText()`, `getByName()` (delegates to inherited `match()`)
- State queries as getters/methods: `getText()`, `isDisabled()`, `getValue()`
- User interactions as async methods: `click()`, `type()`, `toggle()` (via `this.user` from UserEvent)
- Optional elements use try/catch pattern (method returns boolean)
- Each harness has a co-located `.test.tsx` file (exceptions: `TableCellHarness`, `TableContainerHarness`, and `TableRowHarness` are tested via `TableHarness.test.tsx`; `StepHarness` via `StepperHarness.test.tsx`)

**Barrel export:** `src/index.ts` re-exports all 48 harnesses, sorted alphabetically. Use `.js` extensions in import paths (NodeNext resolution).

**Portaled components** (Dialog, Snackbar, Menu, Popover, Drawer): These MUI components render outside the normal DOM tree, so their harness finders intentionally omit the `container` argument to search the full document.

## Git

- Never add AI agent attribution to commit messages: no `Co-Authored-By` trailers, no `Claude-Session` or similar links, no "Generated with ..." lines. Commit messages describe the change only.

## Conventions

- No linter/formatter configured — match existing code style (no semicolons in harness files would be wrong; the code uses semicolons)
- Tests use Vitest globals (`describe`, `it`, `expect` — no imports needed)
- Tests render components with `render()` from @testing-library/react, then query via harness static methods
- Interactions use the harness's `this.user` (UserEvent), not `fireEvent`
- Assertions use jest-dom matchers (via `@testing-library/jest-dom/vitest` in setupTests)

## Key Patterns (from docs/BEST_PRACTICES.md)

- **Never access raw DOM** in tests or app harnesses — always go through a harness
- **Scope queries to `this.root`** to prevent DOM leakage (exception: portaled elements)
- **Extend framework harnesses** when wrapping MUI containers (e.g., extend `DialogHarness` not `DomHarness`)
- **Getters for always-present children**, methods with try/catch for optional elements
- **Keep harnesses minimal** — only expose what tests actually need
- **Class names must work on every supported MUI major** — when a class was renamed between versions, match both (e.g. `.MuiLinearProgress-bar2Buffer, .MuiLinearProgress-bar2`); never branch on the MUI version
- **No fixed sleeps** — `user.*` interactions are awaited inside `act()`, so the DOM is up to date when they resolve
