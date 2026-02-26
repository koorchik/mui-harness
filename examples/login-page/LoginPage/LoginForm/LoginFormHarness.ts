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
