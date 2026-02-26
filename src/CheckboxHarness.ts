import { DomHarness } from 'dom-harness';

type CheckboxColor = 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
type CheckboxSize = 'small' | 'medium';

export class CheckboxHarness extends DomHarness {
  static selector = '.MuiCheckbox-root';

  isChecked(): boolean {
    const input = this.root.querySelector('input');
    return input?.checked ?? false;
  }

  isDisabled(): boolean {
    return this.root.classList.contains('Mui-disabled');
  }

  isIndeterminate(): boolean {
    return this.root.classList.contains('MuiCheckbox-indeterminate');
  }

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

  getSize(): CheckboxSize {
    return this.root.classList.contains('MuiCheckbox-sizeSmall') ? 'small' : 'medium';
  }

  async toggle() {
    const input = this.root.querySelector('input');
    if (!input) throw new Error('No input found in Checkbox');
    await this.user.click(input);
  }

  getLabel(): string {
    const label = this.root.closest('.MuiFormControlLabel-root');
    if (!label) return '';
    const labelText = label.querySelector('.MuiFormControlLabel-label');
    return labelText?.textContent || '';
  }
}
