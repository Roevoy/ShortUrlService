import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private subscriptions : Subscription[] = [];
  private router = inject(Router);
  authService = inject(AuthService); 
  email = '';
  password = '';

  constructor() { 
    this.subscriptions.push(
    this.authService.isLoggedIn$.subscribe(
        (isLoggedIn) => { if (isLoggedIn) this.router.navigate(['/table']); })
    )
  }

  onSkipClick(): void {
    this.router.navigate(['/table']);
  }

  onSubmit(event: Event): void {
    event.preventDefault(); 
    this.authService.login(this.email, this.password);
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
