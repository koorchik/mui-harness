import { render } from '@testing-library/react';
import { vi } from 'vitest';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import { MenuItemHarness } from './MenuItemHarness.js';

describe('MenuItemHarness', () => {
  describe('getText', () => {
    it('returns menu item text', () => {
      render(<MenuItem>Profile</MenuItem>);

      expect(MenuItemHarness.first().getText()).toBe('Profile');
    });
  });

  describe('isDisabled', () => {
    it('returns true for disabled menu item', () => {
      render(<MenuItem disabled>Disabled Item</MenuItem>);

      expect(MenuItemHarness.first().isDisabled()).toBe(true);
    });

    it('returns false for enabled menu item', () => {
      render(<MenuItem>Enabled Item</MenuItem>);

      expect(MenuItemHarness.first().isDisabled()).toBe(false);
    });
  });

  describe('isSelected', () => {
    it('returns true for selected menu item', () => {
      render(<MenuItem selected>Selected Item</MenuItem>);

      expect(MenuItemHarness.first().isSelected()).toBe(true);
    });

    it('returns false for unselected menu item', () => {
      render(<MenuItem>Unselected Item</MenuItem>);

      expect(MenuItemHarness.first().isSelected()).toBe(false);
    });
  });

  describe('getRole', () => {
    it('returns menuitem role by default', () => {
      render(<MenuItem>Menu Item</MenuItem>);

      expect(MenuItemHarness.first().getRole()).toBe('menuitem');
    });

    it('returns custom role when specified', () => {
      render(<MenuItem role="option">Option Item</MenuItem>);

      expect(MenuItemHarness.first().getRole()).toBe('option');
    });
  });

  describe('getValue', () => {
    it('returns data-value attribute', () => {
      render(<MenuItem data-value="profile">Profile</MenuItem>);

      expect(MenuItemHarness.first().getValue()).toBe('profile');
    });

    it('returns null when no value is set', () => {
      render(<MenuItem>Profile</MenuItem>);

      expect(MenuItemHarness.first().getValue()).toBeNull();
    });
  });

  describe('hasIcon', () => {
    it('returns true when icon is present', () => {
      render(
        <MenuItem>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </MenuItem>
      );

      expect(MenuItemHarness.first().hasIcon()).toBe(true);
    });

    it('returns false when no icon is present', () => {
      render(<MenuItem>Simple Item</MenuItem>);

      expect(MenuItemHarness.first().hasIcon()).toBe(false);
    });
  });

  describe('hasText', () => {
    it('returns true when ListItemText is present', () => {
      render(
        <MenuItem>
          <ListItemText primary="Primary Text" />
        </MenuItem>
      );

      expect(MenuItemHarness.first().hasText()).toBe(true);
    });

    it('returns false when no ListItemText is present', () => {
      render(<MenuItem>Simple Text</MenuItem>);

      expect(MenuItemHarness.first().hasText()).toBe(false);
    });
  });

  describe('getPrimaryText', () => {
    it('returns primary text when ListItemText is used', () => {
      render(
        <MenuItem>
          <ListItemText primary="Primary Text" secondary="Secondary Text" />
        </MenuItem>
      );

      expect(MenuItemHarness.first().getPrimaryText()).toBe('Primary Text');
    });

    it('returns full text when no ListItemText is used', () => {
      render(<MenuItem>Simple Text</MenuItem>);

      expect(MenuItemHarness.first().getPrimaryText()).toBe('Simple Text');
    });
  });

  describe('getSecondaryText', () => {
    it('returns secondary text when present', () => {
      render(
        <MenuItem>
          <ListItemText primary="Primary" secondary="Secondary Text" />
        </MenuItem>
      );

      expect(MenuItemHarness.first().getSecondaryText()).toBe('Secondary Text');
    });

    it('returns null when no secondary text is present', () => {
      render(
        <MenuItem>
          <ListItemText primary="Primary Only" />
        </MenuItem>
      );

      expect(MenuItemHarness.first().getSecondaryText()).toBeNull();
    });

    it('returns null when no ListItemText is used', () => {
      render(<MenuItem>Simple Text</MenuItem>);

      expect(MenuItemHarness.first().getSecondaryText()).toBeNull();
    });
  });

  describe('hasSecondaryText', () => {
    it('returns true when secondary text is present', () => {
      render(
        <MenuItem>
          <ListItemText primary="Primary" secondary="Secondary" />
        </MenuItem>
      );

      expect(MenuItemHarness.first().hasSecondaryText()).toBe(true);
    });

    it('returns false when no secondary text is present', () => {
      render(
        <MenuItem>
          <ListItemText primary="Primary Only" />
        </MenuItem>
      );

      expect(MenuItemHarness.first().hasSecondaryText()).toBe(false);
    });
  });

  describe('click', () => {
    it('triggers onClick when menu item is clicked', async () => {
      const handleClick = vi.fn();
      render(<MenuItem onClick={handleClick}>Clickable Item</MenuItem>);
      const menuItem = MenuItemHarness.first();

      await menuItem.click();

      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe('isVisible', () => {
    it('returns true for visible menu item', () => {
      render(<MenuItem>Visible Item</MenuItem>);

      expect(MenuItemHarness.first().isVisible()).toBe(true);
    });

    it('returns false for hidden menu item', () => {
      render(<MenuItem style={{ display: 'none' }}>Hidden Item</MenuItem>);

      expect(MenuItemHarness.first().isVisible()).toBe(false);
    });
  });

  describe('static getByText', () => {
    it('finds menu item by exact text', () => {
      render(<MenuItem>Find this item</MenuItem>);

      expect(() => MenuItemHarness.getByText('Find this item')).not.toThrow();
    });

    it('finds menu item by regex pattern', () => {
      render(<MenuItem>Find this item</MenuItem>);

      expect(() => MenuItemHarness.getByText(/Find.*item/)).not.toThrow();
    });

    it('throws error when text is not found', () => {
      render(<MenuItem>Different text</MenuItem>);

      expect(() => MenuItemHarness.getByText('Find this item')).toThrow();
    });
  });
});