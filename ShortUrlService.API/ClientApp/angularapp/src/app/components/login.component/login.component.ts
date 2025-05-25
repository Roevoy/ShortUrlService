import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  skip(): void {
    console.log('Token before skip:', this.authService.getToken());
    this.authService.logout();
    console.log('Token after skip:', this.authService.getToken());
    this.router.navigate(['/table']);
  }

  login(event: Event): void {
    event.preventDefault(); 
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/table']);
      },
      error: () => {
        alert('Incorrect credentials');
      }
    });
  }
}
