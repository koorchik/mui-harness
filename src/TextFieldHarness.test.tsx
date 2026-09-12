import { render } from '@testing-library/react';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { TextFieldHarness } from './TextFieldHarness.js';

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

  describe('getByLabel', () => {
    it('finds element by label text', () => {
      render(
        <div>
          <TextField label="Email" name="email" />
          <TextField label="Password" name="password" />
        </div>
      );

      expect(TextFieldHarness.getByLabel('Password').getName()).toBe('password');
    });

    it('finds element by pattern', () => {
      render(<TextField label="Email address" name="email" />);

      expect(TextFieldHarness.getByLabel(/address/).getName()).toBe('email');
    });

    it('finds a required field by its label without the asterisk', () => {
      render(<TextField label="Email" name="email" required />);

      expect(TextFieldHarness.getByLabel('Email').getName()).toBe('email');
    });

    it('throws error if there is no such label', () => {
      render(<TextField label="Email" />);

      expect(() => TextFieldHarness.getByLabel('Wrong label')).toThrow();
    });
  });

  describe('getLabel', () => {
    it('returns label text', () => {
      render(<TextField label="Email" />);

      expect(TextFieldHarness.first().getLabel()).toBe('Email');
    });

    it('returns label text without the required asterisk', () => {
      render(<TextField label="Email" required />);

      expect(TextFieldHarness.first().getLabel()).toBe('Email');
    });

    it('returns empty string when there is no label', () => {
      render(<TextField />);

      expect(TextFieldHarness.first().getLabel()).toBe('');
    });
  });

  describe('getHelperText', () => {
    it('returns helper text', () => {
      render(<TextField helperText="We never share it" />);

      expect(TextFieldHarness.first().getHelperText()).toBe('We never share it');
    });

    it('returns null when there is no helper text', () => {
      render(<TextField />);

      expect(TextFieldHarness.first().getHelperText()).toBeNull();
    });
  });

  describe('hasError', () => {
    it('returns true for a field with error', () => {
      render(<TextField error />);

      expect(TextFieldHarness.first().hasError()).toBe(true);
    });

    it('returns true for a field with error helper text', () => {
      render(<TextField error helperText="Required" />);

      const textField = TextFieldHarness.first();

      expect(textField.hasError()).toBe(true);
      expect(textField.getHelperText()).toBe('Required');
    });

    it('returns false for a field without error', () => {
      render(<TextField helperText="Hint" />);

      expect(TextFieldHarness.first().hasError()).toBe(false);
    });
  });

  describe('isDisabled', () => {
    it('returns true for disabled field', () => {
      render(<TextField disabled />);

      expect(TextFieldHarness.first().isDisabled()).toBe(true);
    });

    it('returns false for enabled field', () => {
      render(<TextField />);

      expect(TextFieldHarness.first().isDisabled()).toBe(false);
    });
  });

  describe('isRequired', () => {
    it('returns true for required field', () => {
      render(<TextField required />);

      expect(TextFieldHarness.first().isRequired()).toBe(true);
    });

    it('returns true when only the label renders a required asterisk', () => {
      render(
        <FormControl>
          <InputLabel required>Name</InputLabel>
          <OutlinedInput label="Name" />
        </FormControl>
      );

      expect(TextFieldHarness.first().isRequired()).toBe(true);
    });

    it('returns false for optional field', () => {
      render(<TextField />);

      expect(TextFieldHarness.first().isRequired()).toBe(false);
    });
  });

  describe('isMultiline', () => {
    it('returns true for multiline field', () => {
      render(<TextField multiline defaultValue="Line" />);

      const textField = TextFieldHarness.first();

      expect(textField.isMultiline()).toBe(true);
      expect(textField.getValue()).toBe('Line');
    });

    it('returns false for single-line field', () => {
      render(<TextField />);

      expect(TextFieldHarness.first().isMultiline()).toBe(false);
    });
  });

  describe('adornments', () => {
    it('returns start and end adornment text', () => {
      render(
        <TextField
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
              endAdornment: <InputAdornment position="end">kg</InputAdornment>,
            },
          }}
        />
      );

      const textField = TextFieldHarness.first();

      expect(textField.getStartAdornmentText()).toBe('$');
      expect(textField.getEndAdornmentText()).toBe('kg');
    });

    it('returns null when there are no adornments', () => {
      render(<TextField />);

      const textField = TextFieldHarness.first();

      expect(textField.getStartAdornmentText()).toBeNull();
      expect(textField.getEndAdornmentText()).toBeNull();
    });
  });
});
