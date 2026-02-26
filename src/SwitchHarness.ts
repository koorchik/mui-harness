import { DomHarness } from 'dom-harness';

type SwitchColor = 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
type SwitchSize = 'small' | 'medium';

export class SwitchHarness extends DomHarness {
  static selector = '.MuiSwitch-root';

  isChecked(): boolean {
    const input = this.root.querySelector('input');
    return input?.checked ?? false;
  }

  isDisabled(): boolean {
    const switchBase = this.root.querySelector('.MuiSwitch-switchBase');
    return switchBase?.classList.contains('Mui-disabled') ?? false;
  }

  getColor(): SwitchColor {
    const switchBase = this.root.querySelector('.MuiSwitch-switchBase');
    if (!switchBase) return 'default';

    const classList = switchBase.classList;

    if (classList.contains('MuiSwitch-colorPrimary')) return 'primary';
    if (classList.contains('MuiSwitch-colorSecondary')) return 'secondary';
    if (classList.contains('MuiSwitch-colorError')) return 'error';
    if (classList.contains('MuiSwitch-colorWarning')) return 'warning';
    if (classList.contains('MuiSwitch-colorInfo')) return 'info';
    if (classList.contains('MuiSwitch-colorSuccess')) return 'success';

    return 'default';
  }

  getSize(): SwitchSize {
    return this.root.classList.contains('MuiSwitch-sizeSmall') ? 'small' : 'medium';
  }

  async toggle() {
    const input = this.root.querySelector('input');
    if (!input) throw new Error('No input found in Switch');
    await this.user.click(input);
  }

  getLabel(): string {
    const label = this.root.closest('.MuiFormControlLabel-root');
    if (!label) return '';
    const labelText = label.querySelector('.MuiFormControlLabel-label');
    return labelText?.textContent || '';
  }
}
