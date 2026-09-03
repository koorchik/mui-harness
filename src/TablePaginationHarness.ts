import { DomHarness } from 'dom-harness';
import { SelectHarness } from './SelectHarness.js';

/** Harness for MUI `<TablePagination>`. Queries by `MuiTablePagination-root` class. */
export class TablePaginationHarness extends DomHarness {
  static selector = '.MuiTablePagination-root';

  /** Returns the displayed rows text, e.g. `'1–10 of 100'`. */
  getDisplayedRows(): string {
    return this.root.querySelector('.MuiTablePagination-displayedRows')?.textContent || '';
  }

  /** Returns the current rows-per-page value (the option's value, not its label). */
  getRowsPerPage(): number {
    return parseInt(this.rowsPerPageSelect.getSelectedValue(), 10);
  }

  /** Returns the available rows-per-page values. Opens and closes the select. */
  getRowsPerPageOptions(): Promise<number[]> {
    return this.rowsPerPageSelect.getOptionValues().then((values) => values.map((v) => parseInt(v, 10)));
  }

  /** Selects the rows-per-page option with the given value (works with `{ label, value }` options). */
  async setRowsPerPage(value: number): Promise<void> {
    await this.rowsPerPageSelect.selectByValue(String(value));
  }

  /** Returns `true` if the rows-per-page select is rendered (hidden when `rowsPerPageOptions` has one entry). */
  hasRowsPerPageSelect(): boolean {
    try {
      SelectHarness.first(this.root);
      return true;
    } catch {
      return false;
    }
  }

  /** Returns the rows-per-page `SelectHarness`. Throws if not rendered. */
  get rowsPerPageSelect(): SelectHarness {
    const select = SelectHarness.first(this.root);
    select.user = this.user;
    return select;
  }

  /** Clicks the "next page" button. */
  async goToNext(): Promise<void> {
    await this.user.click(this.nextButton);
  }

  /** Clicks the "previous page" button. */
  async goToPrevious(): Promise<void> {
    await this.user.click(this.previousButton);
  }

  /** Returns `true` if the "next page" button is disabled. */
  isNextDisabled(): boolean {
    return this.nextButton.disabled;
  }

  /** Returns `true` if the "previous page" button is disabled. */
  isPreviousDisabled(): boolean {
    return this.previousButton.disabled;
  }

  get nextButton(): HTMLButtonElement {
    return this._actionButton('next');
  }

  get previousButton(): HTMLButtonElement {
    return this._actionButton('previous');
  }

  /**
   * Finds a navigation button. Prefers MUI's default English `aria-label`; under another locale
   * falls back to the button order inside the actions container, which is
   * `[first?] previous next [last?]` on every supported MUI version.
   */
  _actionButton(which: 'previous' | 'next'): HTMLButtonElement {
    const byLabel = this.root.querySelector<HTMLButtonElement>(`button[aria-label="Go to ${which} page"]`);
    if (byLabel) return byLabel;

    const buttons = Array.from(
      this.root.querySelectorAll<HTMLButtonElement>('.MuiTablePagination-actions button')
    );
    const offset = which === 'previous' ? 0 : 1;
    if (buttons.length === 2) return buttons[offset];
    if (buttons.length === 4) return buttons[1 + offset];
    throw new Error(
      `Cannot identify the "${which}" page button: found ${buttons.length} action buttons. ` +
        'Use both or neither of showFirstButton/showLastButton, or keep the default English aria-labels.'
    );
  }
}
