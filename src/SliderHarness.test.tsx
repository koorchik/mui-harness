import { render } from '@testing-library/react';
import Slider from '@mui/material/Slider';
import { SliderHarness } from './SliderHarness';

describe('SliderHarness', () => {
  describe('getValue', () => {
    it('returns slider value', () => {
      render(<Slider value={50} />);

      expect(SliderHarness.first().getValue()).toBe(50);
    });
  });

  describe('getMin', () => {
    it('returns min value', () => {
      render(<Slider min={10} value={50} />);

      expect(SliderHarness.first().getMin()).toBe(10);
    });

    it('returns 0 by default', () => {
      render(<Slider value={50} />);

      expect(SliderHarness.first().getMin()).toBe(0);
    });
  });

  describe('getMax', () => {
    it('returns max value', () => {
      render(<Slider max={200} value={50} />);

      expect(SliderHarness.first().getMax()).toBe(200);
    });

    it('returns 100 by default', () => {
      render(<Slider value={50} />);

      expect(SliderHarness.first().getMax()).toBe(100);
    });
  });

  describe('isDisabled', () => {
    it('returns true for disabled slider', () => {
      render(<Slider disabled value={50} />);

      expect(SliderHarness.first().isDisabled()).toBe(true);
    });

    it('returns false for enabled slider', () => {
      render(<Slider value={50} />);

      expect(SliderHarness.first().isDisabled()).toBe(false);
    });
  });
});
