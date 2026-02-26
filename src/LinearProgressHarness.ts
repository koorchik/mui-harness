import { DomHarness } from 'dom-harness';

type LinearProgressVariant = 'determinate' | 'indeterminate' | 'buffer' | 'query';
type LinearProgressColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

/** Harness for MUI `<LinearProgress>`. Queries by `MuiLinearProgress-root` class. */
export class LinearProgressHarness extends DomHarness {
  static selector = '.MuiLinearProgress-root';

  /** Returns the determinate progress value (0-100), or `null` if indeterminate. */
  getValue(): number | null {
    const progressBar = this._progressBarElement;
    if (!progressBar) return null;
    
    const transform = (progressBar as HTMLElement).style.transform;
    if (!transform) return null;
    
    const match = transform.match(/translateX\((-?\d+(?:\.\d+)?)%\)/);
    if (!match) return null;
    
    // For LinearProgress, the progress is 100% - absolute value of translateX
    // translateX(-25%) means 75% progress
    return 100 + parseFloat(match[1]);
  }

  get _progressBarElement(): Element | null {
    return this.root.querySelector('.MuiLinearProgress-bar');
  }

  /** Returns `'determinate'`, `'indeterminate'`, `'buffer'`, or `'query'`. */
  getVariant(): LinearProgressVariant {
    const classList = this.root.classList;
    
    if (classList.contains('MuiLinearProgress-determinate')) return 'determinate';
    if (classList.contains('MuiLinearProgress-indeterminate')) return 'indeterminate';
    if (classList.contains('MuiLinearProgress-buffer')) return 'buffer';
    if (classList.contains('MuiLinearProgress-query')) return 'query';
    
    return 'indeterminate';
  }

  /** Returns the progress color: `'primary'`, `'secondary'`, etc. */
  getColor(): LinearProgressColor {
    const classList = this.root.classList;
    
    if (classList.contains('MuiLinearProgress-colorPrimary')) return 'primary';
    if (classList.contains('MuiLinearProgress-colorSecondary')) return 'secondary';
    if (classList.contains('MuiLinearProgress-colorError')) return 'error';
    if (classList.contains('MuiLinearProgress-colorWarning')) return 'warning';
    if (classList.contains('MuiLinearProgress-colorInfo')) return 'info';
    if (classList.contains('MuiLinearProgress-colorSuccess')) return 'success';
    
    return 'primary';
  }

  /** Returns `true` if the variant is `'indeterminate'`. */
  isIndeterminate(): boolean {
    return this.getVariant() === 'indeterminate';
  }

  /** Returns `true` if the variant is `'determinate'`. */
  isDeterminate(): boolean {
    return this.getVariant() === 'determinate';
  }

  /** Returns `true` if the variant is `'buffer'`. */
  hasBuffer(): boolean {
    return this.getVariant() === 'buffer';
  }

  /** Returns the buffer progress value (0-100), or `null` if not a buffer variant. */
  getBufferValue(): number | null {
    if (!this.hasBuffer()) return null;
    
    const bufferBar = this._bufferBarElement;
    if (!bufferBar) return null;
    
    const transform = (bufferBar as HTMLElement).style.transform;
    if (!transform) return null;
    
    const match = transform.match(/translateX\((-?\d+(?:\.\d+)?)%\)/);
    if (!match) return null;
    
    // For buffer progress, the calculation is the same as regular progress
    // translateX(-10%) means 90% buffer value
    return 100 + parseFloat(match[1]);
  }

  get _bufferBarElement(): Element | null {
    return this.root.querySelector('.MuiLinearProgress-bar2Buffer');
  }

  /** Returns the ARIA role of the progress element. */
  getRole(): string {
    return this.root.getAttribute('role') || 'progressbar';
  }

  /** Returns `true` if the progress bar is currently animating. */
  isAnimating(): boolean {
    const progressBar = this._progressBarElement;
    if (!progressBar) return false;
    
    const computedStyle = window.getComputedStyle(progressBar);
    return computedStyle.animationName !== 'none';
  }
}