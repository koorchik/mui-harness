import { DomHarness } from 'dom-harness';
import type { HarnessConstructor } from 'dom-harness';

/** Harness for MUI `<Collapse>`. Queries by `MuiCollapse-root` class. */
export class CollapseHarness extends DomHarness {
  static selector = '.MuiCollapse-root';

  /** Finds a collapse whose text matches `textOrRegexp`. */
  static getByText<T extends CollapseHarness>(
    this: HarnessConstructor<T>,
    textOrRegexp: string | RegExp,
    container?: Element
  ): T {
    return this.match(textOrRegexp, (h) => h.getText(), container);
  }

  /** Returns `true` once the collapse has fully expanded (`MuiCollapse-entered`). */
  isExpanded(): boolean {
    return this.root.classList.contains('MuiCollapse-entered');
  }

  /** Returns `true` when the collapse is fully collapsed to zero size (`MuiCollapse-hidden`). */
  isHidden(): boolean {
    return this.root.classList.contains('MuiCollapse-hidden');
  }

  /** Returns the collapse's text content (present in the DOM even while collapsed). */
  getText(): string {
    return this.root.textContent || '';
  }
}
