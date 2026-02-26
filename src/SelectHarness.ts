import { DomHarness } from 'dom-harness';

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
    // MUI Select stores name in a hidden input next to the select element
    const inputBase = this.root.closest('.MuiInputBase-root');
    const hiddenInput = inputBase?.querySelector('.MuiSelect-nativeInput') as HTMLInputElement;
    return hiddenInput?.name || '';
  }

  /** Returns the associated label text. */
  getLabel(): string {
    // Find the label associated with this select
    const selectRoot = this.root.closest('.MuiFormControl-root');
    const label = selectRoot?.querySelector('.MuiInputLabel-root');
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

  /** Opens the dropdown and clicks the option matching the given text. */
  async selectByText(text: string): Promise<void> {
    await this.open();
    // Wait a bit for the menu to open
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Find the menu popup that belongs to this select
    const selectId = this.root.getAttribute('id');
    const menuPopup = selectId ? document.querySelector(`#menu-${selectId}`) : null;
    const menuContainer = menuPopup || document.querySelector('[role="listbox"]');
    
    if (!menuContainer) {
      throw new Error('Could not find menu container for select');
    }
    
    // Find the menu item with the given text within the menu container
    const menuItems = Array.from(menuContainer.querySelectorAll('.MuiMenuItem-root'));
    for (const item of menuItems) {
      if (item.textContent === text) {
        await this.user.click(item as HTMLElement);
        break;
      }
    }
  }

  /** Opens the dropdown and clicks the option with the given `data-value`. */
  async selectByValue(value: string): Promise<void> {
    await this.open();
    // Wait a bit for the menu to open
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Find the menu popup that belongs to this select
    const selectId = this.root.getAttribute('id');
    const menuPopup = selectId ? document.querySelector(`#menu-${selectId}`) : null;
    const menuContainer = menuPopup || document.querySelector('[role="listbox"]');
    
    if (!menuContainer) {
      throw new Error('Could not find menu container for select');
    }
    
    // Find the menu item with the given value within the menu container
    const menuItems = Array.from(menuContainer.querySelectorAll('.MuiMenuItem-root'));
    for (const item of menuItems) {
      if (item.getAttribute('data-value') === value) {
        await this.user.click(item as HTMLElement);
        break;
      }
    }
  }

  /** Opens the dropdown (if needed), returns all option texts, then restores state. */
  async getOptions(): Promise<string[]> {
    const wasOpen = this.isOpen();
    if (!wasOpen) {
      await this.open();
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Find the menu popup that belongs to this select
    const selectId = this.root.getAttribute('id');
    const menuPopup = selectId ? document.querySelector(`#menu-${selectId}`) : null;
    const menuContainer = menuPopup || document.querySelector('[role="listbox"]');
    
    if (!menuContainer) {
      throw new Error('Could not find menu container for select');
    }
    
    const menuItems = menuContainer.querySelectorAll('.MuiMenuItem-root');
    const options = Array.from(menuItems).map(item => item.textContent || '');
    
    if (!wasOpen) {
      await this.close();
    }
    
    return options;
  }

  /** Clicks the select element using UserEvent. */
  click() {
    return this.user.click(this.root);
  }

  /** Returns `true` if the select is disabled. */
  isDisabled(): boolean {
    return this.root.classList.contains('Mui-disabled');
  }

  /** Returns `true` if the select or its form control has an error state. */
  hasError(): boolean {
    // Check if the select itself has error state
    const selectRoot = this.root.closest('.MuiInputBase-root');
    if (selectRoot?.classList.contains('Mui-error')) {
      return true;
    }
    
    // Also check if there's an error helper text
    const formControl = this.root.closest('.MuiFormControl-root');
    const helperText = formControl?.querySelector('.MuiFormHelperText-root.Mui-error');
    return !!helperText;
  }

  /** Returns the helper text below the select, or `null` if absent. */
  getHelperText(): string | null {
    const formControl = this.root.closest('.MuiFormControl-root');
    const helperText = formControl?.querySelector('.MuiFormHelperText-root');
    return helperText?.textContent || null;
  }
}