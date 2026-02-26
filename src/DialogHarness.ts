import { DomHarness } from 'dom-harness';
import { TypographyHarness } from './TypographyHarness.js';

export class DialogHarness extends DomHarness {
  static selector = '.MuiDialog-root';

  getTitle(): string {
    return TypographyHarness.first(this.root).getText();
  }

  getContentElement(): Element | null {
    return this.root.querySelector('.MuiDialogContent-root');
  }

  getActionsElement(): Element | null {
    return this.root.querySelector('.MuiDialogActions-root');
  }
}
