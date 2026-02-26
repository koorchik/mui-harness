import { render } from '@testing-library/react';
import { vi } from 'vitest';
import Pagination from '@mui/material/Pagination';
import { PaginationHarness } from './PaginationHarness.js';

describe('PaginationHarness', () => {
  describe('getPageCount', () => {
    it('returns total page count', () => {
      render(<Pagination count={10} />);

      expect(PaginationHarness.first().getPageCount()).toBe(10);
    });
  });

  describe('getCurrentPage', () => {
    it('returns current page', () => {
      render(<Pagination count={10} page={3} />);

      expect(PaginationHarness.first().getCurrentPage()).toBe(3);
    });
  });

  describe('goToPage', () => {
    it('navigates to specified page', async () => {
      const handleChange = vi.fn();
      render(<Pagination count={10} page={1} onChange={handleChange} />);

      await PaginationHarness.first().goToPage(3);

      expect(handleChange).toHaveBeenCalled();
    });

    it('throws for non-existent page', async () => {
      render(<Pagination count={3} />);

      await expect(PaginationHarness.first().goToPage(99)).rejects.toThrow('Page 99 not found');
    });
  });

  describe('goToNext', () => {
    it('navigates to next page', async () => {
      const handleChange = vi.fn();
      render(<Pagination count={10} page={1} onChange={handleChange} />);

      await PaginationHarness.first().goToNext();

      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('goToPrevious', () => {
    it('navigates to previous page', async () => {
      const handleChange = vi.fn();
      render(<Pagination count={10} page={5} onChange={handleChange} />);

      await PaginationHarness.first().goToPrevious();

      expect(handleChange).toHaveBeenCalled();
    });
  });
});
