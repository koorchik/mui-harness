import { DomHarness } from 'dom-harness';

export class ButtonHarness extends DomHarness {
  static selector = '.MuiButtonBase-root';

  static getByText(textOrRegexp: string | RegExp, container?: Element): ButtonHarness {
    return this.match(textOrRegexp, (h) => h.getText(), container);
  }

  getText(): string {
    return this.root.textContent || '';
  }

  isDisabled(): boolean {
    return !!(this.root as HTMLButtonElement).disabled;
  }

  click() {
    return this.user.click(this.root);
  }

  hover() {
    return this.user.hover(this.root);
  }
}