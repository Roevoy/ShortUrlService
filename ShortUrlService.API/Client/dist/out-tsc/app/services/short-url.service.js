import { __decorate } from "tslib";
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../enviroment';
let ShortUrlService = class ShortUrlService {
    http = inject(HttpClient);
    constructor() { }
    buildUrl(route) {
        return new URL(route, environment.backendApi).toString();
    }
    getAll() {
        const url = this.buildUrl('shorturls/light');
        return this.http.get(url);
    }
    createShortUrl(originalUrl) {
        const url = this.buildUrl('shorturls');
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.http.post(url, originalUrl, { headers });
    }
    getByCode(code) {
        const url = this.buildUrl(`shorturls/details/${code}`);
        return this.http.get(url);
    }
    deleteShortUrl(id) {
        const url = this.buildUrl(`shorturls/${id}`);
        return this.http.delete(url);
    }
};
ShortUrlService = __decorate([
    Injectable({ providedIn: 'root' })
], ShortUrlService);
export { ShortUrlService };
