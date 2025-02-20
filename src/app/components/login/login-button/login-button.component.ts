import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { NgIf } from '@angular/common';
import { UserDto } from '../../../interfaces/auth/user-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-button',
  imports: [NgIf],
  templateUrl: './login-button.component.html',
  styleUrl: './login-button.component.scss',
})
export class LoginButtonComponent {
  user?: UserDto | null;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  login() {
    this.router.navigate(['/login']);
  }
}
