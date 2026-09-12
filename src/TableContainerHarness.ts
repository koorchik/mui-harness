import { DomHarness } from 'dom-harness';
import { TableBodyHarness } from './TableBodyHarness.js';
import { TableHeadHarness } from './TableHeadHarness.js';
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

  /** Returns the table's `TableHeadHarness`. Throws if the table has no `TableHead`. */
  get head(): TableHeadHarness {
    return TableHeadHarness.first(this.root);
  }

  /** Returns the table's `TableBodyHarness`. Throws if the table has no `TableBody`. */
  get body(): TableBodyHarness {
    return TableBodyHarness.first(this.root);
  }

  /** Returns `true` if the table has a `TableHead`. */
  hasHead(): boolean {
    try {
      TableHeadHarness.first(this.root);
      return true;
    } catch {
      return false;
    }
  }

  /** Returns `true` if the table has a `TableBody`. */
  hasBody(): boolean {
    try {
      TableBodyHarness.first(this.root);
      return true;
    } catch {
      return false;
    }
  }
}
