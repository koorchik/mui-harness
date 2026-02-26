import { render } from '@testing-library/react';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { AutocompleteHarness } from './AutocompleteHarness.js';

describe('AutocompleteHarness', () => {
  it('gets value from text field with placeholder', async () => {
    render(
      <Autocomplete
        size="small"
        freeSolo
        options={[]}
        onInputChange={(event, newInputValue) => {
          // console.log("123", newInputValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    );

    const autocomplete = AutocompleteHarness.first();
    await autocomplete.type('Hello');

    expect(autocomplete.getValue()).toBe('Hello');
  });
});