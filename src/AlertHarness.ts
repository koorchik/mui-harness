import { DomHarness } from 'dom-harness';
import { IconHarness } from './IconHarness.js';
import { IconButtonHarness } from './IconButtonHarness.js';

type AlertSeverity = 'error' | 'warning' | 'info' | 'success';
type AlertVariant = 'standard' | 'filled' | 'outlined';

/** Harness for MUI `<Alert>`. Queries by `MuiAlert-root` class. */
export class AlertHarness extends DomHarness {
  static selector = '.MuiAlert-root';

  /** Finds an alert whose message text matches `textOrRegexp`. */
  static getByText(textOrRegexp: string | RegExp, container?: Element): AlertHarness {
    return this.match(textOrRegexp, (h) => h.getText(), container);
  }

  /** Returns the alert message text. */
  getText(): string {
    const messageElement = this._messageElement;
    return messageElement ? messageElement.textContent || '' : this.root.textContent || '';
  }

  get _messageElement(): Element | null {
    return this.root.querySelector('.MuiAlert-message');
  }

  /** Returns the alert severity: `'error'`, `'warning'`, `'info'`, or `'success'`. */
  getSeverity(): AlertSeverity {
    const classList = this.root.classList;
    
    if (classList.contains('MuiAlert-standardError')) return 'error';
    if (classList.contains('MuiAlert-standardWarning')) return 'warning';
    if (classList.contains('MuiAlert-standardInfo')) return 'info';
    if (classList.contains('MuiAlert-standardSuccess')) return 'success';
    if (classList.contains('MuiAlert-filledError')) return 'error';
    if (classList.contains('MuiAlert-filledWarning')) return 'warning';
    if (classList.contains('MuiAlert-filledInfo')) return 'info';
    if (classList.contains('MuiAlert-filledSuccess')) return 'success';
    if (classList.contains('MuiAlert-outlinedError')) return 'error';
    if (classList.contains('MuiAlert-outlinedWarning')) return 'warning';
    if (classList.contains('MuiAlert-outlinedInfo')) return 'info';
    if (classList.contains('MuiAlert-outlinedSuccess')) return 'success';
    
    return 'success';
  }

  /** Returns the alert variant: `'standard'`, `'filled'`, or `'outlined'`. */
  getVariant(): AlertVariant {
    const classList = this.root.classList;
    
    if (classList.contains('MuiAlert-filled')) return 'filled';
    if (classList.contains('MuiAlert-outlined')) return 'outlined';
    
    return 'standard';
  }

  /** Returns `true` if the alert contains an icon. */
  hasIcon(): boolean {
    try {
      IconHarness.first(this.root);
      return true;
    } catch {
      return false;
    }
  }

  /** Returns the alert's `IconHarness`. Throws if no icon is present. */
  get icon(): IconHarness {
    try {
      return IconHarness.first(this.root);
    } catch {
      throw new Error('No icon found in Alert');
    }
  }

  /** Returns `true` if the alert has a close button. */
  hasCloseButton(): boolean {
    try {
      IconButtonHarness.first(this.root);
      return true;
    } catch {
      return false;
    }
  }

  /** Returns the close `IconButtonHarness`. Throws if not present. */
  get closeButton(): IconButtonHarness {
    try {
      return IconButtonHarness.first(this.root);
    } catch {
      throw new Error('No close button found in Alert');
    }
  }

  /** Clicks the alert's close button. */
  async clickCloseButton() {
    const closeButton = this.closeButton;
    return closeButton.click();
  }

  /** Returns the ARIA role of the alert element. */
  getRole(): string {
    return this.root.getAttribute('role') || 'alert';
  }

  /** Returns `true` if the alert has an action area. */
  hasAction(): boolean {
    return !!this.root.querySelector('.MuiAlert-action');
  }
}