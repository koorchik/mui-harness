import { render, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { FormControl, InputLabel, FormHelperText } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { SelectHarness } from './SelectHarness.js';

describe('SelectHarness', () => {
  it('gets current value from select', async () => {
    render(
      <FormControl>
        <InputLabel>Sort order</InputLabel>
        <Select
          inputProps={{ name: 'sortOrder' }}
          label="Sort order"
          value="asc"
          size="small"
        >
          <MenuItem value="asc">ASC</MenuItem>
          <MenuItem value="desc">DESC</MenuItem>
        </Select>
      </FormControl>
    );

    const select = SelectHarness.first();

    expect(select.getValue()).toBe('ASC');
    expect(select.getName()).toBe('sortOrder');
    expect(select.getLabel()).toBe('Sort order');
  });

  it('can check if select is open or closed', async () => {
    render(
      <Select value="test">
        <MenuItem value="test">Test</MenuItem>
      </Select>
    );

    const select = SelectHarness.first();
    
    expect(select.isOpen()).toBe(false);
    
    await select.open();
    await waitFor(() => {
      expect(select.isOpen()).toBe(true);
    });
    
    await select.close();
    await waitFor(() => {
      expect(select.isOpen()).toBe(false);
    });
  });

  it('can select option by text', async () => {
    const handleChange = vi.fn();
    render(
      <Select
        inputProps={{ name: 'sortOrder' }}
        value="asc"
        onChange={handleChange}
      >
        <MenuItem value="asc">Ascending</MenuItem>
        <MenuItem value="desc">Descending</MenuItem>
      </Select>
    );

    const select = SelectHarness.first();
    
    await select.selectByText('Descending');
    
    await waitFor(() => {
      expect(handleChange).toHaveBeenCalled();
    });
  });

  it('can check if select is disabled', () => {
    render(
      <Select value="test" disabled>
        <MenuItem value="test">Test</MenuItem>
      </Select>
    );

    const select = SelectHarness.first();
    expect(select.isDisabled()).toBe(true);
  });

  it('can get helper text', () => {
    render(
      <FormControl error>
        <Select value="">
          <MenuItem value="">None</MenuItem>
        </Select>
        <FormHelperText error>Please select an option</FormHelperText>
      </FormControl>
    );

    const select = SelectHarness.first();
    expect(select.hasError()).toBe(true);
    expect(select.getHelperText()).toBe('Please select an option');
  });

  it('finds select by name', () => {
    render(
      <>
        <Select inputProps={{ name: 'first' }} value="1">
          <MenuItem value="1">One</MenuItem>
        </Select>
        <Select inputProps={{ name: 'second' }} value="2">
          <MenuItem value="2">Two</MenuItem>
        </Select>
      </>
    );

    const secondSelect = SelectHarness.getByName('second');
    expect(secondSelect.getValue()).toBe('Two');
  });

  it('finds select by label', () => {
    render(
      <>
        <FormControl>
          <InputLabel>First Select</InputLabel>
          <Select value="1">
            <MenuItem value="1">One</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Second Select</InputLabel>
          <Select value="2">
            <MenuItem value="2">Two</MenuItem>
          </Select>
        </FormControl>
      </>
    );

    const secondSelect = SelectHarness.getByLabel('Second Select');
    expect(secondSelect.getValue()).toBe('Two');
  });

  it('can get all options', async () => {
    render(
      <Select value="asc">
        <MenuItem value="asc">Ascending</MenuItem>
        <MenuItem value="desc">Descending</MenuItem>
        <MenuItem value="none">None</MenuItem>
      </Select>
    );

    const select = SelectHarness.first();
    const options = await select.getOptions();
    
    expect(options).toEqual(['Ascending', 'Descending', 'None']);
  });
});
