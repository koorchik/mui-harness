import { render } from '@testing-library/react';
import { vi } from 'vitest';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { ToggleButtonHarness } from './ToggleButtonHarness.js';

describe('ToggleButtonHarness', () => {
  describe('isSelected', () => {
    it('returns true for selected button', () => {
      render(
        <ToggleButtonGroup value="bold">
          <ToggleButton value="bold">Bold</ToggleButton>
        </ToggleButtonGroup>
      );

      expect(ToggleButtonHarness.first().isSelected()).toBe(true);
    });

    it('returns false for unselected button', () => {
      render(
        <ToggleButtonGroup value="">
          <ToggleButton value="bold">Bold</ToggleButton>
        </ToggleButtonGroup>
      );

      expect(ToggleButtonHarness.first().isSelected()).toBe(false);
    });
  });

  describe('isDisabled', () => {
    it('returns true for disabled button', () => {
      render(
        <ToggleButtonGroup value="">
          <ToggleButton value="bold" disabled>Bold</ToggleButton>
        </ToggleButtonGroup>
      );

      expect(ToggleButtonHarness.first().isDisabled()).toBe(true);
    });

    it('returns false for enabled button', () => {
      render(
        <ToggleButtonGroup value="">
          <ToggleButton value="bold">Bold</ToggleButton>
        </ToggleButtonGroup>
      );

      expect(ToggleButtonHarness.first().isDisabled()).toBe(false);
    });
  });

  describe('getValue', () => {
    it('returns button value', () => {
      render(
        <ToggleButtonGroup value="">
          <ToggleButton value="bold">Bold</ToggleButton>
        </ToggleButtonGroup>
      );

      expect(ToggleButtonHarness.first().getValue()).toBe('bold');
    });
  });

  describe('getText', () => {
    it('returns button text', () => {
      render(
        <ToggleButtonGroup value="">
          <ToggleButton value="bold">Bold</ToggleButton>
        </ToggleButtonGroup>
      );

      expect(ToggleButtonHarness.first().getText()).toBe('Bold');
    });
  });

  describe('click', () => {
    it('triggers onChange', async () => {
      const handleChange = vi.fn();
      render(
        <ToggleButtonGroup value="" onChange={handleChange}>
          <ToggleButton value="bold">Bold</ToggleButton>
        </ToggleButtonGroup>
      );

      await ToggleButtonHarness.first().click();

      expect(handleChange).toHaveBeenCalled();
    });
  });
});
