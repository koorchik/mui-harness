import { DomHarness } from 'dom-harness';

/** Harness for MUI `<Accordion>`. Queries by `MuiAccordion-root` class. */
export class AccordionHarness extends DomHarness {
  static selector = '.MuiAccordion-root';

  /** Returns `true` if the accordion is currently expanded. */
  isExpanded(): boolean {
    return this.root.classList.contains('Mui-expanded');
  }

  /** Returns `true` if the accordion is disabled. */
  isDisabled(): boolean {
    return this.root.classList.contains('Mui-disabled');
  }

  /** Returns the text content of the accordion summary. */
  getSummaryText(): string {
    const summary = this.root.querySelector('.MuiAccordionSummary-content');
    return summary?.textContent || '';
  }

  /** Clicks the accordion summary to expand or collapse it. */
  async toggle() {
    const summary = this.root.querySelector('.MuiAccordionSummary-root');
    if (!summary) throw new Error('No AccordionSummary found');
    await this.user.click(summary);
  }
}
