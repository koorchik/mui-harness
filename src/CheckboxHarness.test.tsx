import { render } from '@testing-library/react';
import { vi } from 'vitest';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { CheckboxHarness } from './CheckboxHarness';

describe('CheckboxHarness', () => {
  describe('isChecked', () => {
    it('returns true for checked checkbox', () => {
      render(<Checkbox checked onChange={() => {}} />);

      expect(CheckboxHarness.first().isChecked()).toBe(true);
    });

    it('returns false for unchecked checkbox', () => {
      render(<Checkbox />);

      expect(CheckboxHarness.first().isChecked()).toBe(false);
    });
  });

  describe('isDisabled', () => {
    it('returns true for disabled checkbox', () => {
      render(<Checkbox disabled />);

      expect(CheckboxHarness.first().isDisabled()).toBe(true);
    });

    it('returns false for enabled checkbox', () => {
      render(<Checkbox />);

      expect(CheckboxHarness.first().isDisabled()).toBe(false);
    });
  });

  describe('isIndeterminate', () => {
    it('returns true for indeterminate checkbox', () => {
      render(<Checkbox indeterminate />);

      expect(CheckboxHarness.first().isIndeterminate()).toBe(true);
    });

    it('returns false for non-indeterminate checkbox', () => {
      render(<Checkbox />);

      expect(CheckboxHarness.first().isIndeterminate()).toBe(false);
    });
  });

  describe('getColor', () => {
    it('returns primary color', () => {
      render(<Checkbox color="primary" />);

      expect(CheckboxHarness.first().getColor()).toBe('primary');
    });

    it('returns secondary color', () => {
      render(<Checkbox color="secondary" />);

      expect(CheckboxHarness.first().getColor()).toBe('secondary');
    });
  });

  describe('getSize', () => {
    it('returns small size', () => {
      render(<Checkbox size="small" />);

      expect(CheckboxHarness.first().getSize()).toBe('small');
    });

    it('returns medium size by default', () => {
      render(<Checkbox />);

      expect(CheckboxHarness.first().getSize()).toBe('medium');
    });
  });

  describe('toggle', () => {
    it('toggles checkbox state', async () => {
      const handleChange = vi.fn();
      render(<Checkbox onChange={handleChange} />);

      await CheckboxHarness.first().toggle();

      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe('getLabel', () => {
    it('returns label text from FormControlLabel', () => {
      render(<FormControlLabel control={<Checkbox />} label="Accept terms" />);

      expect(CheckboxHarness.first().getLabel()).toBe('Accept terms');
    });

    it('returns empty string when no FormControlLabel', () => {
      render(<Checkbox />);

      expect(CheckboxHarness.first().getLabel()).toBe('');
    });
  });
});
