import { DomHarness } from 'dom-harness';
import { AlertHarness } from './AlertHarness.js';

export class SnackbarHarness extends DomHarness {
  static selector = '.MuiSnackbar-root';

  get alert(): AlertHarness {
    return AlertHarness.first(this.root);
  }

  getText(): string {
    try {
      return this.alert.getText();
    } catch {
      return this.root.textContent || '';
    }
  }

  getSeverity(): string {
    return this.alert.getSeverity();
  }
}
