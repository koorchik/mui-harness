import { render } from '@testing-library/react';
import { vi } from 'vitest';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
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

    it('returns error color', () => {
      render(<Switch color="error" />);

      expect(SwitchHarness.first().getColor()).toBe('error');
    });

    it('returns success color', () => {
      render(<Switch color="success" />);

      expect(SwitchHarness.first().getColor()).toBe('success');
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

    it('omits the required asterisk', () => {
      render(<FormControlLabel required control={<Switch />} label="Enable feature" />);

      expect(SwitchHarness.first().getLabel()).toBe('Enable feature');
    });
  });

  describe('getByName', () => {
    it('finds a switch by name', () => {
      render(
        <div>
          <Switch name="alerts" />
          <Switch name="digest" defaultChecked />
        </div>
      );

      expect(SwitchHarness.getByName('digest').isChecked()).toBe(true);
      expect(SwitchHarness.getByName(/^ale/).isChecked()).toBe(false);
    });

    it('throws when there is no such name', () => {
      render(<Switch name="alerts" />);

      expect(() => SwitchHarness.getByName('wrong')).toThrow();
    });
  });

  describe('getByLabel', () => {
    it('finds a switch by FormControlLabel text', () => {
      render(
        <div>
          <FormControlLabel control={<Switch name="alerts" />} label="Alerts" />
          <FormControlLabel control={<Switch name="digest" defaultChecked />} label="Daily digest" />
        </div>
      );

      expect(SwitchHarness.getByLabel('Daily digest').getName()).toBe('digest');
      expect(SwitchHarness.getByLabel(/^Alert/).getName()).toBe('alerts');
    });

    it('throws when there is no such label', () => {
      render(<FormControlLabel control={<Switch />} label="Alerts" />);

      expect(() => SwitchHarness.getByLabel('Wrong')).toThrow();
    });
  });

  describe('getName', () => {
    it('returns the input name', () => {
      render(<Switch name="alerts" />);

      expect(SwitchHarness.first().getName()).toBe('alerts');
    });

    it('returns empty string when unnamed', () => {
      render(<Switch />);

      expect(SwitchHarness.first().getName()).toBe('');
    });
  });

  describe('isRequired', () => {
    it('returns true for a required input', () => {
      render(<Switch required />);

      expect(SwitchHarness.first().isRequired()).toBe(true);
    });

    it('returns true when the FormControlLabel shows an asterisk', () => {
      render(<FormControlLabel required control={<Switch />} label="Alerts" />);

      expect(SwitchHarness.first().isRequired()).toBe(true);
    });

    it('returns false otherwise', () => {
      render(<FormControlLabel control={<Switch />} label="Alerts" />);

      expect(SwitchHarness.first().isRequired()).toBe(false);
    });
  });

  describe('getHelperText / hasError', () => {
    it('reads the helper text of the enclosing FormControl', () => {
      render(
        <FormControl>
          <FormControlLabel control={<Switch />} label="Alerts" />
          <FormHelperText>Sends a daily email</FormHelperText>
        </FormControl>
      );

      const harness = SwitchHarness.first();

      expect(harness.getHelperText()).toBe('Sends a daily email');
      expect(harness.hasError()).toBe(false);
    });

    it('reports the error state from the FormControl', () => {
      render(
        <FormControl error>
          <FormControlLabel control={<Switch />} label="Alerts" />
          <FormHelperText>Required</FormHelperText>
        </FormControl>
      );

      expect(SwitchHarness.first().hasError()).toBe(true);
    });

    it('returns null without helper text', () => {
      render(<Switch />);

      expect(SwitchHarness.first().getHelperText()).toBeNull();
      expect(SwitchHarness.first().hasError()).toBe(false);
    });
  });
});
