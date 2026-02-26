import { DomHarness } from 'dom-harness';

export class DrawerHarness extends DomHarness {
  static selector = '.MuiDrawer-root';

  getPaperElement(): HTMLElement | null {
    return this.root.querySelector('.MuiDrawer-paper') as HTMLElement;
  }

  getWidth(): string | null {
    return this.getPaperElement()?.style?.width || null;
  }
}
