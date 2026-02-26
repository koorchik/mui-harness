import { DomHarness } from 'dom-harness';
import { IconHarness } from './IconHarness.js';

type ChipVariant = 'filled' | 'outlined';
type ChipSize = 'small' | 'medium';
type ChipColor = 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

export class ChipHarness extends DomHarness {
  static selector = '.MuiChip-root';

  static getByText(textOrRegexp: string | RegExp, container?: Element): ChipHarness {
    return this.match(textOrRegexp, (h) => h.getLabel(), container);
  }

  getLabel(): string {
    const labelElement = this.root.querySelector('.MuiChip-label');
    return labelElement ? labelElement.textContent || '' : this.root.textContent || '';
  }

  isDisabled(): boolean {
    return !!(this.root as HTMLElement).getAttribute('disabled') || this.root.classList.contains('Mui-disabled');
  }

  isClickable(): boolean {
    return this.root.classList.contains('MuiChip-clickable');
  }

  isDeletable(): boolean {
    return !!this.root.querySelector('.MuiChip-deleteIcon');
  }

  getVariant(): ChipVariant {
    return this.root.classList.contains('MuiChip-outlined') ? 'outlined' : 'filled';
  }

  getSize(): ChipSize {
    return this.root.classList.contains('MuiChip-sizeSmall') ? 'small' : 'medium';
  }

  getColor(): ChipColor {
    const classList = this.root.classList;
    
    if (classList.contains('MuiChip-colorPrimary')) return 'primary';
    if (classList.contains('MuiChip-colorSecondary')) return 'secondary';
    if (classList.contains('MuiChip-colorError')) return 'error';
    if (classList.contains('MuiChip-colorWarning')) return 'warning';
    if (classList.contains('MuiChip-colorInfo')) return 'info';
    if (classList.contains('MuiChip-colorSuccess')) return 'success';
    
    return 'default';
  }

  hasAvatar(): boolean {
    return !!this._avatarElement;
  }

  get _avatarElement(): Element | null {
    return this.root.querySelector('.MuiAvatar-root');
  }

  hasIcon(): boolean {
    try {
      IconHarness.first(this.root);
      return true;
    } catch {
      return false;
    }
  }

  get icon(): IconHarness {
    try {
      return IconHarness.first(this.root);
    } catch {
      throw new Error('No icon found in Chip');
    }
  }

  get deleteIcon(): IconHarness {
    try {
      return IconHarness.first(this.root);
    } catch {
      throw new Error('No delete icon found in Chip');
    }
  }

  click() {
    return this.user.click(this.root);
  }

  async clickDelete() {
    const deleteIcon = this.deleteIcon;
    return deleteIcon.click();
  }
}