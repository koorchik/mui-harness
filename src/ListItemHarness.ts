import { DomHarness } from 'dom-harness';
import { IconHarness } from './IconHarness.js';

/** Harness for MUI `<ListItem>` and `<ListItemButton>`. Queries by `MuiListItem-root` or `MuiListItemButton-root` class. */
export class ListItemHarness extends DomHarness {
  static selector = '.MuiListItem-root, .MuiListItemButton-root';

  /** Returns the primary text content of the list item. */
  getText(): string {
    const primary = this.root.querySelector('.MuiListItemText-primary');
    if (primary) return primary.textContent || '';
    return this.root.textContent || '';
  }

  /** Returns the secondary text, or `null` if absent. */
  getSecondaryText(): string | null {
    const secondary = this.root.querySelector('.MuiListItemText-secondary');
    return secondary ? secondary.textContent || '' : null;
  }

  /** Returns `true` if the item has a `ListItemText` element. */
  hasText(): boolean {
    return !!this._textElement;
  }

  get _textElement(): Element | null {
    return this.root.querySelector('.MuiListItemText-root');
  }

  /** Returns the primary text from `ListItemText`, or the item's full text content when there is none. */
  getPrimaryText(): string {
    const textElement = this._textElement;
    if (!textElement) return this.getText();

    const primary = textElement.querySelector('.MuiListItemText-primary');
    return primary ? primary.textContent || '' : this.getText();
  }

  /** Returns `true` if the item has a `ListItemIcon` container. */
  hasIcon(): boolean {
    return !!this._iconContainerElement;
  }

  get _iconContainerElement(): Element | null {
    return this.root.querySelector('.MuiListItemIcon-root');
  }

  /** Returns the `IconHarness` from the item's `ListItemIcon` container. Throws if absent. */
  get icon(): IconHarness {
    const iconContainer = this._iconContainerElement;
    if (!iconContainer) {
      throw new Error('No icon container found in ListItem');
    }
    return IconHarness.first(iconContainer);
  }

  /** Returns `true` if the item is selected. */
  isSelected(): boolean {
    return this.root.classList.contains('Mui-selected');
  }

  /** Returns `true` if the item is disabled. */
  isDisabled(): boolean {
    return this.root.classList.contains('Mui-disabled');
  }

  /** Clicks the list item using UserEvent. */
  click() {
    return this.user.click(this.root);
  }
}
