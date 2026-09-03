import React from 'react';
import { render } from '@testing-library/react';
import { vi } from 'vitest';
import TablePagination from '@mui/material/TablePagination';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ukUA } from '@mui/material/locale';
import { TablePaginationHarness } from './TablePaginationHarness.js';

function Controlled({ count = 100 }: { count?: number }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  return (
    <TablePagination
      component="div"
      count={count}
      page={page}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[5, 10, 25]}
      onPageChange={(e, p) => setPage(p)}
      onRowsPerPageChange={(e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
      }}
    />
  );
}

describe('TablePaginationHarness', () => {
  describe('getDisplayedRows', () => {
    it('returns the displayed rows text', () => {
      render(<Controlled />);

      expect(TablePaginationHarness.first().getDisplayedRows()).toBe('1–10 of 100');
    });
  });

  describe('getRowsPerPage / getRowsPerPageOptions', () => {
    it('returns the current rows per page', () => {
      render(<Controlled />);

      expect(TablePaginationHarness.first().getRowsPerPage()).toBe(10);
    });

    it('returns the available options', async () => {
      render(<Controlled />);

      expect(await TablePaginationHarness.first().getRowsPerPageOptions()).toEqual([5, 10, 25]);
    });
  });

  describe('setRowsPerPage', () => {
    it('changes the rows per page', async () => {
      render(<Controlled />);

      const pagination = TablePaginationHarness.first();
      await pagination.setRowsPerPage(25);

      expect(pagination.getRowsPerPage()).toBe(25);
      expect(pagination.getDisplayedRows()).toBe('1–25 of 100');
    });
  });

  describe('hasRowsPerPageSelect', () => {
    it('returns true when several options are offered', () => {
      render(<Controlled />);

      expect(TablePaginationHarness.first().hasRowsPerPageSelect()).toBe(true);
    });

    it('returns false when only one option is offered', () => {
      render(
        <TablePagination
          component="div"
          count={20}
          page={0}
          rowsPerPage={10}
          rowsPerPageOptions={[10]}
          onPageChange={vi.fn()}
        />
      );

      expect(TablePaginationHarness.first().hasRowsPerPageSelect()).toBe(false);
    });
  });

  describe('navigation', () => {
    it('moves to the next and previous page', async () => {
      render(<Controlled />);

      const pagination = TablePaginationHarness.first();
      expect(pagination.isPreviousDisabled()).toBe(true);
      expect(pagination.isNextDisabled()).toBe(false);

      await pagination.goToNext();
      expect(pagination.getDisplayedRows()).toBe('11–20 of 100');
      expect(pagination.isPreviousDisabled()).toBe(false);

      await pagination.goToPrevious();
      expect(pagination.getDisplayedRows()).toBe('1–10 of 100');
    });

    it('disables next on the last page', async () => {
      render(<Controlled count={15} />);

      const pagination = TablePaginationHarness.first();
      await pagination.goToNext();

      expect(pagination.getDisplayedRows()).toBe('11–15 of 15');
      expect(pagination.isNextDisabled()).toBe(true);
    });
  });

  describe('{ label, value } rows-per-page options', () => {
    function WithAll() {
      const [rowsPerPage, setRowsPerPage] = React.useState(10);
      return (
        <TablePagination
          component="div"
          count={100}
          page={0}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[10, { label: 'All', value: -1 }]}
          onPageChange={vi.fn()}
          onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
        />
      );
    }

    it('reads and selects by value rather than label', async () => {
      render(<WithAll />);

      const pagination = TablePaginationHarness.first();
      expect(await pagination.getRowsPerPageOptions()).toEqual([10, -1]);

      await pagination.setRowsPerPage(-1);

      expect(pagination.getRowsPerPage()).toBe(-1);
      expect(pagination.getDisplayedRows()).toBe('1–100 of 100');
    });
  });

  describe('localized navigation buttons', () => {
    function Localized({ showFirstButton = false, showLastButton = false }) {
      const [page, setPage] = React.useState(0);
      return (
        <ThemeProvider theme={createTheme({}, ukUA)}>
          <TablePagination
            component="div"
            count={30}
            page={page}
            rowsPerPage={10}
            rowsPerPageOptions={[10]}
            showFirstButton={showFirstButton}
            showLastButton={showLastButton}
            onPageChange={(e, p) => setPage(p)}
          />
        </ThemeProvider>
      );
    }

    it('navigates without the English aria-labels', async () => {
      render(<Localized />);

      const pagination = TablePaginationHarness.first();
      expect(pagination.isPreviousDisabled()).toBe(true);

      await pagination.goToNext();
      expect(pagination.isPreviousDisabled()).toBe(false);
      await pagination.goToPrevious();
      expect(pagination.isPreviousDisabled()).toBe(true);
    });

    it('navigates when first/last buttons are shown', async () => {
      render(<Localized showFirstButton showLastButton />);

      const pagination = TablePaginationHarness.first();
      await pagination.goToNext();
      await pagination.goToNext();

      expect(pagination.isNextDisabled()).toBe(true);
      expect(pagination.isPreviousDisabled()).toBe(false);
    });

    it('throws a clear error when the button order is ambiguous', () => {
      render(<Localized showLastButton />);

      expect(() => TablePaginationHarness.first().isNextDisabled()).toThrow(/3 action buttons/);
    });
  });
});
