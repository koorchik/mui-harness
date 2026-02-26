import { DomHarness } from 'dom-harness';

/** Harness for MUI `<Button>`. Queries by `MuiButtonBase-root` class. */
export class ButtonHarness extends DomHarness {
  static selector = '.MuiButtonBase-root';

  /** Finds a button whose text content matches `textOrRegexp`. */
  static getByText(textOrRegexp: string | RegExp, container?: Element): ButtonHarness {
    return this.match(textOrRegexp, (h) => h.getText(), container);
  }

  /** Returns the visible text content of the button. */
  getText(): string {
    return this.root.textContent || '';
  }

  /** Returns `true` if the button has the `disabled` attribute. */
  isDisabled(): boolean {
    return !!(this.root as HTMLButtonElement).disabled;
  }

  /** Clicks the button using UserEvent. */
  click() {
    return this.user.click(this.root);
  }

  /** Hovers over the button using UserEvent. */
  hover() {
    return this.user.hover(this.root);
  }
}