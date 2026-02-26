import { render } from '@testing-library/react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { SnackbarHarness } from './SnackbarHarness';

describe('SnackbarHarness', () => {
  describe('alert', () => {
    it('returns alert harness when Alert is present', () => {
      render(
        <Snackbar open>
          <Alert severity="error">Error message</Alert>
        </Snackbar>
      );

      expect(SnackbarHarness.first().alert).toBeDefined();
    });
  });

  describe('getText', () => {
    it('returns text from Alert child', () => {
      render(
        <Snackbar open>
          <Alert severity="success">Operation succeeded</Alert>
        </Snackbar>
      );

      expect(SnackbarHarness.first().getText()).toBe('Operation succeeded');
    });

    it('returns text from plain content when no Alert', () => {
      render(
        <Snackbar open message="Plain message" />
      );

      expect(SnackbarHarness.first().getText()).toBe('Plain message');
    });
  });

  describe('getSeverity', () => {
    it('returns severity from Alert child', () => {
      render(
        <Snackbar open>
          <Alert severity="warning">Warning message</Alert>
        </Snackbar>
      );

      expect(SnackbarHarness.first().getSeverity()).toBe('warning');
    });
  });
});
