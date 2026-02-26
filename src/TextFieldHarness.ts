import { DomHarness } from 'dom-harness';

/** Harness for MUI `<TextField>`. Queries by `MuiInputBase-root` class. */
export class TextFieldHarness extends DomHarness {
  static selector = '.MuiInputBase-root';

  /** Finds a text field whose input name matches `textOrRegexp`. */
  static getByName(textOrRegexp: string | RegExp, container?: Element): TextFieldHarness {
    return this.match(textOrRegexp, (h) => h.getName(), container);
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
}