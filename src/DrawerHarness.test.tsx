import { render } from '@testing-library/react';
import Drawer from '@mui/material/Drawer';
import { DrawerHarness } from './DrawerHarness';

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
    it('returns width when set via PaperProps style', () => {
      render(
        <Drawer open PaperProps={{ style: { width: '300px' } }}>
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
