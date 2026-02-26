import { DomHarness } from 'dom-harness';

export class SelectHarness extends DomHarness {
  static selector = '.MuiSelect-select';

  static getByName(textOrRegexp: string | RegExp, container?: Element): SelectHarness {
    return this.match(textOrRegexp, (h) => h.getName(), container);
  }

  static getByLabel(textOrRegexp: string | RegExp, container?: Element): SelectHarness {
    return this.match(textOrRegexp, (h) => h.getLabel(), container);
  }

  getName(): string {
    // MUI Select stores name in a hidden input next to the select element
    const inputBase = this.root.closest('.MuiInputBase-root');
    const hiddenInput = inputBase?.querySelector('.MuiSelect-nativeInput') as HTMLInputElement;
    return hiddenInput?.name || '';
  }

  getLabel(): string {
    // Find the label associated with this select
    const selectRoot = this.root.closest('.MuiFormControl-root');
    const label = selectRoot?.querySelector('.MuiInputLabel-root');
    return label?.textContent || '';
  }

  getValue(): string {
    // MUI Select shows the selected value as text content
    return this.root.textContent || '';
  }

  getDisplayValue(): string {
    return this.getValue();
  }

  isOpen(): boolean {
    return this.root.getAttribute('aria-expanded') === 'true';
  }

  async open(): Promise<void> {
    if (!this.isOpen()) {
      await this.user.click(this.root);
    }
  }

  async close(): Promise<void> {
    if (this.isOpen()) {
      // Press Escape to close the menu
      await this.user.keyboard('{Escape}');
    }
  }

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

  click() {
    return this.user.click(this.root);
  }

  isDisabled(): boolean {
    return this.root.classList.contains('Mui-disabled');
  }

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

  getHelperText(): string | null {
    const formControl = this.root.closest('.MuiFormControl-root');
    const helperText = formControl?.querySelector('.MuiFormHelperText-root');
    return helperText?.textContent || null;
  }
}