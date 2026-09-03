import { DomHarness } from 'dom-harness';

/** Harness for MUI `<Step>`. Queries by `MuiStep-root` class. State is read from the step's `StepLabel`. */
export class StepHarness extends DomHarness {
  static selector = '.MuiStep-root';

  /** Finds a step whose label matches `textOrRegexp`. */
  static getByLabel(textOrRegexp: string | RegExp, container?: Element): StepHarness {
    return this.match(textOrRegexp, (h) => h.getLabel(), container);
  }

  /** Returns the step label text. */
  getLabel(): string {
    return (this._label ?? this.root).textContent || '';
  }

  /** Returns `true` if this is the active step. */
  isActive(): boolean {
    return this._hasState('Mui-active');
  }

  /** Returns `true` if the step is completed. */
  isCompleted(): boolean {
    return this.root.classList.contains('Mui-completed') || this._hasState('Mui-completed');
  }

  /** Returns `true` if the step is disabled. */
  isDisabled(): boolean {
    return this._hasState('Mui-disabled');
  }

  /** Returns `true` if the step label is in the error state. */
  hasError(): boolean {
    return this._hasState('Mui-error');
  }

  /** Returns `true` if the step renders a clickable `StepButton`. */
  isClickable(): boolean {
    return !!this._button;
  }

  /** Clicks the step's `StepButton`. Throws if the step is not clickable. */
  async click(): Promise<void> {
    const button = this._button;
    if (!button) throw new Error('Step has no StepButton');
    await this.user.click(button);
  }

  get _label(): Element | null {
    return this.root.querySelector('.MuiStepLabel-label');
  }

  get _button(): Element | null {
    return this.root.querySelector('.MuiStepButton-root');
  }

  _hasState(className: string): boolean {
    return !!this._label?.classList.contains(className);
  }
}
