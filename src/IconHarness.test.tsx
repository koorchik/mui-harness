import { render } from '@testing-library/react';
import { vi } from 'vitest';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconHarness } from './IconHarness';

describe('IconHarness', () => {
  describe('getSize', () => {
    it('returns small size', () => {
      render(<DeleteIcon fontSize="small" />);

      expect(IconHarness.first().getSize()).toBe('small');
    });

    it('returns large size', () => {
      render(<DeleteIcon fontSize="large" />);

      expect(IconHarness.first().getSize()).toBe('large');
    });

    it('returns medium size by default', () => {
      render(<DeleteIcon />);

      expect(IconHarness.first().getSize()).toBe('medium');
    });

    it('returns inherit size', () => {
      render(<DeleteIcon fontSize="inherit" />);

      expect(IconHarness.first().getSize()).toBe('inherit');
    });
  });

  describe('getColor', () => {
    it('returns primary color', () => {
      render(<DeleteIcon color="primary" />);

      expect(IconHarness.first().getColor()).toBe('primary');
    });

    it('returns secondary color', () => {
      render(<DeleteIcon color="secondary" />);

      expect(IconHarness.first().getColor()).toBe('secondary');
    });

    it('returns error color', () => {
      render(<DeleteIcon color="error" />);

      expect(IconHarness.first().getColor()).toBe('error');
    });

    it('returns inherit color by default', () => {
      render(<DeleteIcon />);

      expect(IconHarness.first().getColor()).toBe('inherit');
    });
  });

  describe('getViewBox', () => {
    it('returns viewBox attribute', () => {
      render(<DeleteIcon />);

      expect(IconHarness.first().getViewBox()).toBe('0 0 24 24');
    });
  });

  describe('getTitle', () => {
    it('returns title text when present', () => {
      render(<DeleteIcon titleAccess="Delete item" />);

      expect(IconHarness.first().getTitle()).toBe('Delete item');
    });

    it('returns null when no title is present', () => {
      render(<DeleteIcon />);

      expect(IconHarness.first().getTitle()).toBeNull();
    });
  });

  describe('hasTitle', () => {
    it('returns true when title is present', () => {
      render(<DeleteIcon titleAccess="Delete item" />);

      expect(IconHarness.first().hasTitle()).toBe(true);
    });

    it('returns false when no title is present', () => {
      render(<DeleteIcon />);

      expect(IconHarness.first().hasTitle()).toBe(false);
    });
  });

  describe('getDimensions', () => {
    it('returns width and height dimensions', () => {
      render(<DeleteIcon />);

      const dimensions = IconHarness.first().getDimensions();
      expect(dimensions.width).toBeGreaterThan(0);
      expect(dimensions.height).toBeGreaterThan(0);
      expect(dimensions.width).toBe(dimensions.height);
    });
  });

  describe('click', () => {
    it('triggers click when icon is clicked', async () => {
      const handleClick = vi.fn();
      render(<DeleteIcon onClick={handleClick} />);
      const icon = IconHarness.first();

      await icon.click();

      expect(handleClick).toHaveBeenCalled();
    });
  });
});