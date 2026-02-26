import { DomHarness } from 'dom-harness';

type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

/** Harness for MUI `<Tooltip>`. Queries by `MuiTooltip-popper` class. */
export class TooltipHarness extends DomHarness {
  static selector = '.MuiTooltip-popper';

  /** Returns the tooltip text, or `null` if the tooltip element is absent. */
  getTitle(): string | null {
    const tooltip = this._tooltipElement;
    return tooltip ? tooltip.textContent : null;
  }

  get _tooltipElement(): Element | null {
    return this.root.querySelector('.MuiTooltip-tooltip');
  }

  /** Returns the tooltip placement: `'top'`, `'bottom'`, `'left'`, or `'right'`. */
  getPlacement(): TooltipPlacement | null {
    if (this.root.hasAttribute('data-popper-placement')) {
      return this.root.getAttribute('data-popper-placement') as TooltipPlacement;
    }
    
    const tooltip = this._tooltipElement;
    if (!tooltip) return null;

    if (tooltip.classList.contains('MuiTooltip-tooltipPlacementTop')) return 'top';
    if (tooltip.classList.contains('MuiTooltip-tooltipPlacementBottom')) return 'bottom';
    if (tooltip.classList.contains('MuiTooltip-tooltipPlacementLeft')) return 'left';
    if (tooltip.classList.contains('MuiTooltip-tooltipPlacementRight')) return 'right';
    
    return 'bottom';
  }

  /** Returns `true` if the tooltip is visible. */
  isVisible(): boolean {
    const tooltip = this._tooltipElement;
    if (!tooltip) return false;
    
    const style = window.getComputedStyle(tooltip);
    return style.opacity !== '0' && style.visibility !== 'hidden';
  }

  get _arrowElement(): Element | null {
    return this.root.querySelector('.MuiTooltip-arrow');
  }

  /** Returns `true` if the tooltip has an arrow element. */
  hasArrow(): boolean {
    return !!this._arrowElement;
  }
}