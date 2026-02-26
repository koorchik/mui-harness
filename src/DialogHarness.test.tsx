import { render } from '@testing-library/react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { DialogHarness } from './DialogHarness.js';

describe('DialogHarness', () => {
  describe('getTitle', () => {
    it('returns dialog title text', () => {
      render(
        <Dialog open>
          <DialogTitle>My Dialog</DialogTitle>
          <DialogContent>Content here</DialogContent>
        </Dialog>
      );

      expect(DialogHarness.first().getTitle()).toBe('My Dialog');
    });
  });

  describe('getContentElement', () => {
    it('returns content element when present', () => {
      render(
        <Dialog open>
          <DialogTitle>Title</DialogTitle>
          <DialogContent>Content here</DialogContent>
        </Dialog>
      );

      expect(DialogHarness.first().getContentElement()).not.toBeNull();
    });

    it('returns null when no content', () => {
      render(
        <Dialog open>
          <DialogTitle>Title</DialogTitle>
        </Dialog>
      );

      expect(DialogHarness.first().getContentElement()).toBeNull();
    });
  });

  describe('getActionsElement', () => {
    it('returns actions element when present', () => {
      render(
        <Dialog open>
          <DialogTitle>Title</DialogTitle>
          <DialogActions>
            <Button>OK</Button>
          </DialogActions>
        </Dialog>
      );

      expect(DialogHarness.first().getActionsElement()).not.toBeNull();
    });

    it('returns null when no actions', () => {
      render(
        <Dialog open>
          <DialogTitle>Title</DialogTitle>
        </Dialog>
      );

      expect(DialogHarness.first().getActionsElement()).toBeNull();
    });
  });
});
