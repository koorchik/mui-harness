# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses
[Semantic Versioning](https://semver.org/).

## [2.1.0] - 2026-09-12

### Added

- New harnesses: `CollapseHarness`, `ListSubheaderHarness`, `TableHeadHarness`, `TableBodyHarness`.
- `TextFieldHarness`: `getByLabel()`, `getLabel()` (without the required asterisk), `getHelperText()`,
  `hasError()`, `isDisabled()`, `isRequired()`, `isMultiline()`, `getStartAdornmentText()`,
  `getEndAdornmentText()` — the same form-control surface `SelectHarness` already had.
- `CheckboxHarness`: `getByName()`, `getByLabel()`, `getName()`, `isRequired()`, `getHelperText()`,
  `hasError()`.
- `ButtonHarness`: `getVariant()`, `getColor()`, `getSize()`.
- `LinkHarness`: `hasHref()`.
- `ListItemHarness`: `hasText()`, `getPrimaryText()` (falls back to the full text content, like
  `MenuItemHarness`), `hasIcon()`, `icon`.
- `DrawerHarness`: `getTitle()`, `getContentElement()`, `getActionsElement()` (parity with
  `DialogHarness`).
- `TableContainerHarness`: `head`, `body`, `hasHead()`, `hasBody()`.
- `TablePaginationHarness.getTotalRowCount()` — parses the total from the displayed-rows text,
  falling back to the root's text so material-react-table's pagination (a `Box` carrying only
  `MuiTablePagination-root`) works too. Parses the default English label; a localized or custom
  `labelDisplayedRows` returns `null`.
- `SwitchHarness`: `getByName()`, `getByLabel()`, `getName()`, `isRequired()`, `getHelperText()`,
  `hasError()` — the same surface as `CheckboxHarness`.
- `SelectHarness`: `isRequired()`.
- `CollapseHarness`: `getByText()`.

### Changed

- `DrawerHarness.getWidth()` falls back to the computed style, so widths set through `sx` /
  `slotProps.paper.sx` are reported instead of `null`.
- `SelectHarness.getLabel()` strips the asterisk MUI appends to a required field's label, matching
  `TextFieldHarness.getLabel()`. `SelectHarness.getByLabel('Country')` now finds a required select
  that previously only matched the label text with a trailing `*`.
- `SwitchHarness.getLabel()` is documented as excluding the required asterisk (it already did — MUI
  renders the asterisk outside `MuiFormControlLabel-label`).
- Every static finder (`getByText()`, `getByName()`, `getByLabel()` on all harnesses) is typed on the
  calling class, matching `first()` / `all()` / `match()` from `dom-harness`. A subclass now gets its
  own type back — `AutocompleteHarness.getByName()` returns an `AutocompleteHarness`, and an app's
  `class SaveButton extends ButtonHarness {}` gets a `SaveButton` from `SaveButton.getByText()`.
  Calls on the library classes themselves are unaffected.
- Internal `_`-prefixed harness members are no longer `private` in `SelectHarness`,
  `TextFieldHarness` and `CheckboxHarness`, matching the rest of the library (they stay internal by
  naming convention, and app harnesses may now reuse them).

## [2.0.0] - 2026-09-03

### Breaking changes

- **`ButtonHarness` now matches `.MuiButton-root` instead of `.MuiButtonBase-root`.**
  The old selector also matched `IconButton`, `Tab`, `MenuItem`, `Checkbox`, `ToggleButton`,
  `PaginationItem` and every other `ButtonBase` descendant, so `ButtonHarness.first()` was
  unreliable in composite views. Use `IconButtonHarness`, `TabHarness`, `FabHarness`, etc. for
  those components. `ButtonGroupHarness.getButtons()` is affected too: it only returns
  `<Button>` children now, so a `ButtonGroup` made of `IconButton`s yields an empty list. Use
  `IconButtonHarness.all(group.root)` for those.
- **`TypographyHarness.getColor()` removed.** MUI v5+ does not emit color classes for
  `Typography`, so the method always returned `'inherit'`.
- **Peer dependencies are now declared.** `@mui/material` (`^6 || ^7 || ^9`) and
  `@testing-library/user-event` (`>=14`) are peers; `dom-harness` requires `^1.2.0`.
- **`src/` is no longer published.** The npm tarball contains `dist/`, `docs/`, `README.md`
  and `CHANGELOG.md`.
- `engines.node` is now `>=20`.

### Added

- Support for Material UI v7 and v9. The test suite runs against MUI 6, 7 and 9 in CI
  (`npm run test:matrix` runs the same matrix locally).
- New harnesses: `AppBarHarness`, `FabHarness`, `RatingHarness`, `StepHarness`,
  `StepperHarness`, `TablePaginationHarness`, `ToggleButtonGroupHarness`, `ToolbarHarness`.
- `SelectHarness`: `getSelectedValue()` and `getOptionValues()` expose option values rather than
  display text; `selectByText()` / `selectByValue()` now throw when the option is not found;
  `isDisabled()` also recognises a disabled `FormControl`/`InputBase`.
- `CheckboxHarness.getColor()` / `SwitchHarness.getColor()` are now covered by tests for
  `error` and `success` colors.
- GitHub Actions workflow (`.github/workflows/ci.yml`) and `npm run typecheck`.

### Fixed

- `SelectHarness` located its popup by a menu id MUI never renders and fell back to the first
  `[role="listbox"]` in the document, which broke with several open popups. It now follows the
  display element's `aria-controls`. The three fixed `setTimeout` sleeps are gone.
- `AlertHarness.getSeverity()` reads the `MuiAlert-color*` classes emitted by MUI v6+ (the
  legacy `MuiAlert-{variant}{Severity}` classes are still recognised).
- `LinearProgressHarness.getBufferValue()` finds the buffer bar on MUI v9 (`MuiLinearProgress-bar2`).
- `LinearProgressHarness.isAnimating()` / `CircularProgressHarness.isAnimating()` derive the
  answer from the variant instead of jsdom computed styles, which MUI v9 no longer exposes.
- `ChipHarness.isDisabled()` no longer checks a `disabled` attribute that a `<div>` never has.

### Changed

- Development dependencies moved to MUI 9.4, React 19.2, Vitest 4.1, jsdom 30,
  `@vitejs/plugin-react` 6, `@testing-library/jest-dom` 7.
- Examples install `dom-harness` from npm instead of a sibling checkout and use the same
  Vitest / Vite majors as the root package.

## [1.1.2] - 2026-03-09

- `SelectHarness.isOptionDisabled()`.

## [1.1.1] - 2026-02-27

- Documentation updates.

## [1.1.0] - 2026-02-26

- Initial public release with 40 harnesses.
