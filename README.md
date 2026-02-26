# mui-harness

[![npm version](https://badge.fury.io/js/mui-harness.svg)](https://badge.fury.io/js/mui-harness)
[![npm downloads](https://img.shields.io/npm/dm/mui-harness.svg)](https://www.npmjs.com/package/mui-harness)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/mui-harness)](https://bundlephobia.com/package/mui-harness)

A collection of test harnesses for [Material UI](https://mui.com/) components, built on top of `dom-harness`. Each harness wraps a MUI component and exposes a clean API for querying rendered state and simulating user interactions — no CSS class selectors scattered across your tests.

## Why test harnesses?

You build your UI out of `<Button>`, `<TextField>`, and `<Dialog>` — your tests should work at the same level of abstraction.

**Same abstraction as your UI.** A harness lets you interact with a `ButtonHarness`, not a DOM node that happens to have a certain class. Tests read the way you think about the component.

**Tests survive implementation changes.** A component's internal markup, class names, and DOM structure are implementation details. When MUI changes them in a minor release (and it does), tests that reach into the DOM break. Harnesses absorb that change in one place.

**Composition matches your mental model.** A `LoginFormHarness` contains a `TextFieldHarness` and a `ButtonHarness`, just like the component tree. Tests read the way you think about the UI, not the way a browser sees it.

See the [dom-harness README](../dom-harness/README.md) for deeper background on the harness pattern.

## Examples

The [`examples/login-page`](examples/login-page) directory contains a complete, runnable example — a login page built with MUI components and tested entirely through harnesses. Look at it to see:

- **Harness composition in practice.** A `LoginPageHarness` contains an `AuthPanelHarness`, which contains `LoginFormHarness` and `RegistrationFormHarness`. Each layer composes MUI harnesses (`TextFieldHarness`, `ButtonHarness`, etc.) to expose a domain-specific API. This is the pattern you'll use in your own apps.
- **Tests that read like requirements.** The test files show how harnesses let you write assertions at the level of "fill in email, click submit, check for error" rather than "query a DOM node by class name."
- **How to structure harnesses alongside components.** Each component has a co-located harness file (`LoginForm.tsx` → `LoginFormHarness.ts` → `LoginForm.test.tsx`), showing where harnesses fit in a typical project layout.

## Extra documentation

- **[API Reference](docs/API_REFERENCE.md)** — full method tables for every harness
- **[Best Practices](docs/BEST_PRACTICES.md)** — patterns for building app harnesses and tests

## Installation

```bash
npm install mui-harness dom-harness
```

### Peer dependencies

| Package | Version |
|---|---|
| `dom-harness` | `*` |
| `@mui/material` | `^6.0.0` |
| `@testing-library/react` | `>=16.0.0` |
| `@testing-library/user-event` | `>=14.0.0` |
| `react` | `>=19.0.0` |

## Quick start

```tsx
import { render } from '@testing-library/react';
import { ButtonHarness, AlertHarness } from 'mui-harness';

it('submits the form and shows a success alert', async () => {
  render(<MyForm />);

  const submit = ButtonHarness.getByText('Submit');
  await submit.click();

  const alert = AlertHarness.first();
  expect(alert.getSeverity()).toBe('success');
  expect(alert.getText()).toContain('Saved');
});
```

## Available harnesses

| Harness | MUI Component | Selector |
|---|---|---|
| `AccordionHarness` | Accordion | `.MuiAccordion-root` |
| `AlertHarness` | Alert | `.MuiAlert-root` |
| `AutocompleteHarness` | Autocomplete | `.MuiAutocomplete-inputRoot` |
| `AvatarHarness` | Avatar | `.MuiAvatar-root` |
| `BadgeHarness` | Badge | `.MuiBadge-root` |
| `BreadcrumbsHarness` | Breadcrumbs | `.MuiBreadcrumbs-root` |
| `ButtonGroupHarness` | ButtonGroup | `.MuiButtonGroup-root` |
| `ButtonHarness` | Button | `.MuiButtonBase-root` |
| `CardHarness` | Card | `.MuiCard-root` |
| `CheckboxHarness` | Checkbox | `.MuiCheckbox-root` |
| `ChipHarness` | Chip | `.MuiChip-root` |
| `CircularProgressHarness` | CircularProgress | `.MuiCircularProgress-root` |
| `DialogHarness` | Dialog | `.MuiDialog-root` |
| `DividerHarness` | Divider | `.MuiDivider-root` |
| `DrawerHarness` | Drawer | `.MuiDrawer-root` |
| `IconButtonHarness` | IconButton | `.MuiIconButton-root` |
| `IconHarness` | SvgIcon | `.MuiSvgIcon-root` |
| `LinearProgressHarness` | LinearProgress | `.MuiLinearProgress-root` |
| `LinkHarness` | Link | `.MuiLink-root` |
| `ListItemHarness` | ListItem | `.MuiListItem-root` |
| `MenuHarness` | Menu | `.MuiMenu-root` |
| `MenuItemHarness` | MenuItem | `.MuiMenuItem-root` |
| `PaginationHarness` | Pagination | `.MuiPagination-root` |
| `PaperHarness` | Paper | `.MuiPaper-root` |
| `PopoverHarness` | Popover | `.MuiPopover-root` |
| `RadioGroupHarness` | RadioGroup | `[role="radiogroup"]` |
| `SelectHarness` | Select | `.MuiSelect-select` |
| `SkeletonHarness` | Skeleton | `.MuiSkeleton-root` |
| `SliderHarness` | Slider | `.MuiSlider-root` |
| `SnackbarHarness` | Snackbar | `.MuiSnackbar-root` |
| `SwitchHarness` | Switch | `.MuiSwitch-root` |
| `TabHarness` | Tab | `.MuiTab-root` |
| `TableCellHarness` | TableCell | `.MuiTableCell-root` |
| `TableContainerHarness` | TableContainer | `.MuiTableContainer-root` |
| `TableRowHarness` | TableRow | `.MuiTableRow-root` |
| `TabsHarness` | Tabs | `.MuiTabs-root` |
| `TextFieldHarness` | TextField | `.MuiInputBase-root` |
| `ToggleButtonHarness` | ToggleButton | `.MuiToggleButton-root` |
| `TooltipHarness` | Tooltip | `.MuiTooltip-popper` |
| `TypographyHarness` | Typography | `.MuiTypography-root` |

All harnesses inherit the static methods from `DomHarness`: `first()`, `all()`, `find()`, `match()`, and `fromDomElement()`. Several also provide convenience finders like `getByText()` or `getByName()`.

### Building your own harnesses

Compose MUI harnesses inside a page- or feature-level harness. See [Best Practices](docs/BEST_PRACTICES.md) for full guidance.

```ts
import { DomHarness } from 'dom-harness';
import { ButtonHarness, TextFieldHarness, AlertHarness } from 'mui-harness';

class LoginFormHarness extends DomHarness {
  static testid = 'login-form';

  get email() {
    return TextFieldHarness.getByName('email', this.root);
  }

  get password() {
    return TextFieldHarness.getByName('password', this.root);
  }

  get submit() {
    return ButtonHarness.getByText('Log in', this.root);
  }

  get error() {
    return AlertHarness.first(this.root);
  }
}
```

## Testing setup

### `vitest.config.ts`

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    css: false,
  },
});
```

### `setupTests.ts`

```ts
import '@testing-library/jest-dom/vitest';
```
