import { DomHarness } from 'dom-harness';

export class ToggleButtonHarness extends DomHarness {
  static selector = '.MuiToggleButton-root';

  isSelected(): boolean {
    return this.root.classList.contains('Mui-selected');
  }

  isDisabled(): boolean {
    return this.root.classList.contains('Mui-disabled');
  }

  getValue(): string {
    return this.root.getAttribute('value') || '';
  }

  getText(): string {
    return this.root.textContent || '';
  }

  click() {
    return this.user.click(this.root);
  }
}
