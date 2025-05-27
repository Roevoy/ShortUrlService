import { Routes } from '@angular/router';
import { ShortUrlListComponent } from './components/short-url-list.component/short-url-list.component';
import { LoginComponent } from './components/login.component/login.component';
import { ShortUrlInfoComponent } from './components/short-url-info/short-url-info.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes =
[
    { path: '', component: LoginComponent },
    { path: 'details/:code', component: ShortUrlInfoComponent },
    { path: 'table', component: ShortUrlListComponent },
    { path: 'about', component: AboutComponent }
];
