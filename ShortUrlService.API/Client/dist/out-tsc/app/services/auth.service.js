import { __decorate } from "tslib";
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../enviroment';
let AuthService = class AuthService {
    tokenKey = 'token';
    http = inject(HttpClient);
    router = inject(Router);
    isLoggedInSubject = new BehaviorSubject(false);
    isLoggedIn$ = this.isLoggedInSubject.asObservable();
    loginErrorDescription = '';
    constructor() { }
    getToken() {
        return localStorage.getItem(this.tokenKey);
    }
    getUserRoles() {
        const token = this.getToken();
        if (!token)
            return [];
        const payload = JSON.parse(atob(token.split('.')[1]));
        const roleKey = Object.keys(payload).find(key => key.includes("identity/claims/role"));
        const roleValue = roleKey ? payload[roleKey] : null;
        return Array.isArray(roleValue) ? roleValue : roleValue ? [roleValue] : [];
    }
    hasRole(requiredRole) {
        return this.getUserRoles().some(role => role.trim() === requiredRole);
    }
    login(email, password) {
        const url = new URL('auth/login', environment.backendUrl).toString();
        const body = { email, password };
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.loginErrorDescription = '';
        this.http.post(url, body, { headers }).subscribe({
            next: (response) => {
                localStorage.setItem(this.tokenKey, response.token);
                this.isLoggedInSubject.next(true);
            },
            error: (error) => { this.loginErrorDescription = error.message ? error.message : "Login error"; }
        });
    }
    logout() {
        this.isLoggedInSubject.next(false);
        localStorage.clear();
        this.router.navigate(['']);
    }
};
AuthService = __decorate([
    Injectable({ providedIn: 'root' })
], AuthService);
export { AuthService };
