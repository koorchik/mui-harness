import { render } from '@testing-library/react';
import Badge from '@mui/material/Badge';
import { BadgeHarness } from './BadgeHarness.js';

describe('BadgeHarness', () => {
  describe('getContent', () => {
    it('returns badge content', () => {
      render(
        <Badge badgeContent={4}>
          <span>Mail</span>
        </Badge>
      );

      expect(BadgeHarness.first().getContent()).toBe('4');
    });
  });

  describe('getColor', () => {
    it('returns primary color', () => {
      render(
        <Badge badgeContent={1} color="primary">
          <span>Mail</span>
        </Badge>
      );

      expect(BadgeHarness.first().getColor()).toBe('primary');
    });

    it('returns error color', () => {
      render(
        <Badge badgeContent={1} color="error">
          <span>Mail</span>
        </Badge>
      );

      expect(BadgeHarness.first().getColor()).toBe('error');
    });

    it('returns default when no color set', () => {
      render(
        <Badge badgeContent={1} color="default">
          <span>Mail</span>
        </Badge>
      );

      expect(BadgeHarness.first().getColor()).toBe('default');
    });
  });

  describe('getVariant', () => {
    it('returns dot variant', () => {
      render(
        <Badge variant="dot">
          <span>Mail</span>
        </Badge>
      );

      expect(BadgeHarness.first().getVariant()).toBe('dot');
    });

    it('returns standard variant by default', () => {
      render(
        <Badge badgeContent={4}>
          <span>Mail</span>
        </Badge>
      );

      expect(BadgeHarness.first().getVariant()).toBe('standard');
    });
  });

  describe('isInvisible', () => {
    it('returns true when invisible', () => {
      render(
        <Badge badgeContent={0}>
          <span>Mail</span>
        </Badge>
      );

      expect(BadgeHarness.first().isInvisible()).toBe(true);
    });

    it('returns false when visible', () => {
      render(
        <Badge badgeContent={4}>
          <span>Mail</span>
        </Badge>
      );

      expect(BadgeHarness.first().isInvisible()).toBe(false);
    });
  });
});
