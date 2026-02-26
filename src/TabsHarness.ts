import { DomHarness } from 'dom-harness';
import { TabHarness } from './TabHarness.js';

export class TabsHarness extends DomHarness {
  static selector = '.MuiTabs-root';

  getTabs(): TabHarness[] {
    return TabHarness.all(this.root);
  }

  getTabLabels(): string[] {
    return this.getTabs().map(tab => tab.getLabel());
  }

  getSelectedIndex(): number {
    return this.getTabs().findIndex(tab => tab.isSelected());
  }

  getTab(index: number): TabHarness {
    const tabs = this.getTabs();
    if (!tabs[index]) throw new Error(`Tab at index ${index} not found`);
    return tabs[index];
  }
}
