import { DomHarness } from 'dom-harness';

export class ListItemHarness extends DomHarness {
  static selector = '.MuiListItem-root, .MuiListItemButton-root';

  getText(): string {
    const primary = this.root.querySelector('.MuiListItemText-primary');
    if (primary) return primary.textContent || '';
    return this.root.textContent || '';
  }

  getSecondaryText(): string | null {
    const secondary = this.root.querySelector('.MuiListItemText-secondary');
    return secondary ? secondary.textContent || '' : null;
  }

  isSelected(): boolean {
    return this.root.classList.contains('Mui-selected');
  }

  isDisabled(): boolean {
    return this.root.classList.contains('Mui-disabled');
  }

  click() {
    return this.user.click(this.root);
  }
}
