import { render } from '@testing-library/react';
import LinearProgress from '@mui/material/LinearProgress';
import { LinearProgressHarness } from './LinearProgressHarness';

describe('LinearProgressHarness', () => {
  describe('getValue', () => {
    it('returns progress value for determinate progress', () => {
      render(<LinearProgress variant="determinate" value={75} />);
      const progress = LinearProgressHarness.first();
      
      const value = progress.getValue();
      expect(value).toBeCloseTo(75, 0);
    });

    it('returns null for indeterminate progress', () => {
      render(<LinearProgress />);
      
      const value = LinearProgressHarness.first().getValue();
      expect(value).toBeNull();
    });
  });

  describe('getVariant', () => {
    it('returns determinate variant', () => {
      render(<LinearProgress variant="determinate" value={50} />);

      expect(LinearProgressHarness.first().getVariant()).toBe('determinate');
    });

    it('returns indeterminate variant by default', () => {
      render(<LinearProgress />);

      expect(LinearProgressHarness.first().getVariant()).toBe('indeterminate');
    });

    it('returns buffer variant', () => {
      render(<LinearProgress variant="buffer" value={75} valueBuffer={90} />);

      expect(LinearProgressHarness.first().getVariant()).toBe('buffer');
    });

    it('returns query variant', () => {
      render(<LinearProgress variant="query" />);

      expect(LinearProgressHarness.first().getVariant()).toBe('query');
    });
  });

  describe('getColor', () => {
    it('returns primary color by default', () => {
      render(<LinearProgress />);

      expect(LinearProgressHarness.first().getColor()).toBe('primary');
    });

    it('returns secondary color', () => {
      render(<LinearProgress color="secondary" />);

      expect(LinearProgressHarness.first().getColor()).toBe('secondary');
    });
  });

  describe('isIndeterminate', () => {
    it('returns true for indeterminate variant', () => {
      render(<LinearProgress />);

      expect(LinearProgressHarness.first().isIndeterminate()).toBe(true);
    });

    it('returns false for determinate variant', () => {
      render(<LinearProgress variant="determinate" value={50} />);

      expect(LinearProgressHarness.first().isIndeterminate()).toBe(false);
    });
  });

  describe('isDeterminate', () => {
    it('returns true for determinate variant', () => {
      render(<LinearProgress variant="determinate" value={50} />);

      expect(LinearProgressHarness.first().isDeterminate()).toBe(true);
    });

    it('returns false for indeterminate variant', () => {
      render(<LinearProgress />);

      expect(LinearProgressHarness.first().isDeterminate()).toBe(false);
    });
  });

  describe('hasBuffer', () => {
    it('returns true for buffer variant', () => {
      render(<LinearProgress variant="buffer" value={75} valueBuffer={90} />);

      expect(LinearProgressHarness.first().hasBuffer()).toBe(true);
    });

    it('returns false for non-buffer variant', () => {
      render(<LinearProgress />);

      expect(LinearProgressHarness.first().hasBuffer()).toBe(false);
    });
  });

  describe('getBufferValue', () => {
    it('returns buffer value for buffer variant', () => {
      render(<LinearProgress variant="buffer" value={75} valueBuffer={90} />);
      const progress = LinearProgressHarness.first();
      
      const bufferValue = progress.getBufferValue();
      expect(bufferValue).toBeCloseTo(90, 0);
    });

    it('returns null for non-buffer variant', () => {
      render(<LinearProgress />);

      expect(LinearProgressHarness.first().getBufferValue()).toBeNull();
    });
  });

  describe('getRole', () => {
    it('returns progressbar role by default', () => {
      render(<LinearProgress />);

      expect(LinearProgressHarness.first().getRole()).toBe('progressbar');
    });
  });

  describe('isAnimating', () => {
    it('returns true for indeterminate progress (animated)', () => {
      render(<LinearProgress />);

      expect(LinearProgressHarness.first().isAnimating()).toBe(true);
    });
  });
});