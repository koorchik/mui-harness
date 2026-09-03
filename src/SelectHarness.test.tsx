import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
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

  it('isOptionDisabled returns true for a disabled option', async () => {
    render(
      <Select value="asc">
        <MenuItem value="asc">Ascending</MenuItem>
        <MenuItem value="desc" disabled>Descending</MenuItem>
      </Select>
    );

    const select = SelectHarness.first();
    await select.open();
    expect(select.isOptionDisabled('desc')).toBe(true);
    await select.close();
  });

  it('isOptionDisabled returns false for an enabled option', async () => {
    render(
      <Select value="asc">
        <MenuItem value="asc">Ascending</MenuItem>
        <MenuItem value="desc">Descending</MenuItem>
      </Select>
    );

    const select = SelectHarness.first();
    await select.open();
    expect(select.isOptionDisabled('desc')).toBe(false);
    await select.close();
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

  it('reads options from its own popup when several selects are rendered', async () => {
    render(
      <div>
        <Select value="a" inputProps={{ name: 'first' }}>
          <MenuItem value="a">First A</MenuItem>
          <MenuItem value="b">First B</MenuItem>
        </Select>
        <Select value="x" inputProps={{ name: 'second' }}>
          <MenuItem value="x">Second X</MenuItem>
          <MenuItem value="y">Second Y</MenuItem>
        </Select>
      </div>
    );

    const second = SelectHarness.getByName('second');
    expect(await second.getOptions()).toEqual(['Second X', 'Second Y']);

    const first = SelectHarness.getByName('first');
    expect(await first.getOptions()).toEqual(['First A', 'First B']);
  });

  it('throws a clear error when reading options of a closed select', () => {
    render(
      <Select value="a" inputProps={{ name: 'closed' }}>
        <MenuItem value="a">A</MenuItem>
      </Select>
    );

    expect(() => SelectHarness.first().isOptionDisabled('a')).toThrow(/not open/);
  });

  it('selects by value and reflects the new value after re-render', async () => {
    function Controlled() {
      const [value, setValue] = React.useState('asc');
      return (
        <Select value={value} onChange={(e) => setValue(e.target.value as string)}>
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      );
    }
    render(<Controlled />);

    const select = SelectHarness.first();
    await select.selectByValue('desc');

    expect(select.getValue()).toBe('Descending');
    expect(select.isOpen()).toBe(false);
  });

  it('finds its popup when the listbox id is overridden via MenuProps', async () => {
    function Controlled() {
      const [value, setValue] = React.useState('a');
      return (
        <Select
          value={value}
          onChange={(e) => setValue(e.target.value as string)}
          MenuProps={{ slotProps: { list: { id: 'custom-listbox' } } }}
        >
          <MenuItem value="a">A</MenuItem>
          <MenuItem value="b">B</MenuItem>
        </Select>
      );
    }
    render(<Controlled />);

    const select = SelectHarness.first();
    expect(await select.getOptions()).toEqual(['A', 'B']);
    await select.selectByText('B');
    expect(select.getValue()).toBe('B');
  });

  it('exposes option values separately from display text', async () => {
    render(
      <Select value={10} inputProps={{ name: 'rows' }}>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={-1}>All</MenuItem>
      </Select>
    );

    const select = SelectHarness.first();
    expect(select.getValue()).toBe('Ten');
    expect(select.getSelectedValue()).toBe('10');
    expect(await select.getOptionValues()).toEqual(['10', '-1']);
  });

  it('uses the user-event instance assigned to the harness for option clicks', async () => {
    render(
      <Select value="a">
        <MenuItem value="a">A</MenuItem>
        <MenuItem value="b">B</MenuItem>
      </Select>
    );

    const user = userEvent.setup();
    const click = vi.spyOn(user, 'click');
    const select = SelectHarness.first();
    select.user = user;

    await select.selectByText('B');

    // one click to open, one on the option
    expect(click).toHaveBeenCalledTimes(2);
  });
});
