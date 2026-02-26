import { render, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { LoginPage, AuthApi } from './LoginPage';
import { LoginPageHarness } from './LoginPageHarness';

function createMockApi(overrides: Partial<AuthApi> = {}): AuthApi {
  return {
    login: vi.fn<AuthApi['login']>().mockResolvedValue(undefined),
    register: vi.fn<AuthApi['register']>().mockResolvedValue(undefined),
    ...overrides,
  };
}

describe('LoginPage', () => {
  it('shows success snackbar on login', async () => {
    const api = createMockApi();
    render(<LoginPage authApi={api} />);
    const page = LoginPageHarness.first();

    await page.authPanel.loginForm.login('user@example.com', 'secret');

    await waitFor(() => {
      expect(page.getSnackbar().getText()).toBe('Login successful');
    });
    expect(api.login).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'secret',
      rememberMe: false,
    });
  });

  it('shows error alert on login failure', async () => {
    const api = createMockApi({
      login: vi.fn().mockRejectedValue(new Error('Invalid credentials')),
    });
    render(<LoginPage authApi={api} />);
    const page = LoginPageHarness.first();

    await page.authPanel.loginForm.login('user@example.com', 'wrong');

    await waitFor(() => {
      expect(page.errorAlert.getText()).toBe('Invalid credentials');
      expect(page.errorAlert.getSeverity()).toBe('error');
    });
  });

  it('registers via registration tab', async () => {
    const api = createMockApi();
    render(<LoginPage authApi={api} />);
    const page = LoginPageHarness.first();

    await page.authPanel.selectRegistrationTab();
    await page.authPanel.registrationForm.register('John', 'john@example.com', 'pass123');

    await waitFor(() => {
      expect(page.getSnackbar().getText()).toBe('Registration successful');
    });
    expect(api.register).toHaveBeenCalledWith({
      name: 'John',
      email: 'john@example.com',
      password: 'pass123',
    });
  });
});
