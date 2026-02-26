import { render } from '@testing-library/react';
import Avatar from '@mui/material/Avatar';
import { AvatarHarness } from './AvatarHarness.js';

describe('AvatarHarness', () => {
  describe('getText', () => {
    it('returns letter avatar text', () => {
      render(<Avatar>AB</Avatar>);

      expect(AvatarHarness.first().getText()).toBe('AB');
    });
  });

  describe('getSrc', () => {
    it('returns image src when present', () => {
      render(<Avatar src="/avatar.jpg" alt="User" />);

      expect(AvatarHarness.first().getSrc()).toBe('/avatar.jpg');
    });

    it('returns null when no image', () => {
      render(<Avatar>A</Avatar>);

      expect(AvatarHarness.first().getSrc()).toBeNull();
    });
  });

  describe('getAlt', () => {
    it('returns alt text when present', () => {
      render(<Avatar src="/avatar.jpg" alt="User avatar" />);

      expect(AvatarHarness.first().getAlt()).toBe('User avatar');
    });

    it('returns null when no image', () => {
      render(<Avatar>A</Avatar>);

      expect(AvatarHarness.first().getAlt()).toBeNull();
    });
  });

  describe('getVariant', () => {
    it('returns circular by default', () => {
      render(<Avatar>A</Avatar>);

      expect(AvatarHarness.first().getVariant()).toBe('circular');
    });

    it('returns rounded variant', () => {
      render(<Avatar variant="rounded">A</Avatar>);

      expect(AvatarHarness.first().getVariant()).toBe('rounded');
    });

    it('returns square variant', () => {
      render(<Avatar variant="square">A</Avatar>);

      expect(AvatarHarness.first().getVariant()).toBe('square');
    });
  });
});
