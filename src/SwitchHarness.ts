import { DomHarness } from 'dom-harness';
import type { HarnessConstructor } from 'dom-harness';
import {
  getFormControlHelperText,
  getFormControlLabelText,
  hasFormControlHelperError,
  hasFormControlLabelAsterisk,
} from './formControlHelpers.js';

type SwitchColor = 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
type SwitchSize = 'small' | 'medium';

/** Harness for MUI `<Switch>`. Queries by `MuiSwitch-root` class. */
export class SwitchHarness extends DomHarness {
  static selector = '.MuiSwitch-root';

  /** Finds a switch whose input name matches `textOrRegexp`. */
  static getByName<T extends SwitchHarness>(
    this: HarnessConstructor<T>,
    textOrRegexp: string | RegExp,
    container?: Element
  ): T {
    return this.match(textOrRegexp, (h) => h.getName(), container);
  }

  /** Finds a switch whose `FormControlLabel` text matches `textOrRegexp`. */
  static getByLabel<T extends SwitchHarness>(
    this: HarnessConstructor<T>,
    textOrRegexp: string | RegExp,
    container?: Element
  ): T {
    return this.match(textOrRegexp, (h) => h.getLabel(), container);
  }

  /** Returns `true` if the switch is toggled on. */
  isChecked(): boolean {
    const input = this.root.querySelector('input');
    return input?.checked ?? false;
  }

  /** Returns `true` if the switch is disabled. */
  isDisabled(): boolean {
    const switchBase = this.root.querySelector('.MuiSwitch-switchBase');
    return switchBase?.classList.contains('Mui-disabled') ?? false;
  }

  /** Returns the switch color: `'default'`, `'primary'`, `'secondary'`, etc. */
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

  /** Returns `'small'` or `'medium'`. */
  getSize(): SwitchSize {
    return this.root.classList.contains('MuiSwitch-sizeSmall') ? 'small' : 'medium';
  }

  /** Clicks the switch input to toggle its state. */
  async toggle() {
    const input = this.root.querySelector('input');
    if (!input) throw new Error('No input found in Switch');
    await this.user.click(input);
  }

  /** Returns the label text from the parent `FormControlLabel` (without the required asterisk), or `''` if none. */
  getLabel(): string {
    return getFormControlLabelText(this.root);
  }

  /** Returns the input's `name` attribute, or `''` if none. */
  getName(): string {
    return this._input?.name || '';
  }

  /** Returns `true` if the input is required or the parent `FormControlLabel` renders a required asterisk. */
  isRequired(): boolean {
    if (this._input?.required) return true;

    return hasFormControlLabelAsterisk(this.root);
  }

  /** Returns the helper text of the enclosing `FormControl`, or `null` if absent. */
  getHelperText(): string | null {
    return getFormControlHelperText(this.root);
  }

  /** Returns `true` if the parent `FormControlLabel` or the enclosing `FormControl`'s helper text is in the error state. */
  hasError(): boolean {
    if (this._formControlLabel?.classList.contains('Mui-error')) return true;

    return hasFormControlHelperError(this.root);
  }

  get _input(): HTMLInputElement | null {
    return this.root.querySelector('input');
  }

  get _formControlLabel(): Element | null {
    return this.root.closest('.MuiFormControlLabel-root');
  }
}
