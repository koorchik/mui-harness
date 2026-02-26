# Login Page Example

Demonstrates how to compose `mui-harness` primitives into app-level component harnesses.

## Structure

```
LoginPage/
  LoginPage.tsx              — Full page: centers AuthPanel, shows success/error feedback
  LoginPageHarness.ts        — Composes AuthPanelHarness, SnackbarHarness, AlertHarness
  LoginPage.test.tsx         — Integration tests with mocked AuthApi

  AuthPanel/
    AuthPanel.tsx            — Tabs container switching between LoginForm and RegistrationForm
    AuthPanelHarness.ts      — Composes TabsHarness + child form harnesses
    AuthPanel.test.tsx       — Tab navigation tests

  LoginForm/
    LoginForm.tsx            — Email + password + "Remember me" + submit
    LoginFormHarness.ts      — Composes TextFieldHarness, CheckboxHarness, ButtonHarness
    LoginForm.test.tsx       — Field interaction, validation, form submission

  RegistrationForm/
    RegistrationForm.tsx     — Name + email + password + confirm password + submit
    RegistrationFormHarness.ts — Composes TextFieldHarness, ButtonHarness
    RegistrationForm.test.tsx  — Multiple fields, password mismatch handling
```

## Key Patterns

1. **Components use `data-testid`** — each component sets a `data-testid` on its root element
2. **Harnesses compose primitives** — `LoginFormHarness` uses `TextFieldHarness.getByName()`, `ButtonHarness.getByText()`, `CheckboxHarness.first()` scoped to `this.root`
3. **Harnesses compose other harnesses** — `AuthPanelHarness` delegates to `LoginFormHarness` and `RegistrationFormHarness`
4. **Tests interact only through harnesses** — no `screen.getByRole`, no `querySelector`, no `data-testid` lookups in tests

## Running

```bash
npm install
npm start         # dev server
npm test          # watch mode
npm run test:run  # single run
```
