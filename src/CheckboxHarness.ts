import { DomHarness } from 'dom-harness';
import type { HarnessConstructor } from 'dom-harness';
import {
  getFormControlHelperText,
  getFormControlLabelText,
  hasFormControlHelperError,
  hasFormControlLabelAsterisk,
} from './formControlHelpers.js';

type CheckboxColor = 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
type CheckboxSize = 'small' | 'medium';

/** Harness for MUI `<Checkbox>`. Queries by `MuiCheckbox-root` class. */
export class CheckboxHarness extends DomHarness {
  static selector = '.MuiCheckbox-root';

  /** Finds a checkbox whose input name matches `textOrRegexp`. */
  static getByName<T extends CheckboxHarness>(
    this: HarnessConstructor<T>,
    textOrRegexp: string | RegExp,
    container?: Element
  ): T {
    return this.match(textOrRegexp, (h) => h.getName(), container);
  }

  /** Finds a checkbox whose `FormControlLabel` text matches `textOrRegexp`. */
  static getByLabel<T extends CheckboxHarness>(
    this: HarnessConstructor<T>,
    textOrRegexp: string | RegExp,
    container?: Element
  ): T {
    return this.match(textOrRegexp, (h) => h.getLabel(), container);
  }

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

  /** Returns the label text from the parent `FormControlLabel` (without the required asterisk), or `''` if none. */
  getLabel(): string {
    return getFormControlLabelText(this.root);
  }

  get _input(): HTMLInputElement | null {
    return this.root.querySelector('input');
  }

  get _formControlLabel(): Element | null {
    return this.root.closest('.MuiFormControlLabel-root');
  }
}
