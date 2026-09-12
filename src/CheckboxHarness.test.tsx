import { render } from '@testing-library/react';
import { vi } from 'vitest';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { CheckboxHarness } from './CheckboxHarness.js';

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

    it('returns error color', () => {
      render(<Checkbox color="error" />);

      expect(CheckboxHarness.first().getColor()).toBe('error');
    });

    it('returns success color', () => {
      render(<Checkbox color="success" />);

      expect(CheckboxHarness.first().getColor()).toBe('success');
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

    it('returns label text without the required asterisk', () => {
      render(<FormControlLabel control={<Checkbox />} label="Accept terms" required />);

      expect(CheckboxHarness.first().getLabel()).toBe('Accept terms');
    });

    it('returns empty string when no FormControlLabel', () => {
      render(<Checkbox />);

      expect(CheckboxHarness.first().getLabel()).toBe('');
    });
  });

  describe('getName', () => {
    it('returns the input name', () => {
      render(<Checkbox name="terms" />);

      expect(CheckboxHarness.first().getName()).toBe('terms');
    });

    it('returns the name passed through FormControlLabel', () => {
      render(<FormControlLabel control={<Checkbox />} label="Accept terms" name="terms" />);

      expect(CheckboxHarness.first().getName()).toBe('terms');
    });

    it('returns empty string when there is no name', () => {
      render(<Checkbox />);

      expect(CheckboxHarness.first().getName()).toBe('');
    });
  });

  describe('getByName', () => {
    it('finds checkbox by name', () => {
      render(
        <div>
          <Checkbox name="terms" />
          <Checkbox name="newsletter" defaultChecked />
        </div>
      );

      expect(CheckboxHarness.getByName('newsletter').isChecked()).toBe(true);
      expect(CheckboxHarness.getByName(/^ter/).isChecked()).toBe(false);
    });

    it('throws when there is no such name', () => {
      render(<Checkbox name="terms" />);

      expect(() => CheckboxHarness.getByName('wrong')).toThrow();
    });
  });

  describe('getByLabel', () => {
    it('finds checkbox by label', () => {
      render(
        <div>
          <FormControlLabel control={<Checkbox name="terms" />} label="Accept terms" />
          <FormControlLabel control={<Checkbox name="newsletter" />} label="Newsletter" />
        </div>
      );

      expect(CheckboxHarness.getByLabel('Newsletter').getName()).toBe('newsletter');
      expect(CheckboxHarness.getByLabel(/terms/).getName()).toBe('terms');
    });

    it('finds a required checkbox by label without the asterisk', () => {
      render(<FormControlLabel control={<Checkbox name="terms" />} label="Accept terms" required />);

      expect(CheckboxHarness.getByLabel('Accept terms').getName()).toBe('terms');
    });

    it('throws when there is no such label', () => {
      render(<FormControlLabel control={<Checkbox />} label="Accept terms" />);

      expect(() => CheckboxHarness.getByLabel('Wrong label')).toThrow();
    });
  });

  describe('isRequired', () => {
    it('returns true for a required checkbox', () => {
      render(<Checkbox required />);

      expect(CheckboxHarness.first().isRequired()).toBe(true);
    });

    it('returns true for a required FormControlLabel', () => {
      render(<FormControlLabel control={<Checkbox />} label="Accept terms" required />);

      expect(CheckboxHarness.first().isRequired()).toBe(true);
    });

    it('returns false for an optional checkbox', () => {
      render(<FormControlLabel control={<Checkbox />} label="Accept terms" />);

      expect(CheckboxHarness.first().isRequired()).toBe(false);
    });
  });

  describe('getHelperText', () => {
    it('returns helper text from the enclosing FormControl', () => {
      render(
        <FormControl>
          <FormControlLabel control={<Checkbox />} label="Accept terms" />
          <FormHelperText>You must accept the terms</FormHelperText>
        </FormControl>
      );

      expect(CheckboxHarness.first().getHelperText()).toBe('You must accept the terms');
    });

    it('returns null when there is no helper text', () => {
      render(<FormControlLabel control={<Checkbox />} label="Accept terms" />);

      expect(CheckboxHarness.first().getHelperText()).toBeNull();
    });
  });

  describe('hasError', () => {
    it('returns true when the enclosing FormControl has an error', () => {
      render(
        <FormControl error>
          <FormControlLabel control={<Checkbox />} label="Accept terms" />
          <FormHelperText>Required</FormHelperText>
        </FormControl>
      );

      const checkbox = CheckboxHarness.first();

      expect(checkbox.hasError()).toBe(true);
      expect(checkbox.getHelperText()).toBe('Required');
    });

    it('returns true when only the helper text has an error', () => {
      render(
        <FormControl>
          <Checkbox />
          <FormHelperText error>Required</FormHelperText>
        </FormControl>
      );

      expect(CheckboxHarness.first().hasError()).toBe(true);
    });

    it('returns false without an error', () => {
      render(
        <FormControl>
          <FormControlLabel control={<Checkbox />} label="Accept terms" />
          <FormHelperText>Optional</FormHelperText>
        </FormControl>
      );

      expect(CheckboxHarness.first().hasError()).toBe(false);
    });
  });
});
