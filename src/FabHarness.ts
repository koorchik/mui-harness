import { DomHarness } from 'dom-harness';

type FabVariant = 'circular' | 'extended';
type FabSize = 'small' | 'medium' | 'large';
type FabColor = 'default' | 'inherit' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

/** Harness for MUI `<Fab>` (floating action button). Queries by `MuiFab-root` class. */
export class FabHarness extends DomHarness {
  static selector = '.MuiFab-root';

  /** Finds a fab whose text content matches `textOrRegexp`. */
  static getByText(textOrRegexp: string | RegExp, container?: Element): FabHarness {
    return this.match(textOrRegexp, (h) => h.getText(), container);
  }

  /** Finds a fab whose `aria-label` matches `textOrRegexp`. */
  static getByLabel(textOrRegexp: string | RegExp, container?: Element): FabHarness {
    return this.match(textOrRegexp, (h) => h.getLabel(), container);
  }

  /** Returns the visible text content of the fab. */
  getText(): string {
    return this.root.textContent || '';
  }

  /** Returns the `aria-label` attribute, or `''` if not set. */
  getLabel(): string {
    return this.root.getAttribute('aria-label') || '';
  }

  /** Returns `true` if the fab is disabled (also when rendered as a link via `href`). */
  isDisabled(): boolean {
    return !!(this.root as HTMLButtonElement).disabled || this.root.classList.contains('Mui-disabled');
  }

  /** Returns `'circular'` or `'extended'`. */
  getVariant(): FabVariant {
    return this.root.classList.contains('MuiFab-extended') ? 'extended' : 'circular';
  }

  /** Returns `'small'`, `'medium'`, or `'large'`. */
  getSize(): FabSize {
    if (this.root.classList.contains('MuiFab-sizeSmall')) return 'small';
    if (this.root.classList.contains('MuiFab-sizeMedium')) return 'medium';
    return 'large';
  }

  /** Returns the fab color: `'default'`, `'primary'`, `'secondary'`, etc. */
  getColor(): FabColor {
    const classList = this.root.classList;
    const colors: FabColor[] = ['primary', 'secondary', 'error', 'warning', 'info', 'success', 'inherit'];
    for (const color of colors) {
      const capitalized = color.charAt(0).toUpperCase() + color.slice(1);
      if (classList.contains(`MuiFab-${color}`) || classList.contains(`MuiFab-color${capitalized}`)) {
        return color;
      }
    }
    return 'default';
  }

  /** Clicks the fab using UserEvent. */
  click() {
    return this.user.click(this.root);
  }
}
