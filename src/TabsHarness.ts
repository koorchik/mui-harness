import { DomHarness } from 'dom-harness';
import { TabHarness } from './TabHarness.js';

/** Harness for MUI `<Tabs>`. Queries by `MuiTabs-root` class. */
export class TabsHarness extends DomHarness {
  static selector = '.MuiTabs-root';

  /** Returns all `TabHarness` instances within the tabs container. */
  getTabs(): TabHarness[] {
    return TabHarness.all(this.root);
  }

  /** Returns the label text of every tab. */
  getTabLabels(): string[] {
    return this.getTabs().map(tab => tab.getLabel());
  }

  /** Returns the zero-based index of the selected tab, or `-1` if none. */
  getSelectedIndex(): number {
    return this.getTabs().findIndex(tab => tab.isSelected());
  }

  /** Returns the `TabHarness` at the given index. Throws if out of bounds. */
  getTab(index: number): TabHarness {
    const tabs = this.getTabs();
    if (!tabs[index]) throw new Error(`Tab at index ${index} not found`);
    return tabs[index];
  }
}
