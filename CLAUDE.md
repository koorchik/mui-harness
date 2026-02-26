# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**mui-harness** is a TypeScript library of test harnesses for Material UI (MUI) v6 components, built on `dom-harness`. Each harness wraps a MUI component and exposes a clean API for querying state and simulating interactions — no raw DOM selectors in tests.

- **Language/Runtime:** TypeScript 5.7, ESM-only, Node >=18
- **Framework:** React 19, MUI v6.3.1
- **Testing:** Vitest 2.1 + @testing-library/react 16 + jsdom
- **Base class:** `DomHarness` from `dom-harness` (sibling dir at `../dom-harness`)

## Commands

```bash
npm test          # Run tests in watch mode
npm run test:run  # Run tests once (CI mode)
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
- Each harness has a co-located `.test.tsx` file (exception: `TableCellHarness`, `TableContainerHarness`, and `TableRowHarness` are tested via `TableHarness.test.tsx`)

**Barrel export:** `src/index.ts` re-exports all 40 harnesses. Use `.js` extensions in import paths (NodeNext resolution).

**Portaled components** (Dialog, Snackbar, Menu, Popover, Drawer): These MUI components render outside the normal DOM tree, so their harness finders intentionally omit the `container` argument to search the full document.

## Git

- Do not add `Co-Authored-By` trailers to commits.

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
