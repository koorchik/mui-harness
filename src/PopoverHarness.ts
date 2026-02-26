import { DomHarness } from 'dom-harness';
import { PaperHarness } from './PaperHarness.js';

export class PopoverHarness extends DomHarness {
  static selector = '.MuiPopover-root';

  getPaper(): PaperHarness {
    return PaperHarness.first(this.root);
  }
}
