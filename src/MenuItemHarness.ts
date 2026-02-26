import { DomHarness } from 'dom-harness';
import { IconHarness } from './IconHarness.js';

/** Harness for MUI `<MenuItem>`. Queries by `MuiMenuItem-root` class. */
export class MenuItemHarness extends DomHarness {
  static selector = '.MuiMenuItem-root';

  /** Finds a menu item whose text matches `textOrRegexp`. */
  static getByText(textOrRegexp: string | RegExp, container?: Element): MenuItemHarness {
    return this.match(textOrRegexp, (h) => h.getText(), container);
  }

  /** Returns the menu item's full text content. */
  getText(): string {
    return this.root.textContent || '';
  }

  /** Returns `true` if the menu item is disabled. */
  isDisabled(): boolean {
    return !!(this.root as HTMLElement).getAttribute('disabled') || 
           this.root.classList.contains('Mui-disabled') ||
           this.root.getAttribute('aria-disabled') === 'true';
  }

  /** Returns `true` if the menu item is selected. */
  isSelected(): boolean {
    return this.root.classList.contains('Mui-selected') ||
           this.root.getAttribute('aria-selected') === 'true';
  }

  /** Returns the ARIA role of the menu item. */
  getRole(): string {
    return this.root.getAttribute('role') || 'menuitem';
  }

  /** Returns the item's `data-value` attribute, or `null` if not set. */
  getValue(): string | null {
    const dataValue = this.root.getAttribute('data-value');
    if (dataValue !== null) return dataValue;
    
    // Check if element has a value property and it's not the default
    if ('value' in this.root && (this.root as any).value !== '' && (this.root as any).value !== 0) {
      return (this.root as any).value;
    }
    
    return null;
  }

  /** Returns `true` if the item has a list item icon container. */
  hasIcon(): boolean {
    return !!this._iconContainerElement;
  }

  get _iconContainerElement(): Element | null {
    return this.root.querySelector('.MuiListItemIcon-root');
  }

  /** Returns the `IconHarness` from the item's icon container. Throws if absent. */
  get icon(): IconHarness {
    const iconContainer = this._iconContainerElement;
    if (!iconContainer) {
      throw new Error('No icon container found in MenuItem');
    }
    return IconHarness.first(iconContainer);
  }

  /** Returns `true` if the item has a `ListItemText` element. */
  hasText(): boolean {
    return !!this._textElement;
  }

  get _textElement(): Element | null {
    return this.root.querySelector('.MuiListItemText-root');
  }

  /** Returns the primary text from `ListItemText`, or the full text content. */
  getPrimaryText(): string {
    const textElement = this._textElement;
    if (!textElement) return this.getText();
    
    const primary = textElement.querySelector('.MuiListItemText-primary');
    return primary ? primary.textContent || '' : this.getText();
  }

  /** Returns the secondary text from `ListItemText`, or `null` if absent. */
  getSecondaryText(): string | null {
    const textElement = this._textElement;
    if (!textElement) return null;
    
    const secondary = textElement.querySelector('.MuiListItemText-secondary');
    return secondary ? secondary.textContent : null;
  }

  /** Returns `true` if secondary text is present. */
  hasSecondaryText(): boolean {
    return !!this.getSecondaryText();
  }

  /** Clicks the menu item using UserEvent. */
  click() {
    return this.user.click(this.root);
  }

  /** Returns `true` if the menu item is visible (not hidden via CSS). */
  isVisible(): boolean {
    const style = window.getComputedStyle(this.root);
    return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
  }
}