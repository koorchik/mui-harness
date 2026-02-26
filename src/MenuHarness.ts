import { DomHarness } from 'dom-harness';
import { MenuItemHarness } from './MenuItemHarness.js';

/** Harness for MUI `<Menu>`. Portaled — finders search the full document. Queries by `MuiMenu-root` class. */
export class MenuHarness extends DomHarness {
  static selector = '.MuiMenu-root';

  /** Returns all `MenuItemHarness` instances in the menu. */
  getItems(): MenuItemHarness[] {
    return MenuItemHarness.all(this.root);
  }

  /** Returns the text content of every menu item. */
  getItemTexts(): string[] {
    return this.getItems().map(item => item.getText());
  }

  /** Returns the `MenuItemHarness` at the given index. Throws if out of bounds. */
  getItem(index: number): MenuItemHarness {
    const items = this.getItems();
    if (!items[index]) throw new Error(`MenuItem at index ${index} not found`);
    return items[index];
  }
}
