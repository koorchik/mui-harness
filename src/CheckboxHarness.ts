import { DomHarness } from 'dom-harness';

type CheckboxColor = 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
type CheckboxSize = 'small' | 'medium';

/** Harness for MUI `<Checkbox>`. Queries by `MuiCheckbox-root` class. */
export class CheckboxHarness extends DomHarness {
  static selector = '.MuiCheckbox-root';

  /** Returns `true` if the checkbox is checked. */
  isChecked(): boolean {
    const input = this.root.querySelector('input');
    return input?.checked ?? false;
  }

  /** Returns `true` if the checkbox is disabled. */
  isDisabled(): boolean {
    return this.root.classList.contains('Mui-disabled');
  }

  /** Returns `true` if the checkbox is in the indeterminate state. */
  isIndeterminate(): boolean {
    return this.root.classList.contains('MuiCheckbox-indeterminate');
  }

  /** Returns the checkbox color: `'default'`, `'primary'`, `'secondary'`, etc. */
  getColor(): CheckboxColor {
    const classList = this.root.classList;

    if (classList.contains('MuiCheckbox-colorPrimary')) return 'primary';
    if (classList.contains('MuiCheckbox-colorSecondary')) return 'secondary';
    if (classList.contains('MuiCheckbox-colorError')) return 'error';
    if (classList.contains('MuiCheckbox-colorWarning')) return 'warning';
    if (classList.contains('MuiCheckbox-colorInfo')) return 'info';
    if (classList.contains('MuiCheckbox-colorSuccess')) return 'success';

    return 'default';
  }

  /** Returns `'small'` or `'medium'`. */
  getSize(): CheckboxSize {
    return this.root.classList.contains('MuiCheckbox-sizeSmall') ? 'small' : 'medium';
  }

  /** Clicks the checkbox input to toggle its checked state. */
  async toggle() {
    const input = this.root.querySelector('input');
    if (!input) throw new Error('No input found in Checkbox');
    await this.user.click(input);
  }

  /** Returns the label text from the parent `FormControlLabel`, or `''` if none. */
  getLabel(): string {
    const label = this.root.closest('.MuiFormControlLabel-root');
    if (!label) return '';
    const labelText = label.querySelector('.MuiFormControlLabel-label');
    return labelText?.textContent || '';
  }
}
