import { DomHarness } from 'dom-harness';

type DividerOrientation = 'horizontal' | 'vertical';
type DividerVariant = 'fullWidth' | 'inset' | 'middle';

/** Harness for MUI `<Divider>`. Queries by `MuiDivider-root` class. */
export class DividerHarness extends DomHarness {
  static selector = '.MuiDivider-root';

  /** Returns `'horizontal'` or `'vertical'`. */
  getOrientation(): DividerOrientation {
    return this.root.classList.contains('MuiDivider-vertical') ? 'vertical' : 'horizontal';
  }

  /** Returns `'fullWidth'`, `'inset'`, or `'middle'`. */
  getVariant(): DividerVariant {
    const classList = this.root.classList;

    if (classList.contains('MuiDivider-inset')) return 'inset';
    if (classList.contains('MuiDivider-middle')) return 'middle';

    return 'fullWidth';
  }

  /** Returns the divider's text content (for dividers with children). */
  getText(): string {
    const wrapper = this.root.querySelector('.MuiDivider-wrapper');
    return wrapper?.textContent || '';
  }

  /** Returns `true` if the divider contains text. */
  hasText(): boolean {
    return this.root.classList.contains('MuiDivider-withChildren');
  }
}
