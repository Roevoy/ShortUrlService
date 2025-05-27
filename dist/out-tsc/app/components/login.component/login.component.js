import { __decorate } from "tslib";
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
let LoginComponent = class LoginComponent {
    subscriptions = [];
    router = inject(Router);
    authService = inject(AuthService);
    email = '';
    password = '';
    constructor() {
        this.subscriptions.push(this.authService.isLoggedIn$.subscribe((isLoggedIn) => { if (isLoggedIn)
            this.router.navigate(['/table']); }));
    }
    onSkipClick() {
        this.router.navigate(['/table']);
    }
    onSubmit(event) {
        event.preventDefault();
        this.authService.login(this.email, this.password);
    }
    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        standalone: true,
        imports: [FormsModule, CommonModule],
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    })
], LoginComponent);
export { LoginComponent };
