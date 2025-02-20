import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginRequestDto } from '../../interfaces/auth/login-request-dto';
import { UserDto } from '../../interfaces/auth/user-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.authServiceBaseUrl;

  private userSubject = new BehaviorSubject<UserDto | null>(null);

  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(loginRequestDto: LoginRequestDto) {
    this.http
      .post<UserDto>(`${this.baseUrl}/api/v1/auth/login`, loginRequestDto, {
        withCredentials: true,
      })
      .subscribe({
        next: () => this.getUser(),
      });
  }

  getUser() {
    this.http
      .get<UserDto>(`${this.baseUrl}/api/v1/auth/me`, {
        withCredentials: true,
      })
      .subscribe({
        next: (user: UserDto) => {
          console.log('User fetched:', user);
          this.userSubject.next(user);
        },
        error: () => {
          this.userSubject.next(null);
        },
      });
  }

  logout() {
    return this.http
      .post(`${this.baseUrl}/api/v1/auth/logout`, {}, { withCredentials: true })
      .subscribe({
        next: () => this.getUser(),
      });
  }
}
