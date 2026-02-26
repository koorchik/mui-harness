import { DomHarness } from 'dom-harness';

export class TabHarness extends DomHarness {
  static selector = '.MuiTab-root';

  getLabel(): string {
    return this.root.textContent || '';
  }

  isSelected(): boolean {
    return this.root.classList.contains('Mui-selected');
  }

  isDisabled(): boolean {
    return this.root.classList.contains('Mui-disabled');
  }

  async click() {
    await this.user.click(this.root);
  }
}
