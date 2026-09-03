import { DomHarness } from 'dom-harness';
import { MenuItemHarness } from './MenuItemHarness.js';

/** Harness for MUI `<Select>`. Queries by `MuiSelect-select` class. */
export class SelectHarness extends DomHarness {
  static selector = '.MuiSelect-select';

  /** Finds a select whose input name matches `textOrRegexp`. */
  static getByName(textOrRegexp: string | RegExp, container?: Element): SelectHarness {
    return this.match(textOrRegexp, (h) => h.getName(), container);
  }

  /** Finds a select whose label text matches `textOrRegexp`. */
  static getByLabel(textOrRegexp: string | RegExp, container?: Element): SelectHarness {
    return this.match(textOrRegexp, (h) => h.getLabel(), container);
  }

  /** Returns the hidden input's `name` attribute. */
  getName(): string {
    return this._nativeInput?.name || '';
  }

  /** Returns the associated label text. */
  getLabel(): string {
    const label = this._formControl?.querySelector('.MuiInputLabel-root');
    return label?.textContent || '';
  }

  /** Returns the currently displayed selected value text. */
  getValue(): string {
    // MUI Select shows the selected value as text content
    return this.root.textContent || '';
  }

  /** Alias for `getValue()`. */
  getDisplayValue(): string {
    return this.getValue();
  }

  /** Returns the selected option's underlying value (the hidden input's `value`), as opposed to its display text. */
  getSelectedValue(): string {
    return this._nativeInput?.value ?? '';
  }

  /** Returns `true` if the select dropdown is expanded. */
  isOpen(): boolean {
    return this.root.getAttribute('aria-expanded') === 'true';
  }

  /** Opens the select dropdown if closed. */
  async open(): Promise<void> {
    if (!this.isOpen()) {
      await this.user.click(this.root);
    }
  }

  /** Closes the select dropdown if open. */
  async close(): Promise<void> {
    if (this.isOpen()) {
      // Press Escape to close the menu
      await this.user.keyboard('{Escape}');
    }
  }

  /**
   * Returns the listbox element of this select's open popup.
   * MUI links the display element to its portaled listbox via `aria-controls` while open.
   * If a consumer overrides the listbox id (via `MenuProps`), fall back to the open listbox in the document.
   */
  private getListbox(): Element {
    if (!this.isOpen()) {
      throw new Error('Select popup is not open. Call open() first.');
    }
    const listboxId = this.root.getAttribute('aria-controls');
    const listbox =
      (listboxId ? document.getElementById(listboxId) : null) ?? document.querySelector('[role="listbox"]');
    if (!listbox) {
      throw new Error('Select popup is open but its listbox could not be found.');
    }
    return listbox;
  }

  private getMenuItems(): MenuItemHarness[] {
    return MenuItemHarness.all(this.getListbox()).map((item) => {
      item.user = this.user;
      return item;
    });
  }

  /** Opens the dropdown and clicks the option matching the given text. Throws if not found. */
  async selectByText(text: string): Promise<void> {
    await this.open();
    const item = this.getMenuItems().find((i) => i.getText() === text);
    if (!item) throw new Error(`Option with text "${text}" not found`);
    await item.click();
  }

  /** Opens the dropdown and clicks the option with the given `data-value`. Throws if not found. */
  async selectByValue(value: string): Promise<void> {
    await this.open();
    const item = this.getMenuItems().find((i) => i.getValue() === value);
    if (!item) throw new Error(`Option with value "${value}" not found`);
    await item.click();
  }

  /** Opens the dropdown (if needed), returns all option texts, then restores state. */
  async getOptions(): Promise<string[]> {
    const wasOpen = this.isOpen();
    if (!wasOpen) {
      await this.open();
    }

    const options = this.getMenuItems().map((item) => item.getText());

    if (!wasOpen) {
      await this.close();
    }

    return options;
  }

  /** Opens the dropdown (if needed), returns every option's `data-value`, then restores state. */
  async getOptionValues(): Promise<string[]> {
    const wasOpen = this.isOpen();
    if (!wasOpen) {
      await this.open();
    }

    const values = this.getMenuItems().map((item) => item.getValue() ?? '');

    if (!wasOpen) {
      await this.close();
    }

    return values;
  }

  /** Returns whether the option with the given `data-value` is disabled. The dropdown must be open. */
  isOptionDisabled(value: string): boolean {
    const item = this.getMenuItems().find((i) => i.getValue() === value);
    if (!item) throw new Error(`Option with value "${value}" not found`);
    return item.isDisabled();
  }

  /** Clicks the select element using UserEvent. */
  click() {
    return this.user.click(this.root);
  }

  /** Returns `true` if the select is disabled. */
  isDisabled(): boolean {
    return (
      this.root.classList.contains('Mui-disabled') ||
      !!this._inputBase?.classList.contains('Mui-disabled')
    );
  }

  /** Returns `true` if the select or its form control has an error state. */
  hasError(): boolean {
    if (this._inputBase?.classList.contains('Mui-error')) {
      return true;
    }

    // Also check if there's an error helper text
    return !!this._formControl?.querySelector('.MuiFormHelperText-root.Mui-error');
  }

  /** Returns the helper text below the select, or `null` if absent. */
  getHelperText(): string | null {
    const helperText = this._formControl?.querySelector('.MuiFormHelperText-root');
    return helperText?.textContent || null;
  }

  private get _inputBase(): Element | null {
    return this.root.closest('.MuiInputBase-root');
  }

  /** MUI Select stores name and value in a hidden input next to the display element. */
  private get _nativeInput(): HTMLInputElement | null {
    return this._inputBase?.querySelector<HTMLInputElement>('.MuiSelect-nativeInput') ?? null;
  }

  private get _formControl(): Element | null {
    return this.root.closest('.MuiFormControl-root');
  }
}
