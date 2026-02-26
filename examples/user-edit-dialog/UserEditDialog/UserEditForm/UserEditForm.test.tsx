import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { UserEditForm, User } from './UserEditForm';
import { UserEditFormHarness } from './UserEditFormHarness';

const defaultUser: User = {
  name: 'Alice',
  email: 'alice@example.com',
  role: 'editor',
  notifications: 'email',
  active: true,
};

describe('UserEditForm', () => {
  it('renders fields with initial user values', () => {
    render(<UserEditForm user={defaultUser} onChange={() => {}} />);
    const form = UserEditFormHarness.first();

    expect(form.nameField.getValue()).toBe('Alice');
    expect(form.emailField.getValue()).toBe('alice@example.com');
    expect(form.roleSelect.getValue()).toBe('Editor');
    expect(form.notifications.getSelectedValue()).toBe('email');
    expect(form.activeSwitch.isChecked()).toBe(true);
  });

  it('selects a different role', async () => {
    const onChange = vi.fn();
    render(<UserEditForm user={defaultUser} onChange={onChange} />);
    const form = UserEditFormHarness.first();

    await form.roleSelect.selectByText('Admin');

    expect(onChange).toHaveBeenCalledWith({ ...defaultUser, role: 'admin' });
  });

  it('selects a different notification option', async () => {
    const onChange = vi.fn();
    render(<UserEditForm user={defaultUser} onChange={onChange} />);
    const form = UserEditFormHarness.first();

    await form.notifications.select('sms');

    expect(onChange).toHaveBeenCalledWith({ ...defaultUser, notifications: 'sms' });
  });

  it('toggles active switch', async () => {
    const onChange = vi.fn();
    render(<UserEditForm user={defaultUser} onChange={onChange} />);
    const form = UserEditFormHarness.first();

    await form.activeSwitch.toggle();

    expect(onChange).toHaveBeenCalledWith({ ...defaultUser, active: false });
  });

  it('updates name field', async () => {
    const onChange = vi.fn();
    render(<UserEditForm user={{ ...defaultUser, name: '' }} onChange={onChange} />);
    const form = UserEditFormHarness.first();

    await form.nameField.type('A');

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'A' })
    );
  });

  it('shows radio group options', () => {
    render(<UserEditForm user={defaultUser} onChange={() => {}} />);
    const form = UserEditFormHarness.first();

    const options = form.notifications.getOptions();
    expect(options.map((o) => o.label)).toEqual(['Email', 'SMS', 'None']);
  });

  it('shows switch label', () => {
    render(<UserEditForm user={defaultUser} onChange={() => {}} />);
    const form = UserEditFormHarness.first();

    expect(form.activeSwitch.getLabel()).toBe('Active');
  });
});
