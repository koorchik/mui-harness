import { render } from '@testing-library/react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { ListSubheaderHarness } from './ListSubheaderHarness.js';

function renderList() {
  return render(
    <List>
      <ListSubheader>People</ListSubheader>
      <ListItem>
        <ListItemText primary="Alice" />
      </ListItem>
      <ListSubheader disableSticky>Teams</ListSubheader>
      <ListItem>
        <ListItemText primary="Platform" />
      </ListItem>
    </List>
  );
}

describe('ListSubheaderHarness', () => {
  describe('getByText', () => {
    it('finds a subheader by its text', () => {
      renderList();

      expect(ListSubheaderHarness.getByText('Teams').getText()).toBe('Teams');
      expect(ListSubheaderHarness.getByText(/peo/i).getText()).toBe('People');
    });
  });

  describe('getText', () => {
    it('returns the subheader text', () => {
      renderList();

      expect(ListSubheaderHarness.first().getText()).toBe('People');
      expect(ListSubheaderHarness.all()).toHaveLength(2);
    });
  });

  describe('isSticky', () => {
    it('is sticky by default', () => {
      renderList();

      expect(ListSubheaderHarness.getByText('People').isSticky()).toBe(true);
    });

    it('is not sticky with disableSticky', () => {
      renderList();

      expect(ListSubheaderHarness.getByText('Teams').isSticky()).toBe(false);
    });
  });
});
