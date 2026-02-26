import { render } from '@testing-library/react';
import CircularProgress from '@mui/material/CircularProgress';
import { CircularProgressHarness } from './CircularProgressHarness.js';

describe('CircularProgressHarness', () => {
  describe('getValue', () => {
    it('returns progress value for determinate progress', () => {
      render(<CircularProgress variant="determinate" value={75} />);
      const progress = CircularProgressHarness.first();
      
      const value = progress.getValue();
      expect(value).toBeCloseTo(75, 0);
    });

    it('returns null for indeterminate progress', () => {
      render(<CircularProgress />);
      
      const value = CircularProgressHarness.first().getValue();
      expect(value).toBeNull();
    });
  });

  describe('getVariant', () => {
    it('returns determinate variant', () => {
      render(<CircularProgress variant="determinate" value={50} />);

      expect(CircularProgressHarness.first().getVariant()).toBe('determinate');
    });

    it('returns indeterminate variant by default', () => {
      render(<CircularProgress />);

      expect(CircularProgressHarness.first().getVariant()).toBe('indeterminate');
    });
  });

  describe('getSize', () => {
    it('returns default size of 40', () => {
      render(<CircularProgress />);

      expect(CircularProgressHarness.first().getSize()).toBe(40);
    });

    it('returns custom size', () => {
      render(<CircularProgress size={60} />);

      expect(CircularProgressHarness.first().getSize()).toBe(60);
    });

    it('returns small size', () => {
      render(<CircularProgress size={20} />);

      expect(CircularProgressHarness.first().getSize()).toBe(20);
    });
  });

  describe('getColor', () => {
    it('returns primary color by default', () => {
      render(<CircularProgress />);

      expect(CircularProgressHarness.first().getColor()).toBe('primary');
    });

    it('returns secondary color', () => {
      render(<CircularProgress color="secondary" />);

      expect(CircularProgressHarness.first().getColor()).toBe('secondary');
    });

    it('returns inherit color', () => {
      render(<CircularProgress color="inherit" />);

      expect(CircularProgressHarness.first().getColor()).toBe('inherit');
    });
  });

  describe('getThickness', () => {
    it('returns default thickness', () => {
      render(<CircularProgress />);

      const thickness = CircularProgressHarness.first().getThickness();
      expect(thickness).toBeCloseTo(3.6, 1);
    });

    it('returns custom thickness', () => {
      render(<CircularProgress thickness={5} />);

      const thickness = CircularProgressHarness.first().getThickness();
      expect(thickness).toBeCloseTo(5, 1);
    });
  });

  describe('isIndeterminate', () => {
    it('returns true for indeterminate variant', () => {
      render(<CircularProgress />);

      expect(CircularProgressHarness.first().isIndeterminate()).toBe(true);
    });

    it('returns false for determinate variant', () => {
      render(<CircularProgress variant="determinate" value={50} />);

      expect(CircularProgressHarness.first().isIndeterminate()).toBe(false);
    });
  });

  describe('isDeterminate', () => {
    it('returns true for determinate variant', () => {
      render(<CircularProgress variant="determinate" value={50} />);

      expect(CircularProgressHarness.first().isDeterminate()).toBe(true);
    });

    it('returns false for indeterminate variant', () => {
      render(<CircularProgress />);

      expect(CircularProgressHarness.first().isDeterminate()).toBe(false);
    });
  });

  describe('getRole', () => {
    it('returns progressbar role by default', () => {
      render(<CircularProgress />);

      expect(CircularProgressHarness.first().getRole()).toBe('progressbar');
    });
  });

  describe('isAnimating', () => {
    it('returns true for indeterminate progress (animated)', () => {
      render(<CircularProgress />);

      expect(CircularProgressHarness.first().isAnimating()).toBe(true);
    });
  });

  describe('getDimensions', () => {
    it('returns width and height dimensions', () => {
      render(<CircularProgress size={50} />);

      const dimensions = CircularProgressHarness.first().getDimensions();
      expect(dimensions.width).toBeCloseTo(50, 0);
      expect(dimensions.height).toBeCloseTo(50, 0);
    });
  });
});