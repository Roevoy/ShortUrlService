import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../enviroment';

interface LoginResponse { token: string; }

@Injectable({ providedIn: 'root' })

export class AuthService {
  private tokenKey = 'token';
  private http = inject(HttpClient);
  private router = inject(Router);
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  loginErrorDescription = '';

  constructor() { }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
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

  login(email: string, password: string): void {
    const url = new URL('auth/login', environment.backendUrl).toString();
    const body = { email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.loginErrorDescription = '';
    this.http.post<LoginResponse>(url, body, { headers }).subscribe(
      {
        next: (response) => 
          { 
            localStorage.setItem(this.tokenKey, response.token);
            this.isLoggedInSubject.next(true);
          },
        error: (error: HttpErrorResponse) => { this.loginErrorDescription = error.statusText ? error.statusText : "Login error"; }
      }
    )
  }
 
  logout(): void {
    this.isLoggedInSubject.next(false);
    localStorage.clear();
    this.router.navigate(['']);
  }
}
