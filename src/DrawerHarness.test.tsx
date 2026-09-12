import { render } from '@testing-library/react';
import Drawer from '@mui/material/Drawer';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
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

  describe('getTitle', () => {
    it('returns the DialogTitle text', () => {
      render(
        <Drawer open>
          <DialogTitle>Edit person</DialogTitle>
          <DialogContent>Form goes here</DialogContent>
        </Drawer>
      );

      expect(DrawerHarness.first().getTitle()).toBe('Edit person');
    });
  });

  describe('getActionsElement', () => {
    it('returns the DialogActions element when present', () => {
      render(
        <Drawer open>
          <DialogTitle>Edit person</DialogTitle>
          <DialogContent>Form goes here</DialogContent>
          <DialogActions>Save</DialogActions>
        </Drawer>
      );

      expect(DrawerHarness.first().getActionsElement()).toHaveTextContent('Save');
    });

    it('returns null when there is no DialogActions', () => {
      render(
        <Drawer open>
          <DialogContent>Form goes here</DialogContent>
        </Drawer>
      );

      expect(DrawerHarness.first().getActionsElement()).toBeNull();
    });
  });

  describe('getContentElement', () => {
    it('returns the DialogContent element when present', () => {
      render(
        <Drawer open>
          <DialogTitle>Title</DialogTitle>
          <DialogContent>Form goes here</DialogContent>
        </Drawer>
      );

      expect(DrawerHarness.first().getContentElement()).toHaveTextContent('Form goes here');
    });

    it('returns null when there is no DialogContent', () => {
      render(
        <Drawer open>
          <div>Drawer content</div>
        </Drawer>
      );

      expect(DrawerHarness.first().getContentElement()).toBeNull();
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

    it('returns width when set via paper slot sx', () => {
      render(
        <Drawer open slotProps={{ paper: { sx: { width: 320 } } }}>
          <div>Drawer content</div>
        </Drawer>
      );

      expect(DrawerHarness.first().getWidth()).toBe('320px');
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
