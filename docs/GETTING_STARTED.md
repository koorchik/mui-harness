# Getting Started

`mui-harness` is a collection of test harnesses for [Material UI](https://mui.com/) (MUI) components in React. It is built on top of [`dom-harness`](https://www.npmjs.com/package/dom-harness). For installation and test-runner setup, see the [README](../README.md).

## The Problem With Testing MUI Components

Here's a typical test for a login form using Testing Library:

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

it('submits login credentials', async () => {
  const onSubmit = vi.fn();
  const { container } = render(<LoginForm onSubmit={onSubmit} />);
  const user = userEvent.setup();

  // MUI wraps <input> inside several layers of divs.
  // screen.getByRole('textbox') breaks the moment you add a second field.
  // So you end up doing this:
  const emailInput = container.querySelector(
    '.MuiInputBase-root input[name="email"]'
  ) as HTMLInputElement;
  const passwordInput = container.querySelector(
    '.MuiInputBase-root input[name="password"]'
  ) as HTMLInputElement;
  const submitButton = screen.getByRole('button', { name: /log in/i });

  await user.type(emailInput, 'user@example.com');
  await user.type(passwordInput, 'secret');
  await user.click(submitButton);

  expect(onSubmit).toHaveBeenCalledWith({
    email: 'user@example.com',
    password: 'secret',
    rememberMe: false,
  });
});
```

This works, but it's fragile:

- **Coupled to MUI internals** — `.MuiInputBase-root` is an implementation detail. When MUI changes class names between versions, this test breaks even though behavior is unchanged.
- **Verbose** — Setting up `userEvent.setup()`, casting `HTMLInputElement`, and writing CSS selectors for every field is boilerplate.
- **Copy-pasted everywhere** — That `.MuiInputBase-root input[name="email"]` selector ends up in twenty test files. Change MUI's markup once, fix twenty files.

## What Is a Test Harness?

A test harness is a thin wrapper class around a DOM element that exposes a clean API for querying state and simulating interactions.

Instead of scattering CSS selectors across your tests, you write them once inside a harness. Tests never touch the DOM directly — they call methods like `getValue()`, `isDisabled()`, and `type()`.

Harnesses are **not mocks**. They interact with the real rendered DOM. Real event handlers fire. Real state updates happen. They're an abstraction over *how you query*, not *what you test*.

Think of it this way: `screen.getByRole()` is Testing Library's abstraction over `querySelector`. A harness is the next level up — an abstraction over Testing Library, scoped to a specific component.

## What Harnesses Are NOT

- **Not test doubles.** Real DOM, real events, real state. Nothing is faked.
- **Not shallow rendering.** Enzyme shallow rendering skipped child components entirely, leading to tests that didn't reflect real behavior. Harnesses render everything fully — they just give you a better API to query it.
- **Not Testing Library replacements.** Harnesses use `@testing-library/user-event` internally. They're a layer *on top*, not a replacement.

## How Harnesses Differ From Page Objects

If you come from a Selenium or E2E background, you might be thinking "isn't this just the Page Object pattern?" Not quite.

- **Page Objects are monolithic.** One class per page, growing large as the page grows. Harnesses are scoped to individual components, staying small and focused.
- **Page Objects don't compose.** You can't reuse a "LoginForm" page object inside both a "HomePage" and a "SettingsPage." Harnesses compose naturally: a `LoginFormHarness` contains `TextFieldHarness` and `ButtonHarness`, and can itself be used inside a `LoginPageHarness`.
- **Page Objects mix concerns.** Navigation, state queries, and assertions in one class. Harnesses handle one component's queries and interactions — nothing else.
- **Harnesses mirror the component tree.** Just like React components compose, harnesses compose. Page Objects have no analog to this.

Harnesses are what Page Objects *should have been* — composable, component-scoped, and matching your app's architecture.

## The Same Test, With Harnesses

```typescript
import { render } from '@testing-library/react';
import { LoginFormHarness } from './LoginFormHarness';
import { LoginForm } from './LoginForm';

it('submits login credentials', async () => {
  const onSubmit = vi.fn();
  render(<LoginForm onSubmit={onSubmit} />);
  const form = LoginFormHarness.first();

  await form.emailField.type('user@example.com');
  await form.passwordField.type('secret');
  await form.submitButton.click();

  expect(onSubmit).toHaveBeenCalledWith({
    email: 'user@example.com',
    password: 'secret',
    rememberMe: false,
  });
});
```

No CSS selectors. No `querySelector`. No `HTMLInputElement` casts. No `userEvent.setup()`.

And if MUI changes its internal markup tomorrow, you update the harness — not twenty test files.

We'll build `LoginFormHarness` in the next section — for now, notice how the test reads.

## Harnesses Compose Like Components

This is the key insight: harnesses mirror your component tree.

A `LoginForm` React component renders `TextField`, `Button`, and `Checkbox` components. The `LoginFormHarness` composes `TextFieldHarness`, `ButtonHarness`, and `CheckboxHarness`:

```typescript
import { DomHarness } from 'dom-harness';
import { TextFieldHarness, ButtonHarness, CheckboxHarness } from 'mui-harness';

export class LoginFormHarness extends DomHarness {
  static testid = 'LoginForm';

  get emailField(): TextFieldHarness {
    return TextFieldHarness.getByName('email', this.root);
  }

  get passwordField(): TextFieldHarness {
    return TextFieldHarness.getByName('password', this.root);
  }

  get rememberMe(): CheckboxHarness {
    return CheckboxHarness.first(this.root);
  }

  get submitButton(): ButtonHarness {
    return ButtonHarness.getByText('Log in', this.root);
  }

  async login(email: string, password: string) {
    await this.emailField.type(email);
    await this.passwordField.type(password);
    await this.submitButton.click();
  }
}
```

The `login()` convenience method encapsulates a multi-step workflow. Now the test from the previous section becomes:

```typescript
it('submits login credentials', async () => {
  const onSubmit = vi.fn();
  render(<LoginForm onSubmit={onSubmit} />);

  await LoginFormHarness.first().login('user@example.com', 'secret');

  expect(onSubmit).toHaveBeenCalledWith({
    email: 'user@example.com',
    password: 'secret',
    rememberMe: false,
  });
});
```

One line to fill a form and click submit.

## Building Your Own Harnesses

When you have app-specific components (a `SearchBar`, a `UserCard`), wrap them in harnesses that compose the MUI harnesses:

```typescript
import { DomHarness } from 'dom-harness';
import { TextFieldHarness, IconButtonHarness } from 'mui-harness';

export class SearchBarHarness extends DomHarness {
  static testid = 'SearchBar';

  get input(): TextFieldHarness {
    return TextFieldHarness.first(this.root);
  }

  get searchButton(): IconButtonHarness {
    return IconButtonHarness.first(this.root);
  }

  async search(query: string) {
    await this.input.type(query);
    await this.searchButton.click();
  }
}
```

The pattern is always the same:
1. Extend `DomHarness` (or an existing MUI harness for wrappers around MUI containers)
2. Set `static testid` (matching your component's `data-testid`) or `static selector` (CSS selector)
3. Add getters for child harnesses, scoped to `this.root`
4. Add convenience methods for multi-step interactions

See the [`examples/login-page`](../examples/login-page) and [`examples/user-edit-dialog`](../examples/user-edit-dialog) directories for full working examples. For deeper patterns — portaled components, optional children, extending existing harnesses — see [BEST_PRACTICES.md](BEST_PRACTICES.md).
