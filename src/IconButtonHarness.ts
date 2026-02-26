import { DomHarness } from 'dom-harness';
import { IconHarness } from './IconHarness.js';

type IconButtonSize = 'small' | 'medium' | 'large';
type IconButtonColor = 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

export class IconButtonHarness extends DomHarness {
  static selector = '.MuiIconButton-root';

  isDisabled(): boolean {
    return !!(this.root as HTMLButtonElement).disabled;
  }

  getTitle(): string | null {
    return this.root.getAttribute('title');
  }

  getSize(): IconButtonSize {
    if (this.root.classList.contains('MuiIconButton-sizeLarge')) return 'large';
    if (this.root.classList.contains('MuiIconButton-sizeSmall')) return 'small';
    return 'medium';
  }

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

  hasIcon(): boolean {
    return !!this.root.querySelector('.MuiSvgIcon-root');
  }

  get icon(): IconHarness {
    if (!this.hasIcon()) {
      throw new Error('No icon found in IconButton');
    }
    return IconHarness.first(this.root);
  }

  click() {
    return this.user.click(this.root);
  }
}