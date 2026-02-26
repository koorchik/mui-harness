import { DomHarness } from 'dom-harness';
import { TableCellHarness } from './TableCellHarness.js';

/** Harness for MUI table rows. Queries by `MuiTableRow-root` class. */
export class TableRowHarness extends DomHarness {
  static selector = '.MuiTableRow-root';

  /** Returns all `TableCellHarness` instances in the row. */
  getCells(): TableCellHarness[] {
    return TableCellHarness.all(this.root);
  }

  /** Returns the text content of every cell in the row. */
  getCellTexts(): string[] {
    return this.getCells().map(cell => cell.getText());
  }
}
