import { render, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { UserEditDialog, User } from './UserEditDialog';
import { UserEditDialogHarness } from './UserEditDialogHarness';

const defaultUser: User = {
  name: 'Alice',
  email: 'alice@example.com',
  role: 'editor',
  notifications: 'email',
  active: true,
};

describe('UserEditDialog', () => {
  it('renders with title "Edit User"', () => {
    render(
      <UserEditDialog open user={defaultUser} onSave={vi.fn()} onClose={vi.fn()} />
    );
    const dialog = UserEditDialogHarness.first();

    expect(dialog.getTitle()).toBe('Edit User');
  });

  it('calls onClose when Cancel is clicked', async () => {
    const onClose = vi.fn();
    render(
      <UserEditDialog open user={defaultUser} onSave={vi.fn()} onClose={onClose} />
    );
    const dialog = UserEditDialogHarness.first();

    await dialog.cancelButton.click();

    expect(onClose).toHaveBeenCalled();
  });

  it('calls onSave with updated user data', async () => {
    const onSave = vi.fn<(user: User) => Promise<void>>().mockResolvedValue(undefined);
    render(
      <UserEditDialog open user={defaultUser} onSave={onSave} onClose={vi.fn()} />
    );
    const dialog = UserEditDialogHarness.first();

    await dialog.fillAndSave({ role: 'admin', notifications: 'sms' });

    expect(onSave).toHaveBeenCalledWith({
      ...defaultUser,
      role: 'admin',
      notifications: 'sms',
    });
  });

  it('shows success snackbar after save', async () => {
    const onSave = vi.fn<(user: User) => Promise<void>>().mockResolvedValue(undefined);
    render(
      <UserEditDialog open user={defaultUser} onSave={onSave} onClose={vi.fn()} />
    );
    const dialog = UserEditDialogHarness.first();

    await dialog.saveButton.click();

    await waitFor(() => {
      expect(dialog.getSnackbar().getText()).toBe('User saved successfully');
    });
  });
});
