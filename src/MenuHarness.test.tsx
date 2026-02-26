import { render } from '@testing-library/react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { MenuHarness } from './MenuHarness';

describe('MenuHarness', () => {
  function renderMenu() {
    return render(
      <Menu open anchorEl={null}>
        <MenuItem>Cut</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Paste</MenuItem>
      </Menu>
    );
  }

  describe('getItems', () => {
    it('returns all menu items', () => {
      renderMenu();

      expect(MenuHarness.first().getItems()).toHaveLength(3);
    });
  });

  describe('getItemTexts', () => {
    it('returns all item texts', () => {
      renderMenu();

      expect(MenuHarness.first().getItemTexts()).toEqual(['Cut', 'Copy', 'Paste']);
    });
  });

  describe('getItem', () => {
    it('returns item at given index', () => {
      renderMenu();

      expect(MenuHarness.first().getItem(1).getText()).toBe('Copy');
    });

    it('throws for invalid index', () => {
      renderMenu();

      expect(() => MenuHarness.first().getItem(10)).toThrow('MenuItem at index 10 not found');
    });
  });
});
