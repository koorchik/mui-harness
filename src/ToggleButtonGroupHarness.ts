import { DomHarness } from 'dom-harness';
import { ToggleButtonHarness } from './ToggleButtonHarness.js';

type ToggleButtonGroupOrientation = 'horizontal' | 'vertical';

/** Harness for MUI `<ToggleButtonGroup>`. Queries by `MuiToggleButtonGroup-root` class. */
export class ToggleButtonGroupHarness extends DomHarness {
  static selector = '.MuiToggleButtonGroup-root';

  /** Returns all `ToggleButtonHarness` instances in the group. */
  getButtons(): ToggleButtonHarness[] {
    return ToggleButtonHarness.all(this.root);
  }

  /** Returns the `ToggleButtonHarness` with the given `value`. Throws if not found. */
  getButton(value: string): ToggleButtonHarness {
    const button = this.getButtons().find((b) => b.getValue() === value);
    if (!button) throw new Error(`ToggleButton with value "${value}" not found`);
    return button;
  }

  /** Returns the `value` of every button in the group. */
  getValues(): string[] {
    return this.getButtons().map((b) => b.getValue());
  }

  /** Returns the values of all selected buttons. */
  getSelectedValues(): string[] {
    return this.getButtons()
      .filter((b) => b.isSelected())
      .map((b) => b.getValue());
  }

  /** Returns the selected value for an exclusive group, or `null` if none is selected. */
  getSelectedValue(): string | null {
    return this.getSelectedValues()[0] ?? null;
  }

  /** Clicks the button with the given `value`, toggling its selection. */
  async select(value: string): Promise<void> {
    await this.getButton(value).click();
  }

  /** Returns `'horizontal'` or `'vertical'`. */
  getOrientation(): ToggleButtonGroupOrientation {
    return this.root.classList.contains('MuiToggleButtonGroup-vertical') ? 'vertical' : 'horizontal';
  }

  /** Returns `true` if every button in the group is disabled. */
  isDisabled(): boolean {
    const buttons = this.getButtons();
    return buttons.length > 0 && buttons.every((b) => b.isDisabled());
  }
}
