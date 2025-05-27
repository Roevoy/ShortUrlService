import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
let AppComponent = class AppComponent {
    service;
    constructor(service) {
        this.service = service;
    }
    title = 'angularapp';
    ngOnInit() {
        this.service.getAll().subscribe({
            next: (data) => {
            },
            error: err => {
            }
        });
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        standalone: true,
        imports: [RouterOutlet, HeaderComponent],
        templateUrl: './app.component.html',
        styleUrl: './app.component.css'
    })
], AppComponent);
export { AppComponent };
