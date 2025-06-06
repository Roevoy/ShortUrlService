import { __decorate } from "tslib";
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
let HeaderComponent = class HeaderComponent {
    subscriptions = [];
    router = inject(Router);
    authService = inject(AuthService);
    isLoggedIn = false;
    constructor() {
        this.subscriptions.push(this.authService.isLoggedIn$.subscribe((isLoggedIn) => this.isLoggedIn = isLoggedIn));
    }
    getCurrentRoute() {
        return this.router.url;
    }
    goToLogin() {
        this.router.navigate(['']);
    }
    goToSpaAbout() {
        this.router.navigate(['/about']);
    }
    goToRazorAbout() {
        const url = `http://localhost:5114/about?token=${this.authService.getToken()}`;
        window.location.href = url;
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
};
HeaderComponent = __decorate([
    Component({
        selector: 'app-header',
        standalone: true,
        templateUrl: './header.component.html',
        imports: [CommonModule],
        styleUrls: ['./header.component.css']
    })
], HeaderComponent);
export { HeaderComponent };
