import { DomHarness } from 'dom-harness';

type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export class TooltipHarness extends DomHarness {
  static selector = '.MuiTooltip-popper';

  getTitle(): string | null {
    const tooltip = this._tooltipElement;
    return tooltip ? tooltip.textContent : null;
  }

  get _tooltipElement(): Element | null {
    return this.root.querySelector('.MuiTooltip-tooltip');
  }

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

  isVisible(): boolean {
    const tooltip = this._tooltipElement;
    if (!tooltip) return false;
    
    const style = window.getComputedStyle(tooltip);
    return style.opacity !== '0' && style.visibility !== 'hidden';
  }

  get _arrowElement(): Element | null {
    return this.root.querySelector('.MuiTooltip-arrow');
  }

  hasArrow(): boolean {
    return !!this._arrowElement;
  }
}