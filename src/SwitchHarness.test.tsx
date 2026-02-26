import { render } from '@testing-library/react';
import { vi } from 'vitest';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { SwitchHarness } from './SwitchHarness.js';

describe('SwitchHarness', () => {
  describe('isChecked', () => {
    it('returns true for checked switch', () => {
      render(<Switch checked onChange={() => {}} />);

      expect(SwitchHarness.first().isChecked()).toBe(true);
    });

    it('returns false for unchecked switch', () => {
      render(<Switch />);

      expect(SwitchHarness.first().isChecked()).toBe(false);
    });
  });

  describe('isDisabled', () => {
    it('returns true for disabled switch', () => {
      render(<Switch disabled />);

      expect(SwitchHarness.first().isDisabled()).toBe(true);
    });

    it('returns false for enabled switch', () => {
      render(<Switch />);

      expect(SwitchHarness.first().isDisabled()).toBe(false);
    });
  });

  describe('getColor', () => {
    it('returns primary color', () => {
      render(<Switch color="primary" />);

      expect(SwitchHarness.first().getColor()).toBe('primary');
    });

    it('returns secondary color', () => {
      render(<Switch color="secondary" />);

      expect(SwitchHarness.first().getColor()).toBe('secondary');
    });
  });

  describe('getSize', () => {
    it('returns small size', () => {
      render(<Switch size="small" />);

      expect(SwitchHarness.first().getSize()).toBe('small');
    });

    it('returns medium size by default', () => {
      render(<Switch />);

      expect(SwitchHarness.first().getSize()).toBe('medium');
    });
  });

  describe('toggle', () => {
    it('toggles switch state', async () => {
      const handleChange = vi.fn();
      render(<Switch onChange={handleChange} />);

      await SwitchHarness.first().toggle();

      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('getLabel', () => {
    it('returns label text from FormControlLabel', () => {
      render(<FormControlLabel control={<Switch />} label="Enable feature" />);

      expect(SwitchHarness.first().getLabel()).toBe('Enable feature');
    });

    it('returns empty string when no FormControlLabel', () => {
      render(<Switch />);

      expect(SwitchHarness.first().getLabel()).toBe('');
    });
  });
});
