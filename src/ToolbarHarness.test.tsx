import { render } from '@testing-library/react';
import Toolbar from '@mui/material/Toolbar';
import { ToolbarHarness } from './ToolbarHarness.js';

describe('ToolbarHarness', () => {
  describe('getText', () => {
    it('returns the toolbar text', () => {
      render(<Toolbar>Site title</Toolbar>);

      expect(ToolbarHarness.first().getText()).toBe('Site title');
    });
  });

  describe('getVariant', () => {
    it('defaults to regular', () => {
      render(<Toolbar>x</Toolbar>);

      expect(ToolbarHarness.first().getVariant()).toBe('regular');
    });

    it('detects dense', () => {
      render(<Toolbar variant="dense">x</Toolbar>);

      expect(ToolbarHarness.first().getVariant()).toBe('dense');
    });
  });

  describe('hasGutters', () => {
    it('returns true by default', () => {
      render(<Toolbar>x</Toolbar>);

      expect(ToolbarHarness.first().hasGutters()).toBe(true);
    });

    it('returns false when gutters are disabled', () => {
      render(<Toolbar disableGutters>x</Toolbar>);

      expect(ToolbarHarness.first().hasGutters()).toBe(false);
    });
  });
});
