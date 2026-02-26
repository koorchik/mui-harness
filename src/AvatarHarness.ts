import { DomHarness } from 'dom-harness';

type AvatarVariant = 'circular' | 'rounded' | 'square';

export class AvatarHarness extends DomHarness {
  static selector = '.MuiAvatar-root';

  getText(): string {
    return this.root.textContent || '';
  }

  getSrc(): string | null {
    const img = this.root.querySelector('img');
    return img?.getAttribute('src') ?? null;
  }

  getAlt(): string | null {
    const img = this.root.querySelector('img');
    return img?.getAttribute('alt') ?? null;
  }

  getVariant(): AvatarVariant {
    const classList = this.root.classList;

    if (classList.contains('MuiAvatar-rounded')) return 'rounded';
    if (classList.contains('MuiAvatar-square')) return 'square';

    return 'circular';
  }
}
