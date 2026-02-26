# User Edit Dialog Example

Demonstrates how to compose **DialogHarness**, **SelectHarness**, **SwitchHarness**, and **RadioGroupHarness** into application-level test harnesses.

## Structure

```
UserEditDialog/
  UserEditDialog.tsx          — Dialog with title, Save/Cancel actions, success snackbar
  UserEditDialogHarness.ts    — Composes ButtonHarness, SnackbarHarness, delegates to form
  UserEditDialog.test.tsx     — Dialog integration tests
  UserEditForm/
    UserEditForm.tsx           — Name, email, role select, notifications radio, active switch
    UserEditFormHarness.ts     — Composes TextFieldHarness, SelectHarness, RadioGroupHarness, SwitchHarness
    UserEditForm.test.tsx      — Individual field interaction tests
```

## Key Patterns

1. **SelectHarness** — `getByName('role', this.root)` to locate by the hidden input name
2. **RadioGroupHarness** — `first(this.root)` to find the `[role="radiogroup"]` element
3. **SwitchHarness** — `first(this.root)` to find `.MuiSwitch-root`
4. **DialogHarness composition** — `UserEditDialogHarness` uses `.MuiDialog-root` selector directly
5. **Convenience methods** — `fillAndSave()` encapsulates multi-field workflow

## Running

```bash
npm install
npm start         # dev server
npm run test:run  # single run
```
