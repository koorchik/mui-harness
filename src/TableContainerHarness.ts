import { DomHarness } from 'dom-harness';
import { TableRowHarness } from './TableRowHarness.js';

/** Harness for MUI `<TableContainer>`. Queries by `MuiTableContainer-root` class. */
export class TableContainerHarness extends DomHarness {
  static selector = '.MuiTableContainer-root';

  /** Returns all `TableRowHarness` instances in the table. */
  getRows(): TableRowHarness[] {
    return TableRowHarness.all(this.root);
  }

  /** Returns the total number of rows. */
  getRowCount(): number {
    return this.getRows().length;
  }
}
