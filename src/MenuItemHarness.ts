import { DomHarness } from 'dom-harness';
import { IconHarness } from './IconHarness.js';

export class MenuItemHarness extends DomHarness {
  static selector = '.MuiMenuItem-root';

  static getByText(textOrRegexp: string | RegExp, container?: Element): MenuItemHarness {
    return this.match(textOrRegexp, (h) => h.getText(), container);
  }

  getText(): string {
    return this.root.textContent || '';
  }

  isDisabled(): boolean {
    return !!(this.root as HTMLElement).getAttribute('disabled') || 
           this.root.classList.contains('Mui-disabled') ||
           this.root.getAttribute('aria-disabled') === 'true';
  }

  isSelected(): boolean {
    return this.root.classList.contains('Mui-selected') ||
           this.root.getAttribute('aria-selected') === 'true';
  }

  getRole(): string {
    return this.root.getAttribute('role') || 'menuitem';
  }

  getValue(): string | null {
    const dataValue = this.root.getAttribute('data-value');
    if (dataValue !== null) return dataValue;
    
    // Check if element has a value property and it's not the default
    if ('value' in this.root && (this.root as any).value !== '' && (this.root as any).value !== 0) {
      return (this.root as any).value;
    }
    
    return null;
  }

  hasIcon(): boolean {
    return !!this._iconContainerElement;
  }

  get _iconContainerElement(): Element | null {
    return this.root.querySelector('.MuiListItemIcon-root');
  }

  get icon(): IconHarness {
    const iconContainer = this._iconContainerElement;
    if (!iconContainer) {
      throw new Error('No icon container found in MenuItem');
    }
    return IconHarness.first(iconContainer);
  }

  hasText(): boolean {
    return !!this._textElement;
  }

  get _textElement(): Element | null {
    return this.root.querySelector('.MuiListItemText-root');
  }

  getPrimaryText(): string {
    const textElement = this._textElement;
    if (!textElement) return this.getText();
    
    const primary = textElement.querySelector('.MuiListItemText-primary');
    return primary ? primary.textContent || '' : this.getText();
  }

  getSecondaryText(): string | null {
    const textElement = this._textElement;
    if (!textElement) return null;
    
    const secondary = textElement.querySelector('.MuiListItemText-secondary');
    return secondary ? secondary.textContent : null;
  }

  hasSecondaryText(): boolean {
    return !!this.getSecondaryText();
  }

  click() {
    return this.user.click(this.root);
  }

  isVisible(): boolean {
    const style = window.getComputedStyle(this.root);
    return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
  }
}