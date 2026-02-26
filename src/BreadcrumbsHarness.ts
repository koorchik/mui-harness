import { DomHarness } from 'dom-harness';

export class BreadcrumbsHarness extends DomHarness {
  static selector = '.MuiBreadcrumbs-root';

  getItems(): string[] {
    const ol = this.root.querySelector('.MuiBreadcrumbs-ol');
    if (!ol) return [];
    const items = ol.querySelectorAll('.MuiBreadcrumbs-li');
    return Array.from(items).map(li => li.textContent || '');
  }

  getItemCount(): number {
    return this.getItems().length;
  }

  getSeparator(): string {
    const sep = this.root.querySelector('.MuiBreadcrumbs-separator');
    return sep?.textContent || '';
  }
}
