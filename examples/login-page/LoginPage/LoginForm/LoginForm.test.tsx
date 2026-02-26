import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { LoginForm } from './LoginForm';
import { LoginFormHarness } from './LoginFormHarness';

describe('LoginForm', () => {
  it('renders email and password fields', () => {
    render(<LoginForm onSubmit={() => {}} />);
    const form = LoginFormHarness.first();

    expect(form.emailField.getType()).toBe('email');
    expect(form.passwordField.getType()).toBe('password');
  });

  it('submit is disabled when fields are empty', () => {
    render(<LoginForm onSubmit={() => {}} />);
    const form = LoginFormHarness.first();

    expect(form.submitButton.isDisabled()).toBe(true);
  });

  it('submit is enabled after filling fields', async () => {
    render(<LoginForm onSubmit={() => {}} />);
    const form = LoginFormHarness.first();

    await form.emailField.type('user@example.com');
    await form.passwordField.type('secret');

    expect(form.submitButton.isDisabled()).toBe(false);
  });

  it('calls onSubmit with form values', async () => {
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);
    const form = LoginFormHarness.first();

    await form.login('user@example.com', 'secret');

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'secret',
      rememberMe: false,
    });
  });

  it('toggles remember-me checkbox', async () => {
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);
    const form = LoginFormHarness.first();

    expect(form.rememberMe.isChecked()).toBe(false);

    await form.rememberMe.toggle();

    expect(form.rememberMe.isChecked()).toBe(true);
    expect(form.rememberMe.getLabel()).toBe('Remember me');
  });

  it('includes rememberMe in submit values when checked', async () => {
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);
    const form = LoginFormHarness.first();

    await form.rememberMe.toggle();
    await form.login('user@example.com', 'secret');

    expect(onSubmit).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'secret',
      rememberMe: true,
    });
  });
});
