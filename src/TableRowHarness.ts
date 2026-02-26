import { DomHarness } from 'dom-harness';
import { TableCellHarness } from './TableCellHarness.js';

export class TableRowHarness extends DomHarness {
  static selector = '.MuiTableRow-root';

  getCells(): TableCellHarness[] {
    return TableCellHarness.all(this.root);
  }

  getCellTexts(): string[] {
    return this.getCells().map(cell => cell.getText());
  }
}
