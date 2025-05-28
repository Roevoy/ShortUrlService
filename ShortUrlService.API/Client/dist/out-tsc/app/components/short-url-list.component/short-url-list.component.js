import { __decorate } from "tslib";
import { Component, inject } from '@angular/core';
import { ShortUrlService } from '../../services/short-url.service';
import { CommonModule } from '@angular/common';
import { ShortUrlCreateComponent } from '../short-url-create-button.component/short-url-create-button.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
let ShortUrlListComponent = class ShortUrlListComponent {
    shortUrlService = inject(ShortUrlService);
    authService = inject(AuthService);
    shortUrls = [];
    error = '';
    constructor() { }
    ngOnInit() {
        this.loadUrls();
    }
    loadUrls() {
        this.shortUrlService.getAll().subscribe({
            next: data => this.shortUrls = data,
            error: (error) => this.error = error.message
        });
    }
    onShortUrlCreated(newUrl) { this.shortUrls.unshift(newUrl); }
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
                        alert(err.message);
                    }
                });
            },
            error: err => {
                alert(err.message);
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
