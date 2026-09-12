import { DomHarness } from 'dom-harness';
import { TableRowHarness } from './TableRowHarness.js';

/** Harness for MUI `<TableBody>`. Queries by `MuiTableBody-root` class. */
export class TableBodyHarness extends DomHarness {
  static selector = '.MuiTableBody-root';

  /** Returns all `TableRowHarness` instances in the body. */
  getRows(): TableRowHarness[] {
    return TableRowHarness.all(this.root);
  }

  /** Returns the number of body rows. */
  getRowCount(): number {
    return this.getRows().length;
  }
}
