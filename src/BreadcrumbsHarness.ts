import { DomHarness } from 'dom-harness';

/** Harness for MUI `<Breadcrumbs>`. Queries by `MuiBreadcrumbs-root` class. */
export class BreadcrumbsHarness extends DomHarness {
  static selector = '.MuiBreadcrumbs-root';

  /** Returns the text content of each breadcrumb item. */
  getItems(): string[] {
    const ol = this.root.querySelector('.MuiBreadcrumbs-ol');
    if (!ol) return [];
    const items = ol.querySelectorAll('.MuiBreadcrumbs-li');
    return Array.from(items).map(li => li.textContent || '');
  }

  /** Returns the number of breadcrumb items. */
  getItemCount(): number {
    return this.getItems().length;
  }

  /** Returns the text of the breadcrumb separator. */
  getSeparator(): string {
    const sep = this.root.querySelector('.MuiBreadcrumbs-separator');
    return sep?.textContent || '';
  }
}
