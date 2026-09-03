import { render } from '@testing-library/react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AppBarHarness } from './AppBarHarness.js';

describe('AppBarHarness', () => {
  describe('getPosition', () => {
    it('defaults to fixed', () => {
      render(<AppBar>x</AppBar>);

      expect(AppBarHarness.first().getPosition()).toBe('fixed');
    });

    it('detects static and sticky', () => {
      render(
        <div>
          <AppBar position="static">a</AppBar>
          <AppBar position="sticky">b</AppBar>
        </div>
      );

      expect(AppBarHarness.all().map((bar) => bar.getPosition())).toEqual(['static', 'sticky']);
    });
  });

  describe('getColor', () => {
    it('defaults to primary', () => {
      render(<AppBar position="static">x</AppBar>);

      expect(AppBarHarness.first().getColor()).toBe('primary');
    });

    it('detects transparent and default', () => {
      render(
        <div>
          <AppBar position="static" color="transparent">a</AppBar>
          <AppBar position="static" color="default">b</AppBar>
        </div>
      );

      expect(AppBarHarness.all().map((bar) => bar.getColor())).toEqual(['transparent', 'default']);
    });
  });

  describe('toolbar / hasToolbar', () => {
    it('returns the toolbar harness', () => {
      render(
        <AppBar position="static">
          <Toolbar variant="dense">Tools</Toolbar>
        </AppBar>
      );

      const bar = AppBarHarness.first();
      expect(bar.hasToolbar()).toBe(true);
      expect(bar.toolbar.getVariant()).toBe('dense');
    });

    it('throws when there is no toolbar', () => {
      render(<AppBar position="static">bare</AppBar>);

      const bar = AppBarHarness.first();
      expect(bar.hasToolbar()).toBe(false);
      expect(() => bar.toolbar).toThrow(/No Toolbar/);
    });
  });

  describe('getTitle / getText', () => {
    it('returns the first Typography text as title', () => {
      render(
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">My App</Typography>
            <Typography variant="body2">subtitle</Typography>
          </Toolbar>
        </AppBar>
      );

      const bar = AppBarHarness.first();
      expect(bar.getTitle()).toBe('My App');
      expect(bar.getText()).toBe('My Appsubtitle');
    });

    it('returns null when there is no Typography', () => {
      render(<AppBar position="static">plain</AppBar>);

      expect(AppBarHarness.first().getTitle()).toBeNull();
    });
  });
});
