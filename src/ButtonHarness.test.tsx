import { render } from '@testing-library/react';
import { vi } from 'vitest';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Checkbox from '@mui/material/Checkbox';
import { ButtonHarness } from './ButtonHarness.js';

describe('ButtonHarness', () => {
  describe('selector', () => {
    it('matches only <Button>, not other ButtonBase components', () => {
      render(
        <div>
          <Button>Real button</Button>
          <IconButton aria-label="icon">x</IconButton>
          <Tabs value={0}>
            <Tab label="Tab one" />
          </Tabs>
          <Checkbox />
        </div>
      );

      const buttons = ButtonHarness.all();
      expect(buttons).toHaveLength(1);
      expect(buttons[0].getText()).toBe('Real button');
    });
  });

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