import { DomHarness } from 'dom-harness';

type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';

/** Harness for MUI `<Skeleton>`. Queries by `MuiSkeleton-root` class. */
export class SkeletonHarness extends DomHarness {
  static selector = '.MuiSkeleton-root';

  /** Returns `'text'`, `'circular'`, `'rectangular'`, or `'rounded'`. */
  getVariant(): SkeletonVariant {
    const classList = this.root.classList;

    if (classList.contains('MuiSkeleton-circular')) return 'circular';
    if (classList.contains('MuiSkeleton-rectangular')) return 'rectangular';
    if (classList.contains('MuiSkeleton-rounded')) return 'rounded';

    return 'text';
  }

  /** Returns `true` if the skeleton has a pulse or wave animation. */
  isAnimating(): boolean {
    const classList = this.root.classList;
    return classList.contains('MuiSkeleton-pulse') || classList.contains('MuiSkeleton-wave');
  }
}
