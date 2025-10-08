import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl; // <-- Change this to your backend API
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  //  Call API for login
  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}auth/login`, { email, password })
      .pipe(
        tap(response => {
          if (response && response.token) {
            this.setToken(response.token);
          }
        })
      );
  }

  //  Call API for register
  register(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}auth/register`, { email, password })
      .pipe(
        tap(response => {
          if (response && response.token) {
            this.setToken(response.token);
          }
        })
      );
  }

  // Save token in localStorage
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Get token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Remove token (logout)
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
