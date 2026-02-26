import { DomHarness } from 'dom-harness';
import { ButtonHarness } from './ButtonHarness.js';

type ButtonGroupVariant = 'text' | 'outlined' | 'contained';
type ButtonGroupSize = 'small' | 'medium' | 'large';
type ButtonGroupOrientation = 'horizontal' | 'vertical';

/** Harness for MUI `<ButtonGroup>`. Queries by `MuiButtonGroup-root` class. */
export class ButtonGroupHarness extends DomHarness {
  static selector = '.MuiButtonGroup-root';

  /** Returns all `ButtonHarness` instances within the group. */
  getButtons(): ButtonHarness[] {
    return ButtonHarness.all(this.root);
  }

  /** Returns the group variant: `'text'`, `'outlined'`, or `'contained'`. */
  getVariant(): ButtonGroupVariant {
    const classList = this.root.classList;

    if (classList.contains('MuiButtonGroup-contained')) return 'contained';
    if (classList.contains('MuiButtonGroup-text')) return 'text';

    return 'outlined';
  }

  /** Returns the group size: `'small'`, `'medium'`, or `'large'`. */
  getSize(): ButtonGroupSize {
    const classList = this.root.classList;

    if (classList.contains('MuiButtonGroup-groupedSizeSmall')) return 'small';
    if (classList.contains('MuiButtonGroup-groupedSizeLarge')) return 'large';

    return 'medium';
  }

  /** Returns `'horizontal'` or `'vertical'`. */
  getOrientation(): ButtonGroupOrientation {
    return this.root.classList.contains('MuiButtonGroup-vertical') ? 'vertical' : 'horizontal';
  }
}
