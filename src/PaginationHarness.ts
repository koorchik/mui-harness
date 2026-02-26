import { DomHarness } from 'dom-harness';

/** Harness for MUI `<Pagination>`. Queries by `MuiPagination-root` class. */
export class PaginationHarness extends DomHarness {
  static selector = '.MuiPagination-root';

  /** Returns the total number of pages. */
  getPageCount(): number {
    const buttons = this.#getPageButtons();
    if (buttons.length === 0) return 0;
    const last = buttons[buttons.length - 1];
    return parseInt(last.textContent || '0', 10);
  }

  /** Returns the currently selected page number. */
  getCurrentPage(): number {
    const current = this.root.querySelector('.MuiPaginationItem-root.Mui-selected');
    return current ? parseInt(current.textContent || '0', 10) : 0;
  }

  /** Clicks the button for the given page number. Throws if not found. */
  async goToPage(page: number) {
    const buttons = this.#getPageButtons();
    const target = buttons.find(btn => btn.textContent === String(page));
    if (!target) throw new Error(`Page ${page} not found`);
    await this.user.click(target);
  }

  /** Clicks the "next page" button. */
  async goToNext() {
    const next = this.root.querySelector('[aria-label="Go to next page"]');
    if (!next) throw new Error('Next button not found');
    await this.user.click(next);
  }

  /** Clicks the "previous page" button. */
  async goToPrevious() {
    const prev = this.root.querySelector('[aria-label="Go to previous page"]');
    if (!prev) throw new Error('Previous button not found');
    await this.user.click(prev);
  }

  #getPageButtons(): Element[] {
    const items = this.root.querySelectorAll('.MuiPaginationItem-page');
    return Array.from(items);
  }
}
