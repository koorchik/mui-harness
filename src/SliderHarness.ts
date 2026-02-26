import { DomHarness } from 'dom-harness';

export class SliderHarness extends DomHarness {
  static selector = '.MuiSlider-root';

  getValue(): number {
    const input = this.root.querySelector('input');
    return input ? parseFloat(input.value) : 0;
  }

  getMin(): number {
    const input = this.root.querySelector('input');
    return input ? parseFloat(input.min) : 0;
  }

  getMax(): number {
    const input = this.root.querySelector('input');
    return input ? parseFloat(input.max) : 100;
  }

  isDisabled(): boolean {
    return this.root.classList.contains('Mui-disabled');
  }
}
