import { DomHarness } from 'dom-harness';
import type { HarnessConstructor } from 'dom-harness';

/** Harness for MUI `<ListSubheader>`. Queries by `MuiListSubheader-root` class. */
export class ListSubheaderHarness extends DomHarness {
  static selector = '.MuiListSubheader-root';

  /** Finds a subheader whose text matches `textOrRegexp`. */
  static getByText<T extends ListSubheaderHarness>(
    this: HarnessConstructor<T>,
    textOrRegexp: string | RegExp,
    container?: Element
  ): T {
    return this.match(textOrRegexp, (h) => h.getText(), container);
  }

  /** Returns the subheader's text content. */
  getText(): string {
    return this.root.textContent || '';
  }

  /** Returns `true` if the subheader is sticky (the default; `disableSticky` turns it off). */
  isSticky(): boolean {
    return this.root.classList.contains('MuiListSubheader-sticky');
  }
}
