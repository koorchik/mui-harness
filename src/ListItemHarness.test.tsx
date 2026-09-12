import { render } from '@testing-library/react';
import { vi } from 'vitest';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import { ListItemHarness } from './ListItemHarness.js';

describe('ListItemHarness', () => {
  describe('getText', () => {
    it('returns primary text', () => {
      render(
        <List>
          <ListItem>
            <ListItemText primary="Item one" />
          </ListItem>
        </List>
      );

      expect(ListItemHarness.first().getText()).toBe('Item one');
    });

    it('falls back to the full text without ListItemText', () => {
      render(
        <List>
          <ListItem>Plain item</ListItem>
        </List>
      );

      expect(ListItemHarness.first().getText()).toBe('Plain item');
    });
  });

  describe('hasText / getPrimaryText', () => {
    it('reports ListItemText on a ListItem', () => {
      render(
        <List>
          <ListItem>
            <ListItemText primary="Primary" secondary="Secondary" />
          </ListItem>
        </List>
      );

      const item = ListItemHarness.first();
      expect(item.hasText()).toBe(true);
      expect(item.getPrimaryText()).toBe('Primary');
    });

    it('reports ListItemText on a ListItemButton', () => {
      render(
        <List>
          <ListItemButton>
            <ListItemText primary="Clickable" />
          </ListItemButton>
        </List>
      );

      const item = ListItemHarness.first();
      expect(item.hasText()).toBe(true);
      expect(item.getPrimaryText()).toBe('Clickable');
    });

    it('falls back to the full text without ListItemText', () => {
      render(
        <List>
          <ListItemButton>Plain button</ListItemButton>
        </List>
      );

      const item = ListItemHarness.first();
      expect(item.hasText()).toBe(false);
      expect(item.getPrimaryText()).toBe('Plain button');
      expect(item.getText()).toBe('Plain button');
    });
  });

  describe('getSecondaryText', () => {
    it('returns secondary text when present', () => {
      render(
        <List>
          <ListItem>
            <ListItemText primary="Primary" secondary="Secondary" />
          </ListItem>
        </List>
      );

      expect(ListItemHarness.first().getSecondaryText()).toBe('Secondary');
    });

    it('returns null when no secondary text', () => {
      render(
        <List>
          <ListItem>
            <ListItemText primary="Primary" />
          </ListItem>
        </List>
      );

      expect(ListItemHarness.first().getSecondaryText()).toBeNull();
    });
  });

  describe('hasIcon / icon', () => {
    it('exposes the icon of a ListItem', () => {
      render(
        <List>
          <ListItem>
            <ListItemIcon>
              <InboxIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
        </List>
      );

      const item = ListItemHarness.first();
      expect(item.hasIcon()).toBe(true);
      expect(item.icon.getSize()).toBe('small');
    });

    it('exposes the icon of a ListItemButton', () => {
      render(
        <List>
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItemButton>
        </List>
      );

      const item = ListItemHarness.first();
      expect(item.hasIcon()).toBe(true);
      expect(item.icon.getColor()).toBe('primary');
    });

    it('reports no icon and throws on access when absent', () => {
      render(
        <List>
          <ListItemButton>
            <ListItemText primary="No icon" />
          </ListItemButton>
        </List>
      );

      const item = ListItemHarness.first();
      expect(item.hasIcon()).toBe(false);
      expect(() => item.icon).toThrow(/No icon container/);
    });
  });

  describe('isSelected', () => {
    it('returns true for selected item', () => {
      render(
        <List>
          <ListItemButton selected>
            <ListItemText primary="Selected" />
          </ListItemButton>
        </List>
      );

      expect(ListItemHarness.first().isSelected()).toBe(true);
    });

    it('returns false for unselected item', () => {
      render(
        <List>
          <ListItemButton>
            <ListItemText primary="Not selected" />
          </ListItemButton>
        </List>
      );

      expect(ListItemHarness.first().isSelected()).toBe(false);
    });
  });

  describe('isDisabled', () => {
    it('returns true for disabled item', () => {
      render(
        <List>
          <ListItemButton disabled>
            <ListItemText primary="Disabled" />
          </ListItemButton>
        </List>
      );

      expect(ListItemHarness.first().isDisabled()).toBe(true);
    });
  });

  describe('click', () => {
    it('triggers onClick', async () => {
      const handleClick = vi.fn();
      render(
        <List>
          <ListItemButton onClick={handleClick}>
            <ListItemText primary="Clickable" />
          </ListItemButton>
        </List>
      );

      await ListItemHarness.first().click();

      expect(handleClick).toHaveBeenCalled();
    });
  });
});
