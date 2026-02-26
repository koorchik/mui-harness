import { DomHarness } from 'dom-harness';

/** Harness for MUI `<Drawer>`. Portaled — finders search the full document. Queries by `MuiDrawer-root` class. */
export class DrawerHarness extends DomHarness {
  static selector = '.MuiDrawer-root';

  /** Returns the drawer's inner Paper DOM element, or `null` if absent. */
  getPaperElement(): HTMLElement | null {
    return this.root.querySelector('.MuiDrawer-paper') as HTMLElement;
  }

  /** Returns the drawer's CSS width, or `null` if not set. */
  getWidth(): string | null {
    return this.getPaperElement()?.style?.width || null;
  }
}
