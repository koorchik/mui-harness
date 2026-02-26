import { render } from '@testing-library/react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableContainerHarness } from './TableContainerHarness.js';
import { TableRowHarness } from './TableRowHarness.js';
import { TableCellHarness } from './TableCellHarness.js';

function renderTable() {
  return render(
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
            <TableCell>100</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bob</TableCell>
            <TableCell>200</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

describe('TableContainerHarness', () => {
  describe('getRows', () => {
    it('returns all rows including header', () => {
      renderTable();

      expect(TableContainerHarness.first().getRows().length).toBe(3);
    });
  });

  describe('getRowCount', () => {
    it('returns total row count', () => {
      renderTable();

      expect(TableContainerHarness.first().getRowCount()).toBe(3);
    });
  });
});

describe('TableRowHarness', () => {
  describe('getCells', () => {
    it('returns cells for a row', () => {
      renderTable();

      const rows = TableRowHarness.all();
      expect(rows[1].getCells()).toHaveLength(2);
    });
  });

  describe('getCellTexts', () => {
    it('returns cell texts for a row', () => {
      renderTable();

      const rows = TableRowHarness.all();
      expect(rows[1].getCellTexts()).toEqual(['Alice', '100']);
    });
  });
});

describe('TableCellHarness', () => {
  describe('getText', () => {
    it('returns cell text', () => {
      renderTable();

      expect(TableCellHarness.first().getText()).toBe('Name');
    });
  });
});
