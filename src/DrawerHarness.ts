import { DomHarness } from 'dom-harness';
import { TypographyHarness } from './TypographyHarness.js';

/** Harness for MUI `<Drawer>`. Portaled — finders search the full document. Queries by `MuiDrawer-root` class. */
export class DrawerHarness extends DomHarness {
  static selector = '.MuiDrawer-root';

  /** Returns the drawer's inner Paper DOM element, or `null` if absent. */
  getPaperElement(): HTMLElement | null {
    return this.root.querySelector('.MuiDrawer-paper') as HTMLElement;
  }

  /**
   * Returns the text of the first `Typography` in DOM order — the drawer's title when it opens with
   * one (e.g. a `DialogTitle`). A drawer has no fixed title slot, so in a drawer whose first
   * `Typography` is part of the body this returns that text instead.
   */
  getTitle(): string {
    return TypographyHarness.first(this.root).getText();
  }

  /** Returns the drawer's `DialogContent` DOM element, or `null` if absent. */
  getContentElement(): Element | null {
    return this.root.querySelector('.MuiDialogContent-root');
  }

  /** Returns the drawer's `DialogActions` DOM element, or `null` if absent. */
  getActionsElement(): Element | null {
    return this.root.querySelector('.MuiDialogActions-root');
  }

  /** Returns the paper's CSS width — inline style first, then the computed style (`sx` widths) — or `null` if not set. */
  getWidth(): string | null {
    const paper = this.getPaperElement();
    if (!paper) return null;

    const inline = paper.style?.width;
    if (inline) return inline;

    const computed = window.getComputedStyle(paper).width;
    return computed && computed !== 'auto' ? computed : null;
  }
}
