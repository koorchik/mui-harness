import React from 'react';
import { render } from '@testing-library/react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { ToggleButtonGroupHarness } from './ToggleButtonGroupHarness.js';

function renderGroup(props: Partial<React.ComponentProps<typeof ToggleButtonGroup>> = {}) {
  return render(
    <ToggleButtonGroup value="bold" {...props}>
      <ToggleButton value="bold">Bold</ToggleButton>
      <ToggleButton value="italic">Italic</ToggleButton>
      <ToggleButton value="underline" disabled>Underline</ToggleButton>
    </ToggleButtonGroup>
  );
}

describe('ToggleButtonGroupHarness', () => {
  describe('getButtons / getValues', () => {
    it('returns every button in the group', () => {
      renderGroup();

      const group = ToggleButtonGroupHarness.first();
      expect(group.getButtons()).toHaveLength(3);
      expect(group.getValues()).toEqual(['bold', 'italic', 'underline']);
    });
  });

  describe('getButton', () => {
    it('returns the button with the given value', () => {
      renderGroup();

      expect(ToggleButtonGroupHarness.first().getButton('italic').getText()).toBe('Italic');
    });

    it('throws when the value does not exist', () => {
      renderGroup();

      expect(() => ToggleButtonGroupHarness.first().getButton('nope')).toThrow(/not found/);
    });
  });

  describe('getSelectedValues / getSelectedValue', () => {
    it('returns the single selected value of an exclusive group', () => {
      renderGroup({ exclusive: true });

      const group = ToggleButtonGroupHarness.first();
      expect(group.getSelectedValue()).toBe('bold');
      expect(group.getSelectedValues()).toEqual(['bold']);
    });

    it('returns all selected values of a multi-select group', () => {
      renderGroup({ value: ['bold', 'italic'] });

      expect(ToggleButtonGroupHarness.first().getSelectedValues()).toEqual(['bold', 'italic']);
    });

    it('returns null when nothing is selected', () => {
      renderGroup({ value: null });

      expect(ToggleButtonGroupHarness.first().getSelectedValue()).toBeNull();
    });
  });

  describe('select', () => {
    it('toggles the clicked value', async () => {
      function Controlled() {
        const [value, setValue] = React.useState<string | null>('bold');
        return (
          <ToggleButtonGroup value={value} exclusive onChange={(e, v) => setValue(v)}>
            <ToggleButton value="bold">Bold</ToggleButton>
            <ToggleButton value="italic">Italic</ToggleButton>
          </ToggleButtonGroup>
        );
      }
      render(<Controlled />);

      const group = ToggleButtonGroupHarness.first();
      await group.select('italic');

      expect(group.getSelectedValue()).toBe('italic');
    });
  });

  describe('getOrientation', () => {
    it('defaults to horizontal', () => {
      renderGroup();

      expect(ToggleButtonGroupHarness.first().getOrientation()).toBe('horizontal');
    });

    it('detects vertical', () => {
      renderGroup({ orientation: 'vertical' });

      expect(ToggleButtonGroupHarness.first().getOrientation()).toBe('vertical');
    });
  });

  describe('isDisabled', () => {
    it('returns false when only some buttons are disabled', () => {
      renderGroup();

      expect(ToggleButtonGroupHarness.first().isDisabled()).toBe(false);
    });

    it('returns true when the group is disabled', () => {
      renderGroup({ disabled: true });

      expect(ToggleButtonGroupHarness.first().isDisabled()).toBe(true);
    });
  });
});
