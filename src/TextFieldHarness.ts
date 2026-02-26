import { DomHarness } from 'dom-harness';

export class TextFieldHarness extends DomHarness {
  static selector = '.MuiInputBase-root';

  static getByName(textOrRegexp: string | RegExp, container?: Element): TextFieldHarness {
    return this.match(textOrRegexp, (h) => h.getName(), container);
  }

  getPlaceholder(): string {
    return this._input.placeholder;
  }

  getName(): string {
    return this._input.name;
  }

  getValue(): string {
    return this._input.value;
  }

  getType(): string {
    return this._input.type;
  }

  clear() {
    return this.user.clear(this._input);
  }

  type(value: string) {
    return this.user.type(this._input, value);
  }

  get _input(): HTMLInputElement | HTMLTextAreaElement {
    const input = this.root.querySelector('input') || this.root.querySelector('textarea:not([aria-hidden])');
    if (!input) throw new Error('Input was not rendered');

    return input;
  }
}