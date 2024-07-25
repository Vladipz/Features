import { FormControl } from '@angular/forms';

export interface LoginFormData {
  username: FormControl<string>;
  password: FormControl<string>;
}
