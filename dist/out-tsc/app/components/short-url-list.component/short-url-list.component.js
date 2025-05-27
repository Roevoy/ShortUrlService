import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortUrlCreateComponent } from '../short-url-create-button.component/short-url-create-button.component';
import { RouterModule } from '@angular/router';
let ShortUrlListComponent = class ShortUrlListComponent {
    shortUrlService;
    authService;
    shortUrls = [];
    error = '';
    constructor(shortUrlService, authService) {
        this.shortUrlService = shortUrlService;
        this.authService = authService;
    }
    ngOnInit() {
        this.loadUrls();
    }
    loadUrls() {
        this.shortUrlService.getAll().subscribe({
            next: data => this.shortUrls = data,
            error: () => this.error = 'Downloading page error'
        });
    }
    onShortUrlCreated(newUrl) {
        this.shortUrls.unshift(newUrl);
    }
    onDelete(event, code) {
        event.preventDefault();
        this.shortUrlService.getByCode(code).subscribe({
            next: fullUrl => {
                const id = fullUrl.id;
                this.shortUrlService.deleteShortUrl(id).subscribe({
                    next: () => {
                        this.shortUrls = this.shortUrls.filter(u => u.shortCode !== code);
                    },
                    error: err => {
                        alert("Delete error");
                        console.error('Delete error:', err);
                    }
                });
            },
            error: err => {
                alert("Get by code error");
                console.error('Get by code error:', err);
            }
        });
    }
};
ShortUrlListComponent = __decorate([
    Component({
        selector: 'app-short-url-list',
        standalone: true,
        imports: [CommonModule, RouterModule, ShortUrlCreateComponent],
        templateUrl: './short-url-list.component.html',
        styleUrls: ['./short-url-list.component.css']
    })
], ShortUrlListComponent);
export { ShortUrlListComponent };
