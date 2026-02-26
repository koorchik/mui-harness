import { DomHarness } from 'dom-harness';
import { AlertHarness, SnackbarHarness } from 'mui-harness';
import { AuthPanelHarness } from './AuthPanel/AuthPanelHarness';

export class LoginPageHarness extends DomHarness {
  static testid = 'LoginPage';

  get authPanel(): AuthPanelHarness {
    return AuthPanelHarness.first(this.root);
  }

  get errorAlert(): AlertHarness {
    return AlertHarness.first(this.root);
  }

  getSnackbar(): SnackbarHarness {
    return SnackbarHarness.first();
  }
}
