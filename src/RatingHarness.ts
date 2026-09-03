import { DomHarness } from 'dom-harness';

/** Harness for MUI `<Rating>`. Queries by `MuiRating-root` class. */
export class RatingHarness extends DomHarness {
  static selector = '.MuiRating-root';

  /** Finds a rating whose radio input `name` matches `textOrRegexp`. */
  static getByName(textOrRegexp: string | RegExp, container?: Element): RatingHarness {
    return this.match(textOrRegexp, (h) => h.getName(), container);
  }

  /** Returns the `name` shared by the rating's radio inputs, or `''` for a read-only rating. */
  getName(): string {
    return this._inputs[0]?.name || '';
  }

  /** Returns the current value, or `null` when nothing is selected. */
  getValue(): number | null {
    if (this.isReadOnly()) {
      const value = this._readOnlyValue();
      return value > 0 ? value : null;
    }

    const checked = this._inputs.find((input) => input.checked);
    if (!checked || checked.value === '') return null;
    return parseFloat(checked.value);
  }

  /** Returns the maximum value (number of icons). */
  getMax(): number {
    if (this.isReadOnly()) {
      return this._stars.length;
    }
    // With `precision` < 1 MUI renders one input per step, so the max is the largest input value.
    return Math.max(0, ...this._inputs.map((input) => parseFloat(input.value) || 0));
  }

  /** Returns `true` if the rating is read-only. */
  isReadOnly(): boolean {
    return this.root.classList.contains('Mui-readOnly');
  }

  /** Returns `true` if the rating is disabled. */
  isDisabled(): boolean {
    return this.root.classList.contains('Mui-disabled');
  }

  /** Selects the given value by clicking its icon. Throws if the value has no icon. */
  async setValue(value: number): Promise<void> {
    const input = this._inputs.find((i) => i.value === String(value));
    if (!input) throw new Error(`Rating value ${value} not found`);
    const label = this.root.querySelector<HTMLLabelElement>(`label[for="${input.id}"]`);
    // MUI derives a hover value from pointer coordinates on mouse move; jsdom has no layout,
    // so skip hover events and let the radio input's own value drive the change.
    await this.user.setup({ skipHover: true }).click(label ?? input);
  }

  /** Returns the visually hidden radio inputs (empty for read-only ratings). */
  get _inputs(): HTMLInputElement[] {
    return Array.from(this.root.querySelectorAll<HTMLInputElement>('input[type="radio"]'));
  }

  /** Read-only ratings render one child `<span>` per star. */
  get _stars(): Element[] {
    return Array.from(this.root.querySelectorAll(':scope > span'));
  }

  /**
   * Sums the filled portion of every star. A star whose base icon is filled counts 1; with a
   * fractional `precision` MUI overlays a filled icon clipped to `width: N%`, which counts N/100.
   * Computed from the icons rather than the (localizable) `aria-label`.
   */
  _readOnlyValue(): number {
    return this._stars.reduce((sum, star) => {
      const icons = star.querySelectorAll('.MuiRating-icon');
      const base = icons[icons.length - 1];
      if (base?.classList.contains('MuiRating-iconFilled')) return sum + 1;

      const overlay = star.querySelector<HTMLElement>('span[style*="width"]');
      const percent = overlay ? parseFloat(overlay.style.width) : 0;
      return sum + (Number.isNaN(percent) ? 0 : percent / 100);
    }, 0);
  }
}
