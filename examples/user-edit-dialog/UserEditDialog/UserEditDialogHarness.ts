import { ButtonHarness, DialogHarness, SnackbarHarness } from 'mui-harness';
import { UserEditFormHarness } from './UserEditForm/UserEditFormHarness';
import { User } from './UserEditForm/UserEditForm';

export class UserEditDialogHarness extends DialogHarness {
  get form(): UserEditFormHarness {
    return UserEditFormHarness.first(this.root);
  }

  get saveButton(): ButtonHarness {
    return ButtonHarness.getByText('Save', this.root);
  }

  get cancelButton(): ButtonHarness {
    return ButtonHarness.getByText('Cancel', this.root);
  }

  getSnackbar(): SnackbarHarness {
    return SnackbarHarness.first();
  }

  async fillAndSave(data: Partial<User>) {
    if (data.name !== undefined) {
      await this.form.nameField.clear();
      await this.form.nameField.type(data.name);
    }
    if (data.email !== undefined) {
      await this.form.emailField.clear();
      await this.form.emailField.type(data.email);
    }
    if (data.role !== undefined) {
      const roleLabels: Record<string, string> = { admin: 'Admin', editor: 'Editor', viewer: 'Viewer' };
      await this.form.roleSelect.selectByText(roleLabels[data.role]);
    }
    if (data.notifications !== undefined) {
      await this.form.notifications.select(data.notifications);
    }
    if (data.active !== undefined) {
      const currentActive = this.form.activeSwitch.isChecked();
      if (currentActive !== data.active) {
        await this.form.activeSwitch.toggle();
      }
    }
    await this.saveButton.click();
  }
}
