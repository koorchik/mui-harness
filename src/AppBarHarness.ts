import { DomHarness } from 'dom-harness';
import { ToolbarHarness } from './ToolbarHarness.js';

type AppBarPosition = 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
type AppBarColor = 'default' | 'inherit' | 'primary' | 'secondary' | 'transparent' | 'error' | 'info' | 'success' | 'warning';

/** Harness for MUI `<AppBar>`. Queries by `MuiAppBar-root` class. */
export class AppBarHarness extends DomHarness {
  static selector = '.MuiAppBar-root';

  /** Returns the app bar position: `'fixed'` (default), `'static'`, `'sticky'`, etc. */
  getPosition(): AppBarPosition {
    const classList = this.root.classList;
    const positions: AppBarPosition[] = ['absolute', 'sticky', 'static', 'relative'];
    for (const position of positions) {
      const capitalized = position.charAt(0).toUpperCase() + position.slice(1);
      if (classList.contains(`MuiAppBar-position${capitalized}`)) return position;
    }
    return 'fixed';
  }

  /** Returns the app bar color: `'primary'` (default), `'default'`, `'transparent'`, etc. */
  getColor(): AppBarColor {
    const classList = this.root.classList;
    const colors: AppBarColor[] = ['default', 'inherit', 'secondary', 'transparent', 'error', 'info', 'success', 'warning'];
    for (const color of colors) {
      const capitalized = color.charAt(0).toUpperCase() + color.slice(1);
      if (classList.contains(`MuiAppBar-color${capitalized}`)) return color;
    }
    return 'primary';
  }

  /** Returns `true` if the app bar contains a `<Toolbar>`. */
  hasToolbar(): boolean {
    return !!this.root.querySelector(ToolbarHarness.selector);
  }

  /** Returns the app bar's `ToolbarHarness`. Throws if no toolbar is present. */
  get toolbar(): ToolbarHarness {
    if (!this.hasToolbar()) throw new Error('No Toolbar found in AppBar');
    return ToolbarHarness.first(this.root);
  }

  /** Returns the text of the first `<Typography>` in the app bar, or `null` if none. */
  getTitle(): string | null {
    return this.root.querySelector('.MuiTypography-root')?.textContent || null;
  }

  /** Returns the app bar's full text content. */
  getText(): string {
    return this.root.textContent || '';
  }
}
