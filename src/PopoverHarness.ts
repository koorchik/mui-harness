import { DomHarness } from 'dom-harness';
import { PaperHarness } from './PaperHarness.js';

/** Harness for MUI `<Popover>`. Portaled — finders search the full document. Queries by `MuiPopover-root` class. */
export class PopoverHarness extends DomHarness {
  static selector = '.MuiPopover-root';

  /** Returns the popover's inner `PaperHarness`. */
  getPaper(): PaperHarness {
    return PaperHarness.first(this.root);
  }
}
