import { render } from '@testing-library/react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableBodyHarness } from './TableBodyHarness.js';
import { TableContainerHarness } from './TableContainerHarness.js';
import { TableHeadHarness } from './TableHeadHarness.js';
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

describe('TableContainerHarness head/body', () => {
  describe('head', () => {
    it('returns the head harness', () => {
      renderTable();

      expect(TableContainerHarness.first().head.getHeaderTexts()).toEqual(['Name', 'Value']);
    });
  });

  describe('body', () => {
    it('returns the body harness', () => {
      renderTable();

      expect(TableContainerHarness.first().body.getRowCount()).toBe(2);
    });
  });

  describe('hasHead', () => {
    it('returns true when a TableHead is present', () => {
      renderTable();

      expect(TableContainerHarness.first().hasHead()).toBe(true);
    });

    it('returns false for a table without a TableHead', () => {
      render(
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Only body</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      );

      const container = TableContainerHarness.first();
      expect(container.hasHead()).toBe(false);
      expect(() => container.head).toThrow();
      expect(container.body.getRowCount()).toBe(1);
    });
  });

  describe('hasBody', () => {
    it('returns true when a TableBody is present', () => {
      renderTable();

      expect(TableContainerHarness.first().hasBody()).toBe(true);
    });

    it('returns false for a table without a TableBody', () => {
      render(
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Only head</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      );

      const container = TableContainerHarness.first();
      expect(container.hasBody()).toBe(false);
      expect(() => container.body).toThrow();
      expect(container.head.getRowCount()).toBe(1);
    });
  });
});

describe('TableHeadHarness', () => {
  describe('getRows / getRowCount', () => {
    it('returns only header rows', () => {
      renderTable();

      const head = TableHeadHarness.first();
      expect(head.getRowCount()).toBe(1);
      expect(head.getRows()[0].getCellTexts()).toEqual(['Name', 'Value']);
    });
  });

  describe('getHeaderTexts', () => {
    it('returns the cell texts of the first header row', () => {
      renderTable();

      expect(TableHeadHarness.first().getHeaderTexts()).toEqual(['Name', 'Value']);
    });

    it('returns an empty list for an empty head', () => {
      render(
        <TableContainer>
          <Table>
            <TableHead />
          </Table>
        </TableContainer>
      );

      expect(TableHeadHarness.first().getHeaderTexts()).toEqual([]);
    });
  });
});

describe('TableBodyHarness', () => {
  describe('getRows / getRowCount', () => {
    it('returns only body rows', () => {
      renderTable();

      const body = TableBodyHarness.first();
      expect(body.getRowCount()).toBe(2);
      expect(body.getRows().map((row) => row.getCellTexts())).toEqual([
        ['Alice', '100'],
        ['Bob', '200'],
      ]);
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
