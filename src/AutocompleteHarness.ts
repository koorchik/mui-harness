import { TextFieldHarness } from './TextFieldHarness.js';

/** Harness for MUI `<Autocomplete>`. Extends `TextFieldHarness` and queries by `MuiAutocomplete-inputRoot` class. */
export class AutocompleteHarness extends TextFieldHarness {
  static selector = '.MuiAutocomplete-inputRoot';
}