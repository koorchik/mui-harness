import { DomHarness } from 'dom-harness';

/** Harness for MUI `<Link>`. Queries by `MuiLink-root` class. */
export class LinkHarness extends DomHarness {
  static selector = '.MuiLink-root';

  /** Returns the link's visible text content. */
  getText(): string {
    return this.root.textContent || '';
  }

  /** Returns the `href` attribute value. */
  getHref(): string {
    return this.root.getAttribute('href') || '';
  }

  /** Clicks the link using UserEvent. */
  click() {
    return this.user.click(this.root);
  }
}
