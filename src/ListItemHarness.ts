import { DomHarness } from 'dom-harness';

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
