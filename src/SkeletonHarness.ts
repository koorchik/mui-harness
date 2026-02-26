import { DomHarness } from 'dom-harness';

type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';

export class SkeletonHarness extends DomHarness {
  static selector = '.MuiSkeleton-root';

  getVariant(): SkeletonVariant {
    const classList = this.root.classList;

    if (classList.contains('MuiSkeleton-circular')) return 'circular';
    if (classList.contains('MuiSkeleton-rectangular')) return 'rectangular';
    if (classList.contains('MuiSkeleton-rounded')) return 'rounded';

    return 'text';
  }

  isAnimating(): boolean {
    const classList = this.root.classList;
    return classList.contains('MuiSkeleton-pulse') || classList.contains('MuiSkeleton-wave');
  }
}
