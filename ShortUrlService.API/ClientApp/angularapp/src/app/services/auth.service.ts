import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
interface LoginResponse { token: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'token';

  constructor(private http: HttpClient, private router: Router,) { }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['']);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    return true;
  }

  getUserRoles(): string[] {
    const token = this.getToken();
    if (!token) return [];

    const payload = JSON.parse(atob(token.split('.')[1])); 

    const roleKey = Object.keys(payload).find(key => key.includes("identity/claims/role"));
    const roleValue = roleKey ? payload[roleKey] : null;

    return Array.isArray(roleValue) ? roleValue : roleValue ? [roleValue] : [];
  }

  hasRole(requiredRole: string): boolean {
    return this.getUserRoles().some(role => role.trim() === requiredRole);
  }

  login(email: string, password: string): Observable<LoginResponse> {
    const url = 'http://localhost:5114/api/auth/login';
    const body = { email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<LoginResponse>(url, body, { headers })
      .pipe(
        tap(res => {
          this.setToken(res.token);
        })
      );
  }
}
