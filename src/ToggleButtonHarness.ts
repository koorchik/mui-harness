import { DomHarness } from 'dom-harness';

/** Harness for MUI `<ToggleButton>`. Queries by `MuiToggleButton-root` class. */
export class ToggleButtonHarness extends DomHarness {
  static selector = '.MuiToggleButton-root';

  /** Returns `true` if the toggle button is selected. */
  isSelected(): boolean {
    return this.root.classList.contains('Mui-selected');
  }

  /** Returns `true` if the toggle button is disabled. */
  isDisabled(): boolean {
    return this.root.classList.contains('Mui-disabled');
  }

  /** Returns the button's `value` attribute. */
  getValue(): string {
    return this.root.getAttribute('value') || '';
  }

  /** Returns the button's visible text content. */
  getText(): string {
    return this.root.textContent || '';
  }

  /** Clicks the toggle button using UserEvent. */
  click() {
    return this.user.click(this.root);
  }
}
