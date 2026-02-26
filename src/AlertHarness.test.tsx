import { render } from '@testing-library/react';
import { vi } from 'vitest';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import { AlertHarness } from './AlertHarness';

describe('AlertHarness', () => {
  describe('getText', () => {
    it('returns alert message text', () => {
      render(<Alert>This is an error alert</Alert>);

      expect(AlertHarness.first().getText()).toBe('This is an error alert');
    });

    it('returns text from message element when present', () => {
      render(
        <Alert>
          <AlertTitle>Error</AlertTitle>
          This is an error alert with title
        </Alert>
      );

      const text = AlertHarness.first().getText();
      expect(text).toContain('This is an error alert with title');
    });
  });

  describe('getSeverity', () => {
    it('returns error severity', () => {
      render(<Alert severity="error">Error message</Alert>);

      expect(AlertHarness.first().getSeverity()).toBe('error');
    });

    it('returns warning severity', () => {
      render(<Alert severity="warning">Warning message</Alert>);

      expect(AlertHarness.first().getSeverity()).toBe('warning');
    });

    it('returns success severity', () => {
      render(<Alert severity="success">Success message</Alert>);

      expect(AlertHarness.first().getSeverity()).toBe('success');
    });

    it('returns success severity by default', () => {
      render(<Alert>Default message</Alert>);

      expect(AlertHarness.first().getSeverity()).toBe('success');
    });
  });

  describe('getVariant', () => {
    it('returns filled variant', () => {
      render(<Alert variant="filled">Filled alert</Alert>);

      expect(AlertHarness.first().getVariant()).toBe('filled');
    });

    it('returns outlined variant', () => {
      render(<Alert variant="outlined">Outlined alert</Alert>);

      expect(AlertHarness.first().getVariant()).toBe('outlined');
    });

    it('returns standard variant by default', () => {
      render(<Alert>Standard alert</Alert>);

      expect(AlertHarness.first().getVariant()).toBe('standard');
    });
  });

  describe('hasIcon', () => {
    it('returns true when icon is present by default', () => {
      render(<Alert>Alert with icon</Alert>);

      expect(AlertHarness.first().hasIcon()).toBe(true);
    });

    it('returns false when icon is disabled', () => {
      render(<Alert icon={false}>Alert without icon</Alert>);

      expect(AlertHarness.first().hasIcon()).toBe(false);
    });
  });

  describe('hasCloseButton', () => {
    it('returns true when onClose is provided', () => {
      const handleClose = vi.fn();
      render(<Alert onClose={handleClose}>Closeable alert</Alert>);

      expect(AlertHarness.first().hasCloseButton()).toBe(true);
    });

    it('returns false when onClose is not provided', () => {
      render(<Alert>Non-closeable alert</Alert>);

      expect(AlertHarness.first().hasCloseButton()).toBe(false);
    });
  });

  describe('clickCloseButton', () => {
    it('triggers onClose when close button is clicked', async () => {
      const handleClose = vi.fn();
      render(<Alert onClose={handleClose}>Closeable alert</Alert>);
      const alert = AlertHarness.first();

      await alert.clickCloseButton();

      expect(handleClose).toHaveBeenCalled();
    });

    it('throws error when no close button exists', async () => {
      render(<Alert>Non-closeable alert</Alert>);
      const alert = AlertHarness.first();

      await expect(alert.clickCloseButton()).rejects.toThrow('No close button found in Alert');
    });
  });

  describe('getRole', () => {
    it('returns alert role by default', () => {
      render(<Alert>Default alert</Alert>);

      expect(AlertHarness.first().getRole()).toBe('alert');
    });
  });

  describe('hasAction', () => {
    it('returns true when custom action is provided', () => {
      render(
        <Alert 
          action={
            <Button color="inherit" size="small">
              UNDO
            </Button>
          }
        >
          Alert with action
        </Alert>
      );

      expect(AlertHarness.first().hasAction()).toBe(true);
    });

    it('returns true when onClose is provided', () => {
      const handleClose = vi.fn();
      render(<Alert onClose={handleClose}>Closeable alert</Alert>);

      expect(AlertHarness.first().hasAction()).toBe(true);
    });

    it('returns false when no action is provided', () => {
      render(<Alert>Simple alert</Alert>);

      expect(AlertHarness.first().hasAction()).toBe(false);
    });
  });

  describe('static getByText', () => {
    it('finds alert by exact text', () => {
      render(<Alert>Find this alert</Alert>);

      expect(() => AlertHarness.getByText('Find this alert')).not.toThrow();
    });

    it('finds alert by regex pattern', () => {
      render(<Alert>Find this alert</Alert>);

      expect(() => AlertHarness.getByText(/Find.*alert/)).not.toThrow();
    });

    it('throws error when text is not found', () => {
      render(<Alert>Different text</Alert>);

      expect(() => AlertHarness.getByText('Find this alert')).toThrow();
    });
  });
});