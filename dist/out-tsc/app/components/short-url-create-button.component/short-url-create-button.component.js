import { __decorate } from "tslib";
import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
let ShortUrlCreateComponent = class ShortUrlCreateComponent {
    authService;
    shortUrlService;
    created = new EventEmitter();
    constructor(authService, shortUrlService) {
        this.authService = authService;
        this.shortUrlService = shortUrlService;
    }
    onCreateClick(event) {
        event.preventDefault();
        const originalUrl = prompt('Enter original URL');
        if (!originalUrl)
            return;
        this.shortUrlService.createShortUrl(originalUrl).subscribe({
            next: (newUrl) => this.created.emit(newUrl),
            error: () => alert("Failed to create new short URL")
        });
    }
};
__decorate([
    Output()
], ShortUrlCreateComponent.prototype, "created", void 0);
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
