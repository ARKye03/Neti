import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface AuthResponse {
  token: string;
  username: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = '/api/user';

  currentUser = signal<AuthResponse | null>(this.getStoredUser());

  register(payload: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/register`, payload)
      .pipe(tap((res) => this.setSession(res)));
  }

  login(payload: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/login`, payload)
      .pipe(tap((res) => this.setSession(res)));
  }

  logout() {
    localStorage.removeItem('neti_auth');
    this.currentUser.set(null);
  }

  private setSession(res: AuthResponse) {
    localStorage.setItem('neti_auth', JSON.stringify(res));
    this.currentUser.set(res);
  }

  private getStoredUser(): AuthResponse | null {
    const stored = localStorage.getItem('neti_auth');
    return stored ? JSON.parse(stored) : null;
  }

  getToken(): string | null {
    return this.currentUser()?.token || null;
  }

  isLoggedIn(): boolean {
    return !!this.currentUser();
  }
}
