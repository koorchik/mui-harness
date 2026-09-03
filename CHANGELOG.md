# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses
[Semantic Versioning](https://semver.org/).

## [2.0.0] - Unreleased

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
