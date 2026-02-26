import { DomHarness } from 'dom-harness';

/** Harness for MUI `<Card>`. Queries by `MuiCard-root` class. */
export class CardHarness extends DomHarness {
  static selector = '.MuiCard-root';

  /** Returns the card header title text. */
  getHeaderText(): string {
    const title = this.root.querySelector('.MuiCardHeader-title');
    return title?.textContent || '';
  }

  /** Returns the card header subheader text. */
  getSubheaderText(): string {
    const subheader = this.root.querySelector('.MuiCardHeader-subheader');
    return subheader?.textContent || '';
  }

  /** Returns the card content DOM element, or `null` if absent. */
  getContentElement(): Element | null {
    return this.root.querySelector('.MuiCardContent-root');
  }

  /** Returns the card actions DOM element, or `null` if absent. */
  getActionsElement(): Element | null {
    return this.root.querySelector('.MuiCardActions-root');
  }
}
