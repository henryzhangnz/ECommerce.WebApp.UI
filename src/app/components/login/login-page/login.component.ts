import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../../interfaces/auth/user';
import { UserDto } from '../../../interfaces/auth/user-dto';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  isInputValid(controlName: string): boolean {
    return (
      (this.loginForm.get(controlName)?.invalid &&
        this.loginForm.get(controlName)?.touched) ??
      false
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    const loginRequestDto = this.loginForm.value;
    this.authService.login(loginRequestDto);
    this.router.navigate(['/']);
  }
}
