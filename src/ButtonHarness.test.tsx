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

  describe('getVariant', () => {
    it('returns text by default', () => {
      render(<Button>Hello</Button>);

      expect(ButtonHarness.first().getVariant()).toBe('text');
    });

    it('returns outlined', () => {
      render(<Button variant="outlined">Hello</Button>);

      expect(ButtonHarness.first().getVariant()).toBe('outlined');
    });

    it('returns contained', () => {
      render(<Button variant="contained">Hello</Button>);

      expect(ButtonHarness.first().getVariant()).toBe('contained');
    });
  });

  describe('getColor', () => {
    it('returns primary by default', () => {
      render(<Button>Hello</Button>);

      expect(ButtonHarness.first().getColor()).toBe('primary');
    });

    it('returns inherit', () => {
      render(<Button color="inherit">Hello</Button>);

      expect(ButtonHarness.first().getColor()).toBe('inherit');
    });

    it('returns secondary for a text button', () => {
      render(<Button color="secondary">Hello</Button>);

      expect(ButtonHarness.first().getColor()).toBe('secondary');
    });

    it('returns error for an outlined button', () => {
      render(<Button variant="outlined" color="error">Hello</Button>);

      expect(ButtonHarness.first().getColor()).toBe('error');
    });

    it('returns success for a contained button', () => {
      render(<Button variant="contained" color="success">Hello</Button>);

      expect(ButtonHarness.first().getColor()).toBe('success');
    });

    it('returns warning and info', () => {
      render(
        <div>
          <Button color="warning">Warn</Button>
          <Button color="info">Info</Button>
        </div>
      );

      expect(ButtonHarness.getByText('Warn').getColor()).toBe('warning');
      expect(ButtonHarness.getByText('Info').getColor()).toBe('info');
    });
  });

  describe('getSize', () => {
    it('returns the explicit size', () => {
      render(
        <div>
          <Button size="small">Small</Button>
          <Button size="large">Large</Button>
        </div>
      );

      expect(ButtonHarness.getByText('Small').getSize()).toBe('small');
      expect(ButtonHarness.getByText('Large').getSize()).toBe('large');
    });

    it('defaults to medium', () => {
      render(<Button>Default</Button>);

      expect(ButtonHarness.first().getSize()).toBe('medium');
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

  it('keeps the subclass type in static finders', () => {
    class SubmitButtonHarness extends ButtonHarness {}

    render(<Button>Submit</Button>);

    const button: SubmitButtonHarness = SubmitButtonHarness.getByText('Submit');

    expect(button).toBeInstanceOf(SubmitButtonHarness);
    expect(button.getText()).toBe('Submit');
  });
});
