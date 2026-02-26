import { render } from '@testing-library/react';
import { vi } from 'vitest';

import Button from '@mui/material/Button';
import { ButtonHarness } from './ButtonHarness.js';

describe('ButtonHarness', () => {
  describe('click', () => {
    it('simulates click', async () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Hello</Button>);
      const button = ButtonHarness.first();

      await button.click();

      expect(button.getText()).toEqual('Hello');
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe('getText', () => {
    it('gets text', async () => {
      render(<Button>Hello</Button>);

      expect(ButtonHarness.first().getText()).toEqual('Hello');
    });
  });

  describe('isDisabled', () => {
    it('returns true for disabled button', async () => {
      render(<Button disabled={true}>Hello</Button>);

      expect(ButtonHarness.first().isDisabled()).toBe(true);
    });

    it('returns false for not disabled button', async () => {
      render(<Button disabled={false}>Hello</Button>);

      expect(ButtonHarness.first().isDisabled()).toBe(false);
    });
  });

  describe('static getByText', () => {
    it('finds element by text', async () => {
      render(<Button>Hello</Button>);

      expect(() => ButtonHarness.getByText('Hello')).not.toThrow();
    });

    it('finds element by pattern', async () => {
      render(<Button>Hello</Button>);

      expect(() => ButtonHarness.getByText(/ello/)).not.toThrow();
    });

    it('throws error if there not element', async () => {
      render(<Button>Hello</Button>);

      expect(() => ButtonHarness.getByText('Wrong text')).toThrow();
    });
  });
});