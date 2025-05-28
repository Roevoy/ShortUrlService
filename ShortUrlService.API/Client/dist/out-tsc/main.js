import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { httpInterceptor } from './app/interceptors/http.interceptor';
const appConfig = {
    providers: [
        importProvidersFrom(BrowserModule, BrowserAnimationsModule),
    ]
};
bootstrapApplication(AppComponent, {
    ...appConfig,
    providers: [
        ...(appConfig.providers || []),
        provideHttpClient(withInterceptors([httpInterceptor])),
        provideRouter(routes),
        provideHttpClient()
    ]
})
    .catch((err) => console.error(err));
