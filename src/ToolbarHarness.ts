import { DomHarness } from 'dom-harness';

type ToolbarVariant = 'regular' | 'dense';

/** Harness for MUI `<Toolbar>`. Queries by `MuiToolbar-root` class. */
export class ToolbarHarness extends DomHarness {
  static selector = '.MuiToolbar-root';

  /** Returns the toolbar's full text content. */
  getText(): string {
    return this.root.textContent || '';
  }

  /** Returns `'regular'` or `'dense'`. */
  getVariant(): ToolbarVariant {
    return this.root.classList.contains('MuiToolbar-dense') ? 'dense' : 'regular';
  }

  /** Returns `true` if the toolbar has horizontal gutters (the default). */
  hasGutters(): boolean {
    return this.root.classList.contains('MuiToolbar-gutters');
  }
}
