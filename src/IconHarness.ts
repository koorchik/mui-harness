import { DomHarness } from 'dom-harness';

type IconSize = 'inherit' | 'small' | 'medium' | 'large';
type IconColor = 'inherit' | 'primary' | 'secondary' | 'action' | 'error' | 'disabled' | 'success' | 'warning' | 'info';

interface Dimensions {
  width: number;
  height: number;
}

/** Harness for MUI `<SvgIcon>`. Queries by `MuiSvgIcon-root` class. */
export class IconHarness extends DomHarness {
  static selector = '.MuiSvgIcon-root';

  /** Returns the icon font size: `'inherit'`, `'small'`, `'medium'`, or `'large'`. */
  getSize(): IconSize {
    const classList = this.root.classList;
    
    if (classList.contains('MuiSvgIcon-fontSizeSmall')) return 'small';
    if (classList.contains('MuiSvgIcon-fontSizeLarge')) return 'large';
    if (classList.contains('MuiSvgIcon-fontSizeInherit')) return 'inherit';
    
    return 'medium';
  }

  /** Returns the icon color: `'inherit'`, `'primary'`, `'secondary'`, `'action'`, etc. */
  getColor(): IconColor {
    const classList = this.root.classList;
    
    if (classList.contains('MuiSvgIcon-colorPrimary')) return 'primary';
    if (classList.contains('MuiSvgIcon-colorSecondary')) return 'secondary';
    if (classList.contains('MuiSvgIcon-colorAction')) return 'action';
    if (classList.contains('MuiSvgIcon-colorError')) return 'error';
    if (classList.contains('MuiSvgIcon-colorDisabled')) return 'disabled';
    if (classList.contains('MuiSvgIcon-colorSuccess')) return 'success';
    if (classList.contains('MuiSvgIcon-colorWarning')) return 'warning';
    if (classList.contains('MuiSvgIcon-colorInfo')) return 'info';
    if (classList.contains('MuiSvgIcon-colorInherit')) return 'inherit';

    return 'inherit';
  }

  /** Returns the SVG `viewBox` attribute, or `null`. */
  getViewBox(): string | null {
    return this.root.getAttribute('viewBox');
  }

  /** Returns the `aria-label` attribute, or `null`. */
  getAriaLabel(): string | null {
    return this.root.getAttribute('aria-label');
  }

  /** Returns the `<title>` element's text, or `null`. */
  getTitle(): string | null {
    const titleElement = this.root.querySelector('title');
    return titleElement ? titleElement.textContent : null;
  }

  /** Returns `true` if the icon has a `<title>` element. */
  hasTitle(): boolean {
    return !!this.root.querySelector('title');
  }

  /** Returns the computed `{ width, height }` of the icon. */
  getDimensions(): Dimensions {
    const computedStyle = window.getComputedStyle(this.root);
    return {
      width: parseFloat(computedStyle.width),
      height: parseFloat(computedStyle.height)
    };
  }

  /** Clicks the icon using UserEvent. */
  click() {
    return this.user.click(this.root);
  }
}