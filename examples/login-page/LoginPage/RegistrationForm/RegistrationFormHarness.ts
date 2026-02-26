import { DomHarness } from 'dom-harness';
import { TextFieldHarness, ButtonHarness } from 'mui-harness';

export class RegistrationFormHarness extends DomHarness {
  static testid = 'RegistrationForm';

  get nameField(): TextFieldHarness {
    return TextFieldHarness.getByName('name', this.root);
  }

  get emailField(): TextFieldHarness {
    return TextFieldHarness.getByName('email', this.root);
  }

  get passwordField(): TextFieldHarness {
    return TextFieldHarness.getByName('password', this.root);
  }

  get confirmField(): TextFieldHarness {
    return TextFieldHarness.getByName('confirmPassword', this.root);
  }

  get submitButton(): ButtonHarness {
    return ButtonHarness.getByText('Register', this.root);
  }

  async register(name: string, email: string, password: string) {
    await this.nameField.type(name);
    await this.emailField.type(email);
    await this.passwordField.type(password);
    await this.confirmField.type(password);
    await this.submitButton.click();
  }
}
