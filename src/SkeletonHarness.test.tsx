import { render } from '@testing-library/react';
import Skeleton from '@mui/material/Skeleton';
import { SkeletonHarness } from './SkeletonHarness.js';

describe('SkeletonHarness', () => {
  describe('getVariant', () => {
    it('returns text variant by default', () => {
      render(<Skeleton />);

      expect(SkeletonHarness.first().getVariant()).toBe('text');
    });

    it('returns circular variant', () => {
      render(<Skeleton variant="circular" width={40} height={40} />);

      expect(SkeletonHarness.first().getVariant()).toBe('circular');
    });

    it('returns rectangular variant', () => {
      render(<Skeleton variant="rectangular" height={100} />);

      expect(SkeletonHarness.first().getVariant()).toBe('rectangular');
    });

    it('returns rounded variant', () => {
      render(<Skeleton variant="rounded" height={100} />);

      expect(SkeletonHarness.first().getVariant()).toBe('rounded');
    });
  });

  describe('isAnimating', () => {
    it('returns true by default', () => {
      render(<Skeleton />);

      expect(SkeletonHarness.first().isAnimating()).toBe(true);
    });

    it('returns false when animation is disabled', () => {
      render(<Skeleton animation={false} />);

      expect(SkeletonHarness.first().isAnimating()).toBe(false);
    });
  });
});
