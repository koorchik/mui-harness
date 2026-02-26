import { render } from '@testing-library/react';
import Divider from '@mui/material/Divider';
import { DividerHarness } from './DividerHarness';

describe('DividerHarness', () => {
  describe('getOrientation', () => {
    it('returns horizontal by default', () => {
      render(<Divider />);

      expect(DividerHarness.first().getOrientation()).toBe('horizontal');
    });

    it('returns vertical orientation', () => {
      render(<Divider orientation="vertical" flexItem />);

      expect(DividerHarness.first().getOrientation()).toBe('vertical');
    });
  });

  describe('getVariant', () => {
    it('returns fullWidth by default', () => {
      render(<Divider />);

      expect(DividerHarness.first().getVariant()).toBe('fullWidth');
    });

    it('returns inset variant', () => {
      render(<Divider variant="inset" />);

      expect(DividerHarness.first().getVariant()).toBe('inset');
    });

    it('returns middle variant', () => {
      render(<Divider variant="middle" />);

      expect(DividerHarness.first().getVariant()).toBe('middle');
    });
  });

  describe('getText', () => {
    it('returns text content', () => {
      render(<Divider>OR</Divider>);

      expect(DividerHarness.first().getText()).toBe('OR');
    });

    it('returns empty string when no text', () => {
      render(<Divider />);

      expect(DividerHarness.first().getText()).toBe('');
    });
  });

  describe('hasText', () => {
    it('returns true when divider has text', () => {
      render(<Divider>OR</Divider>);

      expect(DividerHarness.first().hasText()).toBe(true);
    });

    it('returns false when no text', () => {
      render(<Divider />);

      expect(DividerHarness.first().hasText()).toBe(false);
    });
  });
});
