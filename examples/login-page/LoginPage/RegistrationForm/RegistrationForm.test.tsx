import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { RegistrationForm } from './RegistrationForm';
import { RegistrationFormHarness } from './RegistrationFormHarness';

describe('RegistrationForm', () => {
  it('renders all fields accessible by name', () => {
    render(<RegistrationForm onSubmit={() => {}} />);
    const form = RegistrationFormHarness.first();

    expect(form.nameField.getName()).toBe('name');
    expect(form.emailField.getName()).toBe('email');
    expect(form.passwordField.getName()).toBe('password');
    expect(form.confirmField.getName()).toBe('confirmPassword');
  });

  it('submit is disabled when fields are empty', () => {
    render(<RegistrationForm onSubmit={() => {}} />);
    const form = RegistrationFormHarness.first();

    expect(form.submitButton.isDisabled()).toBe(true);
  });

  it('calls onSubmit with form values', async () => {
    const onSubmit = vi.fn();
    render(<RegistrationForm onSubmit={onSubmit} />);
    const form = RegistrationFormHarness.first();

    await form.register('John', 'john@example.com', 'secret123');

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'John',
      email: 'john@example.com',
      password: 'secret123',
    });
  });

  it('disables submit when passwords do not match', async () => {
    render(<RegistrationForm onSubmit={() => {}} />);
    const form = RegistrationFormHarness.first();

    await form.nameField.type('John');
    await form.emailField.type('john@example.com');
    await form.passwordField.type('password1');
    await form.confirmField.type('password2');

    expect(form.submitButton.isDisabled()).toBe(true);
  });
});
