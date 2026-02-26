import { render } from '@testing-library/react';
import { vi } from 'vitest';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ListItemHarness } from './ListItemHarness';

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
