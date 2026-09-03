import { DomHarness } from 'dom-harness';
import { StepHarness } from './StepHarness.js';

type StepperOrientation = 'horizontal' | 'vertical';

/** Harness for MUI `<Stepper>`. Queries by `MuiStepper-root` class. */
export class StepperHarness extends DomHarness {
  static selector = '.MuiStepper-root';

  /** Returns all `StepHarness` instances in the stepper. */
  getSteps(): StepHarness[] {
    return StepHarness.all(this.root);
  }

  /** Returns the label text of every step. */
  getStepLabels(): string[] {
    return this.getSteps().map((step) => step.getLabel());
  }

  /** Returns the `StepHarness` at the given index. Throws if out of bounds. */
  getStep(index: number): StepHarness {
    const steps = this.getSteps();
    if (!steps[index]) throw new Error(`Step at index ${index} not found`);
    return steps[index];
  }

  /** Returns the zero-based index of the active step, or `-1` if none. */
  getActiveIndex(): number {
    return this.getSteps().findIndex((step) => step.isActive());
  }

  /** Returns the label of the active step, or `null` if none. */
  getActiveLabel(): string | null {
    const index = this.getActiveIndex();
    return index === -1 ? null : this.getStep(index).getLabel();
  }

  /** Returns `'horizontal'` or `'vertical'`. */
  getOrientation(): StepperOrientation {
    return this.root.classList.contains('MuiStepper-vertical') ? 'vertical' : 'horizontal';
  }
}
