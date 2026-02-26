import { DomHarness } from 'dom-harness';
import { MenuItemHarness } from './MenuItemHarness.js';

export class MenuHarness extends DomHarness {
  static selector = '.MuiMenu-root';

  getItems(): MenuItemHarness[] {
    return MenuItemHarness.all(this.root);
  }

  getItemTexts(): string[] {
    return this.getItems().map(item => item.getText());
  }

  getItem(index: number): MenuItemHarness {
    const items = this.getItems();
    if (!items[index]) throw new Error(`MenuItem at index ${index} not found`);
    return items[index];
  }
}
