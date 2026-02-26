import { DomHarness } from 'dom-harness';

export class AccordionHarness extends DomHarness {
  static selector = '.MuiAccordion-root';

  isExpanded(): boolean {
    return this.root.classList.contains('Mui-expanded');
  }

  isDisabled(): boolean {
    return this.root.classList.contains('Mui-disabled');
  }

  getSummaryText(): string {
    const summary = this.root.querySelector('.MuiAccordionSummary-content');
    return summary?.textContent || '';
  }

  async toggle() {
    const summary = this.root.querySelector('.MuiAccordionSummary-root');
    if (!summary) throw new Error('No AccordionSummary found');
    await this.user.click(summary);
  }
}
