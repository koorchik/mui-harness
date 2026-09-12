import { DomHarness } from 'dom-harness';
import { TableRowHarness } from './TableRowHarness.js';

/** Harness for MUI `<TableHead>`. Queries by `MuiTableHead-root` class. */
export class TableHeadHarness extends DomHarness {
  static selector = '.MuiTableHead-root';

  /** Returns all `TableRowHarness` instances in the head. */
  getRows(): TableRowHarness[] {
    return TableRowHarness.all(this.root);
  }

  /** Returns the number of header rows. */
  getRowCount(): number {
    return this.getRows().length;
  }

  /** Returns the cell texts of the first header row (empty when the head has no rows). */
  getHeaderTexts(): string[] {
    const [firstRow] = this.getRows();
    return firstRow ? firstRow.getCellTexts() : [];
  }
}
