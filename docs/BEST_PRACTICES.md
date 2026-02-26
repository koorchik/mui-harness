# Harness Best Practices

## 1. Never Access Raw DOM

The fundamental rule: **never use `querySelector`, `textContent`, or other raw DOM APIs** in your app harnesses or tests. Always go through a harness.

**Wrong:**
```typescript
class ProfileFormHarness extends DomHarness {
  static testid = 'ProfileForm';

  isNewsletterChecked(): boolean {
    const input = this.root.querySelector('input[type="checkbox"]');
    return (input as HTMLInputElement)?.checked ?? false;
  }
}
```

**Right:**
```typescript
class ProfileFormHarness extends DomHarness {
  static testid = 'ProfileForm';

  get newsletterCheckbox(): CheckboxHarness {
    return CheckboxHarness.first(this.root);
  }

  isNewsletterChecked(): boolean {
    return this.newsletterCheckbox.isChecked();
  }
}
```

Raw DOM access is brittle — it breaks when MUI changes its internal markup. Harnesses absorb those changes in one place.

## 2. Always Scope Queries to `this.root`

Pass `this.root` as the container argument to prevent queries from leaking across components.

**Wrong:**
```typescript
class OrderFormHarness extends DomHarness {
  static testid = 'OrderForm';

  get saveButton(): ButtonHarness {
    return ButtonHarness.getByText('Save'); // searches entire document
  }
}
```

**Right:**
```typescript
class OrderFormHarness extends DomHarness {
  static testid = 'OrderForm';

  get saveButton(): ButtonHarness {
    return ButtonHarness.getByText('Save', this.root); // scoped to this component
  }
}
```

**Exception:** Portaled elements (snackbars, global modals) render outside your component's DOM tree. For those, omit the container intentionally:

```typescript
class OrderPageHarness extends DomHarness {
  static testid = 'OrderPage';

  getSnackbar(): SnackbarHarness {
    return SnackbarHarness.first(); // intentionally global — snackbar is portaled
  }
}
```

## 3. Extend Framework Harnesses When Applicable

When your component wraps a MUI container (Dialog, Drawer, Paper), extend the corresponding harness instead of `DomHarness`.

**Wrong:**
```typescript
class ConfirmDialogHarness extends DomHarness {
  static selector = '.MuiDialog-root';

  getTitle(): string {
    return this.root.querySelector('.MuiTypography-root')?.textContent || '';
  }
}
```

**Right:**
```typescript
class ConfirmDialogHarness extends DialogHarness {
  // inherits: static selector, getTitle(), getContentElement(), getActionsElement()

  get confirmButton(): ButtonHarness {
    return ButtonHarness.getByText('Confirm', this.root);
  }
}
```

Same applies to `DrawerHarness` (inherits `getPaperElement()`, `getWidth()`) and `PaperHarness`.

## 4. Use Static Finders Over `first()`

Prefer `getByName()`, `getByText()`, or `find()` when multiple same-type harnesses can exist. Use `first()` only when there's exactly one instance.

**Ambiguous:**
```typescript
get emailInput(): TextFieldHarness {
  return TextFieldHarness.first(this.root); // which text field?
}
```

**Clear:**
```typescript
get emailInput(): TextFieldHarness {
  return TextFieldHarness.getByName('email', this.root);
}

get passwordInput(): TextFieldHarness {
  return TextFieldHarness.getByName('password', this.root);
}

get submitButton(): ButtonHarness {
  return ButtonHarness.find(
    (b) => b.root.getAttribute('type') === 'submit',
    this.root
  );
}
```

Use `first()` when the component genuinely contains a single instance:

```typescript
get avatar(): AvatarHarness {
  return AvatarHarness.first(this.root); // only one avatar in the card
}
```

## 5. Getters for Composition, Methods for Optional Elements

Use `get` properties for always-present child harnesses. Use methods with try/catch for elements that may or may not exist.

```typescript
class ProductCardHarness extends PaperHarness {
  // Always present — use getter
  get title(): TypographyHarness {
    return TypographyHarness.first(this.root);
  }

  // May not exist — use method + try/catch
  hasBadge(): boolean {
    try {
      BadgeHarness.first(this.root);
      return true;
    } catch {
      return false;
    }
  }

  isLoading(): boolean {
    try {
      CircularProgressHarness.first(this.root);
      return true;
    } catch {
      return false;
    }
  }
}
```

## 6. Convenience Methods for Multi-Step Workflows

Encapsulate common multi-step interactions so tests stay intent-driven.

```typescript
class LoginFormHarness extends DomHarness {
  static testid = 'LoginForm';

  get emailInput(): TextFieldHarness {
    return TextFieldHarness.getByName('email', this.root);
  }

  get passwordInput(): TextFieldHarness {
    return TextFieldHarness.getByName('password', this.root);
  }

  get submitButton(): ButtonHarness {
    return ButtonHarness.getByText('Sign In', this.root);
  }

  async login(email: string, password: string) {
    await this.emailInput.type(email);
    await this.passwordInput.type(password);
    await this.submitButton.click();
  }
}
```

Tests become a single line:

```typescript
await harness.login('user@example.com', 's3cret');
```

## 7. Keep Harnesses Minimal

Only expose what tests actually need. No speculative methods.

**Over-engineered:**
```typescript
class SearchBarHarness extends DomHarness {
  static testid = 'SearchBar';

  get input(): TextFieldHarness { ... }
  get submitButton(): ButtonHarness { ... }
  getPlaceholder(): string { ... }
  getInputType(): string { ... }
  getInputValue(): string { ... }
  isInputFocused(): boolean { ... }
  getInputMaxLength(): number { ... }  // no test needs this
  getAriaLabel(): string { ... }       // no test needs this
}
```

**Right-sized:**
```typescript
class SearchBarHarness extends DomHarness {
  static testid = 'SearchBar';

  get input(): TextFieldHarness {
    return TextFieldHarness.first(this.root);
  }

  get submitButton(): ButtonHarness {
    return ButtonHarness.getByText('Search', this.root);
  }
}
```

Add methods when a test needs them, not before.

## 8. Tests Interact Only Through Harnesses

No `screen.getByRole()`, no `container.querySelector()` in tests. Harnesses are the only interface.

**Wrong:**
```typescript
it('disables submit when form is invalid', () => {
  render(<LoginForm />);
  const button = screen.getByRole('button', { name: 'Sign In' });
  expect(button).toBeDisabled();
});
```

**Right:**
```typescript
it('disables submit when form is invalid', () => {
  render(<LoginForm />);
  const harness = LoginFormHarness.first();
  expect(harness.submitButton.isDisabled()).toBe(true);
});
```

This keeps the DOM structure as an implementation detail. If the component's markup changes, you update the harness — not every test.
