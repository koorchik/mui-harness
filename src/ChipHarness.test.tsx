import { render } from '@testing-library/react';
import { vi } from 'vitest';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import FaceIcon from '@mui/icons-material/Face';
import { ChipHarness } from './ChipHarness.js';

describe('ChipHarness', () => {
  describe('getLabel', () => {
    it('returns chip label text', () => {
      render(<Chip label="Basic chip" />);

      expect(ChipHarness.first().getLabel()).toBe('Basic chip');
    });
  });

  describe('isDisabled', () => {
    it('returns true for disabled chip', () => {
      render(<Chip label="Disabled chip" disabled />);

      expect(ChipHarness.first().isDisabled()).toBe(true);
    });

    it('returns false for enabled chip', () => {
      render(<Chip label="Enabled chip" />);

      expect(ChipHarness.first().isDisabled()).toBe(false);
    });
  });

  describe('isClickable', () => {
    it('returns true for clickable chip', () => {
      const handleClick = vi.fn();
      render(<Chip label="Clickable chip" onClick={handleClick} />);

      expect(ChipHarness.first().isClickable()).toBe(true);
    });

    it('returns false for non-clickable chip', () => {
      render(<Chip label="Basic chip" />);

      expect(ChipHarness.first().isClickable()).toBe(false);
    });
  });

  describe('isDeletable', () => {
    it('returns true for deletable chip', () => {
      const handleDelete = vi.fn();
      render(<Chip label="Deletable chip" onDelete={handleDelete} />);

      expect(ChipHarness.first().isDeletable()).toBe(true);
    });

    it('returns false for non-deletable chip', () => {
      render(<Chip label="Basic chip" />);

      expect(ChipHarness.first().isDeletable()).toBe(false);
    });
  });

  describe('getVariant', () => {
    it('returns outlined variant', () => {
      render(<Chip label="Outlined chip" variant="outlined" />);

      expect(ChipHarness.first().getVariant()).toBe('outlined');
    });

    it('returns filled variant by default', () => {
      render(<Chip label="Basic chip" />);

      expect(ChipHarness.first().getVariant()).toBe('filled');
    });
  });

  describe('getSize', () => {
    it('returns small size', () => {
      render(<Chip label="Small chip" size="small" />);

      expect(ChipHarness.first().getSize()).toBe('small');
    });

    it('returns medium size by default', () => {
      render(<Chip label="Basic chip" />);

      expect(ChipHarness.first().getSize()).toBe('medium');
    });
  });

  describe('getColor', () => {
    it('returns primary color', () => {
      render(<Chip label="Primary chip" color="primary" />);

      expect(ChipHarness.first().getColor()).toBe('primary');
    });

    it('returns secondary color', () => {
      render(<Chip label="Secondary chip" color="secondary" />);

      expect(ChipHarness.first().getColor()).toBe('secondary');
    });

    it('returns default color by default', () => {
      render(<Chip label="Basic chip" />);

      expect(ChipHarness.first().getColor()).toBe('default');
    });
  });

  describe('hasAvatar', () => {
    it('returns true when avatar is present', () => {
      render(<Chip avatar={<Avatar>M</Avatar>} label="Avatar chip" />);

      expect(ChipHarness.first().hasAvatar()).toBe(true);
    });

    it('returns false when no avatar is present', () => {
      render(<Chip label="Basic chip" />);

      expect(ChipHarness.first().hasAvatar()).toBe(false);
    });
  });

  describe('hasIcon', () => {
    it('returns true when icon is present', () => {
      render(<Chip icon={<FaceIcon />} label="Icon chip" />);

      expect(ChipHarness.first().hasIcon()).toBe(true);
    });

    it('returns false when no icon is present', () => {
      render(<Chip label="Basic chip" />);

      expect(ChipHarness.first().hasIcon()).toBe(false);
    });
  });

  describe('click', () => {
    it('triggers onClick when chip is clicked', async () => {
      const handleClick = vi.fn();
      render(<Chip label="Clickable chip" onClick={handleClick} />);
      const chip = ChipHarness.first();

      await chip.click();

      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe('clickDelete', () => {
    it('triggers onDelete when delete icon is clicked', async () => {
      const handleDelete = vi.fn();
      render(<Chip label="Deletable chip" onDelete={handleDelete} />);
      const chip = ChipHarness.first();

      await chip.clickDelete();

      expect(handleDelete).toHaveBeenCalled();
    });

    it('throws error when no delete icon exists', async () => {
      render(<Chip label="Basic chip" />);
      const chip = ChipHarness.first();

      await expect(chip.clickDelete()).rejects.toThrow('No delete icon found in Chip');
    });
  });

  describe('static getByText', () => {
    it('finds chip by exact label text', () => {
      render(<Chip label="Find this chip" />);

      expect(() => ChipHarness.getByText('Find this chip')).not.toThrow();
    });

    it('finds chip by regex pattern', () => {
      render(<Chip label="Find this chip" />);

      expect(() => ChipHarness.getByText(/Find.*chip/)).not.toThrow();
    });

    it('throws error when text is not found', () => {
      render(<Chip label="Different text" />);

      expect(() => ChipHarness.getByText('Find this chip')).toThrow();
    });
  });
});