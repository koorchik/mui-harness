import { DomHarness } from 'dom-harness';

/** Harness for MUI `<Slider>`. Queries by `MuiSlider-root` class. */
export class SliderHarness extends DomHarness {
  static selector = '.MuiSlider-root';

  /** Returns the current slider value. */
  getValue(): number {
    const input = this.root.querySelector('input');
    return input ? parseFloat(input.value) : 0;
  }

  /** Returns the slider's minimum value. */
  getMin(): number {
    const input = this.root.querySelector('input');
    return input ? parseFloat(input.min) : 0;
  }

  /** Returns the slider's maximum value. */
  getMax(): number {
    const input = this.root.querySelector('input');
    return input ? parseFloat(input.max) : 100;
  }

  /** Returns `true` if the slider is disabled. */
  isDisabled(): boolean {
    return this.root.classList.contains('Mui-disabled');
  }
}
