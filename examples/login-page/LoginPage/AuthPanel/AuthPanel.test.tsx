import { render } from '@testing-library/react';
import { AuthPanel } from './AuthPanel';
import { AuthPanelHarness } from './AuthPanelHarness';

describe('AuthPanel', () => {
  const defaultProps = {
    onLogin: () => {},
    onRegister: () => {},
  };

  it('shows login tab by default', () => {
    render(<AuthPanel {...defaultProps} />);
    const panel = AuthPanelHarness.first();

    expect(panel.tabs.getSelectedIndex()).toBe(0);
    expect(() => panel.loginForm).not.toThrow();
  });

  it('has correct tab labels', () => {
    render(<AuthPanel {...defaultProps} />);
    const panel = AuthPanelHarness.first();

    expect(panel.tabs.getTabLabels()).toEqual(['Login', 'Register']);
  });

  it('switches to registration form', async () => {
    render(<AuthPanel {...defaultProps} />);
    const panel = AuthPanelHarness.first();

    await panel.selectRegistrationTab();

    expect(panel.tabs.getSelectedIndex()).toBe(1);
    expect(() => panel.registrationForm).not.toThrow();
  });

  it('switches back to login form', async () => {
    render(<AuthPanel {...defaultProps} />);
    const panel = AuthPanelHarness.first();

    await panel.selectRegistrationTab();
    await panel.selectLoginTab();

    expect(panel.tabs.getSelectedIndex()).toBe(0);
    expect(() => panel.loginForm).not.toThrow();
  });
});
