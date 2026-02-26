import { DomHarness } from 'dom-harness';

type DividerOrientation = 'horizontal' | 'vertical';
type DividerVariant = 'fullWidth' | 'inset' | 'middle';

export class DividerHarness extends DomHarness {
  static selector = '.MuiDivider-root';

  getOrientation(): DividerOrientation {
    return this.root.classList.contains('MuiDivider-vertical') ? 'vertical' : 'horizontal';
  }

  getVariant(): DividerVariant {
    const classList = this.root.classList;

    if (classList.contains('MuiDivider-inset')) return 'inset';
    if (classList.contains('MuiDivider-middle')) return 'middle';

    return 'fullWidth';
  }

  getText(): string {
    const wrapper = this.root.querySelector('.MuiDivider-wrapper');
    return wrapper?.textContent || '';
  }

  hasText(): boolean {
    return this.root.classList.contains('MuiDivider-withChildren');
  }
}
