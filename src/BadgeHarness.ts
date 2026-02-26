import { DomHarness } from 'dom-harness';

type BadgeColor = 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
type BadgeVariant = 'standard' | 'dot';

export class BadgeHarness extends DomHarness {
  static selector = '.MuiBadge-root';

  getContent(): string {
    const badge = this.root.querySelector('.MuiBadge-badge');
    return badge?.textContent || '';
  }

  getColor(): BadgeColor {
    const badge = this.root.querySelector('.MuiBadge-badge');
    if (!badge) return 'default';

    const classList = badge.classList;

    if (classList.contains('MuiBadge-colorPrimary')) return 'primary';
    if (classList.contains('MuiBadge-colorSecondary')) return 'secondary';
    if (classList.contains('MuiBadge-colorError')) return 'error';
    if (classList.contains('MuiBadge-colorWarning')) return 'warning';
    if (classList.contains('MuiBadge-colorInfo')) return 'info';
    if (classList.contains('MuiBadge-colorSuccess')) return 'success';

    return 'default';
  }

  getVariant(): BadgeVariant {
    const badge = this.root.querySelector('.MuiBadge-badge');
    if (!badge) return 'standard';
    return badge.classList.contains('MuiBadge-dot') ? 'dot' : 'standard';
  }

  isInvisible(): boolean {
    const badge = this.root.querySelector('.MuiBadge-badge');
    if (!badge) return true;
    return badge.classList.contains('MuiBadge-invisible');
  }
}
