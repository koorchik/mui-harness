import { DomHarness } from 'dom-harness';
import { AlertHarness } from './AlertHarness.js';

/** Harness for MUI `<Snackbar>`. Portaled -- finders search the full document. Queries by `MuiSnackbar-root` class. */
export class SnackbarHarness extends DomHarness {
  static selector = '.MuiSnackbar-root';

  /** Returns the inner `AlertHarness`. */
  get alert(): AlertHarness {
    return AlertHarness.first(this.root);
  }

  /** Returns the snackbar message text (delegates to the inner alert if present). */
  getText(): string {
    try {
      return this.alert.getText();
    } catch {
      return this.root.textContent || '';
    }
  }

  /** Returns the alert severity of the inner alert. */
  getSeverity(): string {
    return this.alert.getSeverity();
  }
}
