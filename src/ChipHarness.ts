import { DomHarness } from 'dom-harness';
import { IconHarness } from './IconHarness.js';

type ChipVariant = 'filled' | 'outlined';
type ChipSize = 'small' | 'medium';
type ChipColor = 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

/** Harness for MUI `<Chip>`. Queries by `MuiChip-root` class. */
export class ChipHarness extends DomHarness {
  static selector = '.MuiChip-root';

  /** Finds a chip whose label text matches `textOrRegexp`. */
  static getByText(textOrRegexp: string | RegExp, container?: Element): ChipHarness {
    return this.match(textOrRegexp, (h) => h.getLabel(), container);
  }

  /** Returns the chip's label text. */
  getLabel(): string {
    const labelElement = this.root.querySelector('.MuiChip-label');
    return labelElement ? labelElement.textContent || '' : this.root.textContent || '';
  }

  /** Returns `true` if the chip is disabled. */
  isDisabled(): boolean {
    return !!(this.root as HTMLElement).getAttribute('disabled') || this.root.classList.contains('Mui-disabled');
  }

  /** Returns `true` if the chip is clickable. */
  isClickable(): boolean {
    return this.root.classList.contains('MuiChip-clickable');
  }

  /** Returns `true` if the chip has a delete icon. */
  isDeletable(): boolean {
    return !!this.root.querySelector('.MuiChip-deleteIcon');
  }

  /** Returns `'filled'` or `'outlined'`. */
  getVariant(): ChipVariant {
    return this.root.classList.contains('MuiChip-outlined') ? 'outlined' : 'filled';
  }

  /** Returns `'small'` or `'medium'`. */
  getSize(): ChipSize {
    return this.root.classList.contains('MuiChip-sizeSmall') ? 'small' : 'medium';
  }

  /** Returns the chip color: `'default'`, `'primary'`, `'secondary'`, etc. */
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

  /** Returns `true` if the chip contains an avatar. */
  hasAvatar(): boolean {
    return !!this._avatarElement;
  }

  get _avatarElement(): Element | null {
    return this.root.querySelector('.MuiAvatar-root');
  }

  /** Returns `true` if the chip contains an icon. */
  hasIcon(): boolean {
    try {
      IconHarness.first(this.root);
      return true;
    } catch {
      return false;
    }
  }

  /** Returns the chip's `IconHarness`. Throws if no icon is present. */
  get icon(): IconHarness {
    try {
      return IconHarness.first(this.root);
    } catch {
      throw new Error('No icon found in Chip');
    }
  }

  /** Returns the delete `IconHarness`. Throws if not present. */
  get deleteIcon(): IconHarness {
    try {
      return IconHarness.first(this.root);
    } catch {
      throw new Error('No delete icon found in Chip');
    }
  }

  /** Clicks the chip using UserEvent. */
  click() {
    return this.user.click(this.root);
  }

  /** Clicks the chip's delete icon. */
  async clickDelete() {
    const deleteIcon = this.deleteIcon;
    return deleteIcon.click();
  }
}