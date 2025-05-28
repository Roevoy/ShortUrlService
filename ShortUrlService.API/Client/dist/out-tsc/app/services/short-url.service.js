import { __decorate } from "tslib";
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../enviroment';
import { AuthService } from './auth.service';
let ShortUrlService = class ShortUrlService {
    http = inject(HttpClient);
    authService = inject(AuthService);
    constructor() { }
    getAll() {
        const url = new URL('shorturls/light', environment.backendUrl).toString();
        return this.http.get(url);
    }
    createShortUrl(originalUrl) {
        const url = new URL('shorturls', environment.backendUrl).toString();
        return this.http.post(url, originalUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.authService.getToken()}`
            }
        });
    }
    getByCode(code) {
        return this.http.get('http://localhost:5114/api/shorturls/details/' + code, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            })
        });
    }
    deleteShortUrl(id) {
        const url = `http://localhost:5114/api/shorturls/${id}`;
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
        return this.http.delete(url, { headers });
    }
};
ShortUrlService = __decorate([
    Injectable({ providedIn: 'root' })
], ShortUrlService);
export { ShortUrlService };
