import { DomHarness } from 'dom-harness';
import { IconHarness } from './IconHarness.js';

type IconButtonSize = 'small' | 'medium' | 'large';
type IconButtonColor = 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

/** Harness for MUI `<IconButton>`. Queries by `MuiIconButton-root` class. */
export class IconButtonHarness extends DomHarness {
  static selector = '.MuiIconButton-root';

  /** Returns `true` if the button has the `disabled` attribute. */
  isDisabled(): boolean {
    return !!(this.root as HTMLButtonElement).disabled;
  }

  /** Returns the `title` attribute, or `null` if not set. */
  getTitle(): string | null {
    return this.root.getAttribute('title');
  }

  /** Returns `'small'`, `'medium'`, or `'large'`. */
  getSize(): IconButtonSize {
    if (this.root.classList.contains('MuiIconButton-sizeLarge')) return 'large';
    if (this.root.classList.contains('MuiIconButton-sizeSmall')) return 'small';
    return 'medium';
  }

  /** Returns the button color: `'default'`, `'primary'`, `'secondary'`, etc. */
  getColor(): IconButtonColor {
    const classList = this.root.classList;
    
    if (classList.contains('MuiIconButton-colorPrimary')) return 'primary';
    if (classList.contains('MuiIconButton-colorSecondary')) return 'secondary';
    if (classList.contains('MuiIconButton-colorError')) return 'error';
    if (classList.contains('MuiIconButton-colorWarning')) return 'warning';
    if (classList.contains('MuiIconButton-colorInfo')) return 'info';
    if (classList.contains('MuiIconButton-colorSuccess')) return 'success';
    return 'default';
  }

  /** Returns `true` if the button contains an SVG icon. */
  hasIcon(): boolean {
    return !!this.root.querySelector('.MuiSvgIcon-root');
  }

  /** Returns the button's `IconHarness`. Throws if no icon is present. */
  get icon(): IconHarness {
    if (!this.hasIcon()) {
      throw new Error('No icon found in IconButton');
    }
    return IconHarness.first(this.root);
  }

  /** Clicks the icon button using UserEvent. */
  click() {
    return this.user.click(this.root);
  }
}