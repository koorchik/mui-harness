import { render } from '@testing-library/react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TabsHarness } from './TabsHarness.js';

describe('TabsHarness', () => {
  describe('getTabs', () => {
    it('returns all tabs', () => {
      render(
        <Tabs value={0}>
          <Tab label="One" />
          <Tab label="Two" />
          <Tab label="Three" />
        </Tabs>
      );

      expect(TabsHarness.first().getTabs()).toHaveLength(3);
    });
  });

  describe('getTabLabels', () => {
    it('returns all tab labels', () => {
      render(
        <Tabs value={0}>
          <Tab label="One" />
          <Tab label="Two" />
          <Tab label="Three" />
        </Tabs>
      );

      expect(TabsHarness.first().getTabLabels()).toEqual(['One', 'Two', 'Three']);
    });
  });

  describe('getSelectedIndex', () => {
    it('returns index of selected tab', () => {
      render(
        <Tabs value={1}>
          <Tab label="One" />
          <Tab label="Two" />
          <Tab label="Three" />
        </Tabs>
      );

      expect(TabsHarness.first().getSelectedIndex()).toBe(1);
    });
  });

  describe('getTab', () => {
    it('returns tab at given index', () => {
      render(
        <Tabs value={0}>
          <Tab label="One" />
          <Tab label="Two" />
        </Tabs>
      );

      expect(TabsHarness.first().getTab(1).getLabel()).toBe('Two');
    });

    it('throws for invalid index', () => {
      render(
        <Tabs value={0}>
          <Tab label="One" />
        </Tabs>
      );

      expect(() => TabsHarness.first().getTab(5)).toThrow('Tab at index 5 not found');
    });
  });
});
