import { DomHarness } from 'dom-harness';

type CircularProgressVariant = 'determinate' | 'indeterminate';
type CircularProgressColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'inherit';

interface Dimensions {
  width: number;
  height: number;
}

export class CircularProgressHarness extends DomHarness {
  static selector = '.MuiCircularProgress-root';

  getValue(): number | null {
    const circle = this._circleElement;
    if (!circle) return null;
    
    // Try to get values from style first (inline styles)
    const style = (circle as HTMLElement).style;
    let strokeDasharray = style.strokeDasharray || circle.getAttribute('stroke-dasharray');
    let strokeDashoffset = style.strokeDashoffset || circle.getAttribute('stroke-dashoffset');
    
    if (!strokeDasharray || !strokeDashoffset) return null;
    
    const circumference = parseFloat(strokeDasharray);
    const offset = parseFloat(strokeDashoffset);
    
    return Math.round(((circumference - offset) / circumference) * 100);
  }

  get _svgElement(): Element | null {
    return this.root.querySelector('.MuiCircularProgress-svg');
  }

  get _circleElement(): Element | null {
    return this.root.querySelector('.MuiCircularProgress-circle');
  }

  getVariant(): CircularProgressVariant {
    const classList = this.root.classList;
    
    if (classList.contains('MuiCircularProgress-determinate')) return 'determinate';
    if (classList.contains('MuiCircularProgress-indeterminate')) return 'indeterminate';
    
    return 'indeterminate';
  }

  getSize(): number {
    const computedStyle = window.getComputedStyle(this.root);
    const width = parseFloat(computedStyle.width);
    
    return width || 40;
  }

  getColor(): CircularProgressColor {
    const classList = this.root.classList;
    
    if (classList.contains('MuiCircularProgress-colorPrimary')) return 'primary';
    if (classList.contains('MuiCircularProgress-colorSecondary')) return 'secondary';
    if (classList.contains('MuiCircularProgress-colorError')) return 'error';
    if (classList.contains('MuiCircularProgress-colorWarning')) return 'warning';
    if (classList.contains('MuiCircularProgress-colorInfo')) return 'info';
    if (classList.contains('MuiCircularProgress-colorSuccess')) return 'success';
    if (classList.contains('MuiCircularProgress-colorInherit')) return 'inherit';
    
    return 'primary';
  }

  getThickness(): number | null {
    const svg = this._svgElement;
    const circle = this._circleElement;
    
    if (!svg || !circle) return null;
    
    const strokeWidth = circle.getAttribute('stroke-width');
    return strokeWidth ? parseFloat(strokeWidth) : 3.6;
  }

  isIndeterminate(): boolean {
    return this.getVariant() === 'indeterminate';
  }

  isDeterminate(): boolean {
    return this.getVariant() === 'determinate';
  }

  getRole(): string {
    return this.root.getAttribute('role') || 'progressbar';
  }

  isAnimating(): boolean {
    const svg = this._svgElement;
    if (!svg) return false;
    
    const computedStyle = window.getComputedStyle(svg);
    return computedStyle.animationName !== 'none';
  }

  getDimensions(): Dimensions {
    const computedStyle = window.getComputedStyle(this.root);
    return {
      width: parseFloat(computedStyle.width),
      height: parseFloat(computedStyle.height)
    };
  }
}