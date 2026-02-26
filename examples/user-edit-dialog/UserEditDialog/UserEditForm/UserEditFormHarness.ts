import { DomHarness } from 'dom-harness';
import { TextFieldHarness, SelectHarness, RadioGroupHarness, SwitchHarness } from 'mui-harness';

export class UserEditFormHarness extends DomHarness {
  static testid = 'UserEditForm';

  get nameField(): TextFieldHarness {
    return TextFieldHarness.getByName('name', this.root);
  }

  get emailField(): TextFieldHarness {
    return TextFieldHarness.getByName('email', this.root);
  }

  get roleSelect(): SelectHarness {
    return SelectHarness.getByName('role', this.root);
  }

  get notifications(): RadioGroupHarness {
    return RadioGroupHarness.first(this.root);
  }

  get activeSwitch(): SwitchHarness {
    return SwitchHarness.first(this.root);
  }
}
