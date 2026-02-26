import { DomHarness } from 'dom-harness';

type RadioOption = { label: string; value: string; disabled: boolean };

export class RadioGroupHarness extends DomHarness {
  static selector = '[role="radiogroup"]';

  getSelectedValue(): string | null {
    const checked = this.root.querySelector('input[type="radio"]:checked') as HTMLInputElement | null;
    return checked?.value ?? null;
  }

  getOptions(): RadioOption[] {
    const labels = this.root.querySelectorAll('.MuiFormControlLabel-root');
    return Array.from(labels).map(label => {
      const input = label.querySelector('input[type="radio"]') as HTMLInputElement;
      const labelText = label.querySelector('.MuiFormControlLabel-label');
      return {
        label: labelText?.textContent || '',
        value: input?.value || '',
        disabled: input?.disabled ?? false,
      };
    });
  }

  async select(value: string) {
    const input = this.root.querySelector(`input[type="radio"][value="${value}"]`);
    if (!input) throw new Error(`Radio option with value "${value}" not found`);
    await this.user.click(input);
  }
}
