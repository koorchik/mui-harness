import { DomHarness } from 'dom-harness';
import type { HarnessConstructor } from 'dom-harness';

type ButtonVariant = 'text' | 'outlined' | 'contained';
type ButtonSize = 'small' | 'medium' | 'large';
type ButtonColor = 'inherit' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

const BUTTON_COLORS: Exclude<ButtonColor, 'inherit'>[] = [
  'primary',
  'secondary',
  'error',
  'warning',
  'info',
  'success',
];

/** Harness for MUI `<Button>`. Queries by `MuiButton-root` class. */
export class ButtonHarness extends DomHarness {
  static selector = '.MuiButton-root';

  /** Finds a button whose text content matches `textOrRegexp`. */
  static getByText<T extends ButtonHarness>(
    this: HarnessConstructor<T>,
    textOrRegexp: string | RegExp,
    container?: Element
  ): T {
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

  /** Returns the button variant: `'text'`, `'outlined'` or `'contained'`. */
  getVariant(): ButtonVariant {
    const classList = this.root.classList;

    if (classList.contains('MuiButton-contained')) return 'contained';
    if (classList.contains('MuiButton-outlined')) return 'outlined';

    return 'text';
  }

  /** Returns the button color: `'inherit'`, `'primary'`, `'secondary'`, `'error'`, `'warning'`, `'info'` or `'success'`. */
  getColor(): ButtonColor {
    const classList = this.root.classList;
    const variant = this.getVariant();

    for (const color of BUTTON_COLORS) {
      const capitalized = color.charAt(0).toUpperCase() + color.slice(1);
      // Some majors emit `MuiButton-color<Color>`, others only `MuiButton-<variant><Color>`.
      if (classList.contains(`MuiButton-color${capitalized}`) || classList.contains(`MuiButton-${variant}${capitalized}`)) {
        return color;
      }
    }

    return 'inherit';
  }

  /** Returns the button size: `'small'`, `'medium'` or `'large'`. */
  getSize(): ButtonSize {
    if (this.root.classList.contains('MuiButton-sizeSmall')) return 'small';
    if (this.root.classList.contains('MuiButton-sizeLarge')) return 'large';

    return 'medium';
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
