import { render } from '@testing-library/react';

import TextField from '@mui/material/TextField';
import { TextFieldHarness } from './TextFieldHarness';

describe('TextFieldHarness', () => {
  it('gets value from text field with placeholder', async () => {
    render(<TextField value="Hello" placeholder="Login" />);

    const textField = TextFieldHarness.first();

    expect(textField.getValue()).toBe('Hello');
    expect(textField.getType()).toBe('text');
    expect(textField.getPlaceholder()).toBe('Login');
  });

  it('gets value from password field', async () => {
    render(<TextField value="Hello" type="password" />);

    const textField = TextFieldHarness.first();

    expect(textField.getValue()).toBe('Hello');
    expect(textField.getType()).toBe('password');
  });

  it('gets default value', async () => {
    render(<TextField defaultValue="Hello" />);

    const textField = TextFieldHarness.first();

    expect(textField.getValue()).toBe('Hello');
  });

  it('updates value', async () => {
    render(<TextField defaultValue="Hello" />);

    const textField = TextFieldHarness.first();
    await textField.clear();
    await textField.type('New value');

    expect(textField.getValue()).toBe('New value');
  });

  describe('getByName', () => {
    it('finds element by text', async () => {
      render(<TextField name="email" />);

      expect(() => TextFieldHarness.getByName('email')).not.toThrow();
    });

    it('finds element by pattern', async () => {
      render(<TextField name="email" />);

      expect(() => TextFieldHarness.getByName(/MA/i)).not.toThrow();
    });

    it('throws error if there not element', async () => {
      render(<TextField name="email" />);

      expect(() => TextFieldHarness.getByName('Wrong text')).toThrow();
    });
  });
});
