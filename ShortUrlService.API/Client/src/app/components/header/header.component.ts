import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; 
import { CommonModule } from '@angular/common'; 
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [CommonModule],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private subscriptions: Subscription[] = [];
  private router = inject(Router);
  authService = inject(AuthService); 
  isLoggedIn = false;

  constructor() { 
    this.subscriptions.push(
    this.authService.isLoggedIn$.subscribe(
    (isLoggedIn) => this.isLoggedIn = isLoggedIn)); }

  getCurrentRoute(): string {
    return this.router.url; 
  }

  goToLogin(): void {
    this.router.navigate(['']); 
  }

  goToAbout(): void {
    this.router.navigate(['/about']);
  }

   goToRazorAbout(): void {
    window.location.href = 'http://localhost:5114/about?token='+this.authService.getToken();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
