import { DomHarness } from 'dom-harness';

type TypographyVariant =
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'subtitle1' | 'subtitle2'
  | 'body1' | 'body2'
  | 'caption' | 'overline';

type TypographyAlign = 'inherit' | 'left' | 'center' | 'right' | 'justify';

/** Harness for MUI `<Typography>`. Queries by `MuiTypography-root` class. */
export class TypographyHarness extends DomHarness {
  static selector = '.MuiTypography-root';

  /** Finds a typography element whose text matches `textOrRegexp`. */
  static getByText(textOrRegexp: string | RegExp, container?: Element): TypographyHarness {
    return this.match(textOrRegexp, (h) => h.getText(), container);
  }

  /** Returns the element's text content. */
  getText(): string {
    return this.root.textContent || '';
  }

  /** Returns the typography variant: `'h1'`-`'h6'`, `'body1'`, `'caption'`, etc. */
  getVariant(): TypographyVariant {
    const classList = this.root.classList;
    
    if (classList.contains('MuiTypography-h1')) return 'h1';
    if (classList.contains('MuiTypography-h2')) return 'h2';
    if (classList.contains('MuiTypography-h3')) return 'h3';
    if (classList.contains('MuiTypography-h4')) return 'h4';
    if (classList.contains('MuiTypography-h5')) return 'h5';
    if (classList.contains('MuiTypography-h6')) return 'h6';
    if (classList.contains('MuiTypography-subtitle1')) return 'subtitle1';
    if (classList.contains('MuiTypography-subtitle2')) return 'subtitle2';
    if (classList.contains('MuiTypography-body1')) return 'body1';
    if (classList.contains('MuiTypography-body2')) return 'body2';
    if (classList.contains('MuiTypography-caption')) return 'caption';
    if (classList.contains('MuiTypography-overline')) return 'overline';
    
    return 'body1';
  }

  /** Returns the rendered HTML tag name (e.g. `'p'`, `'h1'`). */
  getComponent(): string {
    return this.root.tagName.toLowerCase();
  }

  /** Returns the text alignment: `'inherit'`, `'left'`, `'center'`, `'right'`, or `'justify'`. */
  getAlign(): TypographyAlign {
    const classList = this.root.classList;
    
    if (classList.contains('MuiTypography-alignLeft')) return 'left';
    if (classList.contains('MuiTypography-alignCenter')) return 'center';
    if (classList.contains('MuiTypography-alignRight')) return 'right';
    if (classList.contains('MuiTypography-alignJustify')) return 'justify';
    
    return 'inherit';
  }

  /** Returns `true` if `gutterBottom` spacing is applied. */
  hasGutterBottom(): boolean {
    return this.root.classList.contains('MuiTypography-gutterBottom');
  }

  /** Returns `true` if text wrapping is disabled. */
  hasNoWrap(): boolean {
    return this.root.classList.contains('MuiTypography-noWrap');
  }
}