import { DomHarness } from 'dom-harness';

/** Harness for MUI `<TableCell>`. Queries by `MuiTableCell-root` class. */
export class TableCellHarness extends DomHarness {
  static selector = '.MuiTableCell-root';

  /** Returns the cell's text content. */
  getText(): string {
    return this.root.textContent || '';
  }
}
