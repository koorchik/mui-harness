import { DomHarness } from 'dom-harness';

/** Harness for MUI `<Tab>`. Queries by `MuiTab-root` class. */
export class TabHarness extends DomHarness {
  static selector = '.MuiTab-root';

  /** Returns the tab's label text. */
  getLabel(): string {
    return this.root.textContent || '';
  }

  /** Returns `true` if the tab is selected. */
  isSelected(): boolean {
    return this.root.classList.contains('Mui-selected');
  }

  /** Returns `true` if the tab is disabled. */
  isDisabled(): boolean {
    return this.root.classList.contains('Mui-disabled');
  }

  /** Clicks the tab using UserEvent. */
  async click() {
    await this.user.click(this.root);
  }
}
