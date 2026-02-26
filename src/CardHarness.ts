import { DomHarness } from 'dom-harness';

export class CardHarness extends DomHarness {
  static selector = '.MuiCard-root';

  getHeaderText(): string {
    const title = this.root.querySelector('.MuiCardHeader-title');
    return title?.textContent || '';
  }

  getSubheaderText(): string {
    const subheader = this.root.querySelector('.MuiCardHeader-subheader');
    return subheader?.textContent || '';
  }

  getContentElement(): Element | null {
    return this.root.querySelector('.MuiCardContent-root');
  }

  getActionsElement(): Element | null {
    return this.root.querySelector('.MuiCardActions-root');
  }
}
