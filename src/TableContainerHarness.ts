import { DomHarness } from 'dom-harness';
import { TableRowHarness } from './TableRowHarness.js';

export class TableContainerHarness extends DomHarness {
  static selector = '.MuiTableContainer-root';

  getRows(): TableRowHarness[] {
    return TableRowHarness.all(this.root);
  }

  getRowCount(): number {
    return this.getRows().length;
  }
}
