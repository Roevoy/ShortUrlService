import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
let ShortUrlService = class ShortUrlService {
    http;
    baseUrl = '/api/shorturl';
    constructor(http) {
        this.http = http;
    }
    getAll() {
        return this.http.get('http://localhost:5114/api/shorturls/light');
    }
    createShortUrl(originalUrl) {
        return this.http.post('http://localhost:5114/api/shorturls', originalUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
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
