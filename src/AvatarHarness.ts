import { DomHarness } from 'dom-harness';

type AvatarVariant = 'circular' | 'rounded' | 'square';

/** Harness for MUI `<Avatar>`. Queries by `MuiAvatar-root` class. */
export class AvatarHarness extends DomHarness {
  static selector = '.MuiAvatar-root';

  /** Returns the text content of the avatar (for letter avatars). */
  getText(): string {
    return this.root.textContent || '';
  }

  /** Returns the `src` attribute of the avatar image, or `null` if none. */
  getSrc(): string | null {
    const img = this.root.querySelector('img');
    return img?.getAttribute('src') ?? null;
  }

  /** Returns the `alt` attribute of the avatar image, or `null` if none. */
  getAlt(): string | null {
    const img = this.root.querySelector('img');
    return img?.getAttribute('alt') ?? null;
  }

  /** Returns the avatar variant: `'circular'`, `'rounded'`, or `'square'`. */
  getVariant(): AvatarVariant {
    const classList = this.root.classList;

    if (classList.contains('MuiAvatar-rounded')) return 'rounded';
    if (classList.contains('MuiAvatar-square')) return 'square';

    return 'circular';
  }
}
