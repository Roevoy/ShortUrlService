import { __decorate } from "tslib";
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShortUrlService } from '../../services/short-url.service';
import { CommonModule } from '@angular/common';
let ShortUrlInfoComponent = class ShortUrlInfoComponent {
    route = inject(ActivatedRoute);
    shortUrlService = inject(ShortUrlService);
    url = null;
    error = '';
    constructor() { }
    ngOnInit() {
        const code = this.route.snapshot.paramMap.get('code');
        this.shortUrlService.getByCode(code).subscribe({
            next: u => this.url = u,
            error: (error) => this.error = error.message
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
