import { DomHarness } from 'dom-harness';

export class LinkHarness extends DomHarness {
  static selector = '.MuiLink-root';

  getText(): string {
    return this.root.textContent || '';
  }

  getHref(): string {
    return this.root.getAttribute('href') || '';
  }

  click() {
    return this.user.click(this.root);
  }
}
