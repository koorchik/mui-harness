/**
 * Internal helpers shared by the form-control harnesses (`TextField`, `Select`, `Checkbox`,
 * `Switch`). Not exported from the package barrel — harnesses are the public API.
 */

/**
 * Returns the text of a `FormLabel`-derived label (`InputLabel`) without the asterisk MUI appends
 * for required fields, so label matching works the same whether or not a field is required.
 */
export function getFormLabelText(label: Element | null | undefined): string {
  if (!label) return '';

  const clone = label.cloneNode(true) as Element;
  clone.querySelectorAll('.MuiFormLabel-asterisk').forEach((asterisk) => asterisk.remove());
  return clone.textContent || '';
}

/** Returns `true` if the `FormLabel`-derived label (`InputLabel`) of the `FormControl` enclosing `root` renders a required asterisk. */
export function hasFormLabelAsterisk(root: Element): boolean {
  const formControl = root.closest('.MuiFormControl-root');
  return !!formControl?.querySelector('.MuiFormLabel-asterisk');
}

/** Returns the label text of the `FormControlLabel` wrapping `root`, or `''` if there is none. */
export function getFormControlLabelText(root: Element): string {
  const label = root.closest('.MuiFormControlLabel-root');
  if (!label) return '';

  const labelText = label.querySelector('.MuiFormControlLabel-label');
  return labelText?.textContent || '';
}

/** Returns `true` if the `FormControlLabel` wrapping `root` renders a required asterisk. */
export function hasFormControlLabelAsterisk(root: Element): boolean {
  const label = root.closest('.MuiFormControlLabel-root');
  return !!label?.querySelector('.MuiFormControlLabel-asterisk');
}

/** Returns the `FormHelperText` of the `FormControl` enclosing `root`, or `null` if absent. */
export function getFormControlHelperText(root: Element): string | null {
  const formControl = root.closest('.MuiFormControl-root');
  const helperText = formControl?.querySelector('.MuiFormHelperText-root');
  return helperText?.textContent || null;
}

/** Returns `true` if the `FormHelperText` of the `FormControl` enclosing `root` is in the error state. */
export function hasFormControlHelperError(root: Element): boolean {
  const formControl = root.closest('.MuiFormControl-root');
  return !!formControl?.querySelector('.MuiFormHelperText-root.Mui-error');
}
