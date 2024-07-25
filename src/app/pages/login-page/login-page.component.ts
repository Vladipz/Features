import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { LoginFormData } from '../../data/interfaces/login-form.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  authService = inject(AuthService);
  router = inject(Router);

  isPasswordVisible = signal<boolean>(false);

  form: FormGroup = new FormGroup<LoginFormData>({
    username: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe(() => {
        this.router.navigate(['']);
      });
    }
  }
}
