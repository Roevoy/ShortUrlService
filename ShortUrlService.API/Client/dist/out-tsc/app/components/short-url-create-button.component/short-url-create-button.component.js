import { __decorate } from "tslib";
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ShortUrlService } from '../../services/short-url.service';
import { CommonModule } from '@angular/common';
let ShortUrlCreateComponent = class ShortUrlCreateComponent {
    createdNewShortUrl = new EventEmitter();
    shortUrlService = inject(ShortUrlService);
    authService = inject(AuthService);
    constructor() { }
    onCreateClick(event) {
        event.preventDefault();
        const originalUrl = prompt('Enter original URL');
        if (originalUrl) {
            this.shortUrlService.createShortUrl(originalUrl).subscribe({
                next: (newUrl) => this.createdNewShortUrl.emit(newUrl),
                error: (error) => alert(error.message)
            });
        }
        else
            alert("URL cannot be empty");
    }
};
__decorate([
    Output()
], ShortUrlCreateComponent.prototype, "createdNewShortUrl", void 0);
ShortUrlCreateComponent = __decorate([
    Component({
        selector: 'app-short-url-create-button',
        templateUrl: './short-url-create-button.component.html',
        styleUrl: './short-url-create-button.component.css',
        standalone: true,
        imports: [CommonModule]
    })
], ShortUrlCreateComponent);
export { ShortUrlCreateComponent };
