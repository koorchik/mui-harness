import { DomHarness } from 'dom-harness';
import { TypographyHarness } from './TypographyHarness.js';

/** Harness for MUI `<Dialog>`. Portaled -- finders search the full document. Queries by `MuiDialog-root` class. */
export class DialogHarness extends DomHarness {
  static selector = '.MuiDialog-root';

  /** Returns the dialog title text via `TypographyHarness`. */
  getTitle(): string {
    return TypographyHarness.first(this.root).getText();
  }

  /** Returns the dialog content DOM element, or `null` if absent. */
  getContentElement(): Element | null {
    return this.root.querySelector('.MuiDialogContent-root');
  }

  /** Returns the dialog actions DOM element, or `null` if absent. */
  getActionsElement(): Element | null {
    return this.root.querySelector('.MuiDialogActions-root');
  }
}
