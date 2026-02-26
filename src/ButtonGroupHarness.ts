import { DomHarness } from 'dom-harness';
import { ButtonHarness } from './ButtonHarness.js';

type ButtonGroupVariant = 'text' | 'outlined' | 'contained';
type ButtonGroupSize = 'small' | 'medium' | 'large';
type ButtonGroupOrientation = 'horizontal' | 'vertical';

export class ButtonGroupHarness extends DomHarness {
  static selector = '.MuiButtonGroup-root';

  getButtons(): ButtonHarness[] {
    return ButtonHarness.all(this.root);
  }

  getVariant(): ButtonGroupVariant {
    const classList = this.root.classList;

    if (classList.contains('MuiButtonGroup-contained')) return 'contained';
    if (classList.contains('MuiButtonGroup-text')) return 'text';

    return 'outlined';
  }

  getSize(): ButtonGroupSize {
    const classList = this.root.classList;

    if (classList.contains('MuiButtonGroup-groupedSizeSmall')) return 'small';
    if (classList.contains('MuiButtonGroup-groupedSizeLarge')) return 'large';

    return 'medium';
  }

  getOrientation(): ButtonGroupOrientation {
    return this.root.classList.contains('MuiButtonGroup-vertical') ? 'vertical' : 'horizontal';
  }
}
