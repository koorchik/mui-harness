import { render } from '@testing-library/react';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import { RadioGroupHarness } from './RadioGroupHarness';

describe('RadioGroupHarness', () => {
  function renderRadioGroup(value?: string) {
    return render(
      <RadioGroup value={value ?? ''}>
        <FormControlLabel value="a" control={<Radio />} label="Option A" />
        <FormControlLabel value="b" control={<Radio />} label="Option B" />
        <FormControlLabel value="c" control={<Radio />} label="Option C" disabled />
      </RadioGroup>
    );
  }

  describe('getSelectedValue', () => {
    it('returns selected value', () => {
      renderRadioGroup('b');

      expect(RadioGroupHarness.first().getSelectedValue()).toBe('b');
    });

    it('returns null when nothing selected', () => {
      renderRadioGroup();

      expect(RadioGroupHarness.first().getSelectedValue()).toBeNull();
    });
  });

  describe('getOptions', () => {
    it('returns all options with labels and values', () => {
      renderRadioGroup();

      const options = RadioGroupHarness.first().getOptions();
      expect(options).toEqual([
        { label: 'Option A', value: 'a', disabled: false },
        { label: 'Option B', value: 'b', disabled: false },
        { label: 'Option C', value: 'c', disabled: true },
      ]);
    });
  });

  describe('select', () => {
    it('selects a radio option by value', async () => {
      render(
        <RadioGroup defaultValue="">
          <FormControlLabel value="a" control={<Radio />} label="Option A" />
          <FormControlLabel value="b" control={<Radio />} label="Option B" />
        </RadioGroup>
      );

      await RadioGroupHarness.first().select('b');

      expect(RadioGroupHarness.first().getSelectedValue()).toBe('b');
    });

    it('throws for non-existent value', async () => {
      renderRadioGroup();

      await expect(RadioGroupHarness.first().select('z')).rejects.toThrow('Radio option with value "z" not found');
    });
  });
});
