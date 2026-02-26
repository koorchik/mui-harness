import { DomHarness } from 'dom-harness';

export class TableCellHarness extends DomHarness {
  static selector = '.MuiTableCell-root';

  getText(): string {
    return this.root.textContent || '';
  }
}
