import { render } from '@testing-library/react';
import Drawer from '@mui/material/Drawer';
import { DrawerHarness } from './DrawerHarness.js';

describe('DrawerHarness', () => {
  describe('getPaperElement', () => {
    it('returns paper element', () => {
      render(
        <Drawer open>
          <div>Drawer content</div>
        </Drawer>
      );

      expect(DrawerHarness.first().getPaperElement()).not.toBeNull();
    });
  });

  describe('getWidth', () => {
    it('returns width when set via paper slot style', () => {
      render(
        <Drawer open slotProps={{ paper: { style: { width: '300px' } } }}>
          <div>Drawer content</div>
        </Drawer>
      );

      expect(DrawerHarness.first().getWidth()).toBe('300px');
    });

    it('returns null when no explicit width', () => {
      render(
        <Drawer open>
          <div>Drawer content</div>
        </Drawer>
      );

      expect(DrawerHarness.first().getWidth()).toBeNull();
    });
  });
});
