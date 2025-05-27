import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
let AboutComponent = class AboutComponent {
    http;
    auth;
    aboutText = '';
    isAdmin = false;
    constructor(http, auth) {
        this.http = http;
        this.auth = auth;
    }
    ngOnInit() {
        this.loadText();
        this.isAdmin = this.auth.hasRole('Admin');
    }
    loadText() {
        this.http.get('/api/about', { responseType: 'text' }).subscribe(text => {
            this.aboutText = text;
        });
    }
    save() {
        this.http.post('/api/about', '"' + this.aboutText + '"', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        }).subscribe(() => alert('Saved!'));
    }
};
AboutComponent = __decorate([
    Component({
        standalone: true,
        imports: [CommonModule, FormsModule],
        selector: 'app-about',
        templateUrl: './about.component.html',
        styleUrl: './about.component.css'
    })
], AboutComponent);
export { AboutComponent };
