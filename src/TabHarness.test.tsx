import { render } from '@testing-library/react';
import { vi } from 'vitest';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TabHarness } from './TabHarness.js';

describe('TabHarness', () => {
  describe('getLabel', () => {
    it('returns tab label text', () => {
      render(
        <Tabs value={0}>
          <Tab label="First" />
        </Tabs>
      );

      expect(TabHarness.first().getLabel()).toBe('First');
    });
  });

  describe('isSelected', () => {
    it('returns true for selected tab', () => {
      render(
        <Tabs value={0}>
          <Tab label="Selected" />
          <Tab label="Other" />
        </Tabs>
      );

      expect(TabHarness.first().isSelected()).toBe(true);
    });

    it('returns false for unselected tab', () => {
      render(
        <Tabs value={1}>
          <Tab label="First" />
          <Tab label="Selected" />
        </Tabs>
      );

      expect(TabHarness.first().isSelected()).toBe(false);
    });
  });

  describe('isDisabled', () => {
    it('returns true for disabled tab', () => {
      render(
        <Tabs value={0}>
          <Tab label="Disabled" disabled />
        </Tabs>
      );

      expect(TabHarness.first().isDisabled()).toBe(true);
    });

    it('returns false for enabled tab', () => {
      render(
        <Tabs value={0}>
          <Tab label="Enabled" />
        </Tabs>
      );

      expect(TabHarness.first().isDisabled()).toBe(false);
    });
  });

  describe('click', () => {
    it('triggers onChange when tab is clicked', async () => {
      const handleChange = vi.fn();
      render(
        <Tabs value={0} onChange={handleChange}>
          <Tab label="First" />
          <Tab label="Second" />
        </Tabs>
      );

      const tabs = TabHarness.all();
      await tabs[1].click();

      expect(handleChange).toHaveBeenCalled();
    });
  });
});
