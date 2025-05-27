import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
let ShortUrlInfoComponent = class ShortUrlInfoComponent {
    route;
    shortUrlService;
    url = null;
    error = '';
    constructor(route, shortUrlService) {
        this.route = route;
        this.shortUrlService = shortUrlService;
    }
    ngOnInit() {
        const code = this.route.snapshot.paramMap.get('code');
        console.log(code);
        this.shortUrlService.getByCode(code).subscribe({
            next: u => this.url = u,
            error: () => this.error = 'Failed to download detailes.'
        });
    }
    goBack() {
        window.history.back();
    }
};
ShortUrlInfoComponent = __decorate([
    Component({
        selector: 'app-short-url-info',
        standalone: true,
        imports: [CommonModule],
        templateUrl: './short-url-info.component.html',
        styleUrl: './short-url-info.component.css'
    })
], ShortUrlInfoComponent);
export { ShortUrlInfoComponent };
