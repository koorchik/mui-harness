import { DomHarness } from 'dom-harness';
import { TabsHarness } from 'mui-harness';
import { LoginFormHarness } from '../LoginForm/LoginFormHarness';
import { RegistrationFormHarness } from '../RegistrationForm/RegistrationFormHarness';

export class AuthPanelHarness extends DomHarness {
  static testid = 'AuthPanel';

  get tabs(): TabsHarness {
    return TabsHarness.first(this.root);
  }

  async selectLoginTab() {
    await this.tabs.getTab(0).click();
  }

  async selectRegistrationTab() {
    await this.tabs.getTab(1).click();
  }

  get loginForm(): LoginFormHarness {
    return LoginFormHarness.first(this.root);
  }

  get registrationForm(): RegistrationFormHarness {
    return RegistrationFormHarness.first(this.root);
  }
}
