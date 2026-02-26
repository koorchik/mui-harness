import { render } from '@testing-library/react';
import { vi } from 'vitest';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButtonHarness } from './IconButtonHarness.js';

describe('IconButtonHarness', () => {
  describe('click', () => {
    it('simulates click', async () => {
      const handleClick = vi.fn();
      render(
        <IconButton onClick={handleClick} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      );
      const iconButton = IconButtonHarness.first();

      await iconButton.click();

      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe('isDisabled', () => {
    it('returns true for disabled icon button', () => {
      render(
        <IconButton disabled aria-label="delete">
          <DeleteIcon />
        </IconButton>
      );

      expect(IconButtonHarness.first().isDisabled()).toBe(true);
    });

    it('returns false for enabled icon button', () => {
      render(
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      );

      expect(IconButtonHarness.first().isDisabled()).toBe(false);
    });
  });

  describe('getSize', () => {
    it('returns small size', () => {
      render(
        <IconButton size="small" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      );

      expect(IconButtonHarness.first().getSize()).toBe('small');
    });

    it('returns large size', () => {
      render(
        <IconButton size="large" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      );

      expect(IconButtonHarness.first().getSize()).toBe('large');
    });

    it('returns medium size by default', () => {
      render(
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      );

      expect(IconButtonHarness.first().getSize()).toBe('medium');
    });
  });

  describe('getColor', () => {
    it('returns primary color', () => {
      render(
        <IconButton color="primary" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      );

      expect(IconButtonHarness.first().getColor()).toBe('primary');
    });

    it('returns secondary color', () => {
      render(
        <IconButton color="secondary" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      );

      expect(IconButtonHarness.first().getColor()).toBe('secondary');
    });

    it('returns default color by default', () => {
      render(
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      );

      expect(IconButtonHarness.first().getColor()).toBe('default');
    });
  });

  describe('hasIcon', () => {
    it('returns true when icon is present', () => {
      render(
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      );

      expect(IconButtonHarness.first().hasIcon()).toBe(true);
    });

    it('returns false when no icon is present', () => {
      render(
        <IconButton aria-label="delete">
          Text only
        </IconButton>
      );

      expect(IconButtonHarness.first().hasIcon()).toBe(false);
    });
  });

  describe('icon getter', () => {
    it('returns IconHarness when icon is present', () => {
      render(
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      );

      const iconHarness = IconButtonHarness.first().icon;
      expect(iconHarness).toBeInstanceOf(Object);
      expect(iconHarness.root.classList.contains('MuiSvgIcon-root')).toBe(true);
    });

    it('throws error when no icon is present', () => {
      render(
        <IconButton aria-label="delete">
          Text only
        </IconButton>
      );

      expect(() => IconButtonHarness.first().icon).toThrow('No icon found in IconButton');
    });
  });
});