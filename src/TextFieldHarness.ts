import { DomHarness } from 'dom-harness';
import type { HarnessConstructor } from 'dom-harness';
import {
  getFormControlHelperText,
  getFormLabelText,
  hasFormControlHelperError,
  hasFormLabelAsterisk,
} from './formControlHelpers.js';

/** Harness for MUI `<TextField>`. Queries by `MuiInputBase-root` class. */
export class TextFieldHarness extends DomHarness {
  static selector = '.MuiInputBase-root';

  /** Finds a text field whose input name matches `textOrRegexp`. */
  static getByName<T extends TextFieldHarness>(
    this: HarnessConstructor<T>,
    textOrRegexp: string | RegExp,
    container?: Element
  ): T {
    return this.match(textOrRegexp, (h) => h.getName(), container);
  }

  /** Finds a text field whose label text matches `textOrRegexp`. */
  static getByLabel<T extends TextFieldHarness>(
    this: HarnessConstructor<T>,
    textOrRegexp: string | RegExp,
    container?: Element
  ): T {
    return this.match(textOrRegexp, (h) => h.getLabel(), container);
  }

  /** Returns the input's placeholder text. */
  getPlaceholder(): string {
    return this._input.placeholder;
  }

  /** Returns the input's `name` attribute. */
  getName(): string {
    return this._input.name;
  }

  /** Returns the current input value. */
  getValue(): string {
    return this._input.value;
  }

  /** Returns the input's `type` attribute. */
  getType(): string {
    return this._input.type;
  }

  /** Returns the label text without the required asterisk, or `''` when there is no label. */
  getLabel(): string {
    return getFormLabelText(this._formControl?.querySelector('.MuiInputLabel-root'));
  }

  /** Returns the helper text below the field, or `null` if absent. */
  getHelperText(): string | null {
    return getFormControlHelperText(this.root);
  }

  /** Returns `true` if the field or its helper text is in the error state. */
  hasError(): boolean {
    if (this.root.classList.contains('Mui-error')) return true;

    return hasFormControlHelperError(this.root);
  }

  /** Returns `true` if the field is disabled. */
  isDisabled(): boolean {
    return this.root.classList.contains('Mui-disabled');
  }

  /** Returns `true` if the input is required or the label renders a required asterisk. */
  isRequired(): boolean {
    if (this._input.required) return true;

    return hasFormLabelAsterisk(this.root);
  }

  /** Returns `true` if the field renders a multiline textarea. */
  isMultiline(): boolean {
    return this.root.classList.contains('MuiInputBase-multiline');
  }

  /** Returns the start adornment's text content, or `null` if there is no start adornment. */
  getStartAdornmentText(): string | null {
    return this.root.querySelector('.MuiInputAdornment-positionStart')?.textContent ?? null;
  }

  /** Returns the end adornment's text content, or `null` if there is no end adornment. */
  getEndAdornmentText(): string | null {
    return this.root.querySelector('.MuiInputAdornment-positionEnd')?.textContent ?? null;
  }

  /** Clears the input value using UserEvent. */
  clear() {
    return this.user.clear(this._input);
  }

  /** Types the given text into the input using UserEvent. */
  type(value: string) {
    return this.user.type(this._input, value);
  }

  get _input(): HTMLInputElement | HTMLTextAreaElement {
    const input = this.root.querySelector('input') || this.root.querySelector('textarea:not([aria-hidden])');
    if (!input) throw new Error('Input was not rendered');

    return input;
  }

  get _formControl(): Element | null {
    return this.root.closest('.MuiFormControl-root');
  }
}
