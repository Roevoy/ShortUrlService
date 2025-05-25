import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; 
import { CommonModule } from '@angular/common'; 



@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [CommonModule],
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private router = inject(Router);
  public authService = inject(AuthService); 

  isLoginPage(): boolean {
    return this.router.url === '/'; 
  }

  goToLogin(): void {
    this.router.navigate(['']); 
  }
  goToAbout(): void {
    this.router.navigate(['/about']);
  }
}
