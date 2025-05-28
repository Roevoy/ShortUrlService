import { Component, EventEmitter, Output, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ShortUrlService } from '../../services/short-url.service'
import { ShortUrlLight } from '../../models/short-url-light';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-short-url-create-button',
  templateUrl: './short-url-create-button.component.html',
  styleUrl: './short-url-create-button.component.css',
  standalone: true,
  imports: [CommonModule]
})

export class ShortUrlCreateComponent {

  @Output() createdNewShortUrl = new EventEmitter<ShortUrlLight>();

  private shortUrlService: ShortUrlService = inject(ShortUrlService);
  authService: AuthService = inject(AuthService);

  constructor() { }

  onCreateClick(event: Event) {
    event.preventDefault();

    const originalUrl = prompt('Enter original URL');
    if (originalUrl) {
      this.shortUrlService.createShortUrl(originalUrl).subscribe({
        next: (newUrl) => this.createdNewShortUrl.emit(newUrl),
        error: (error) => alert(error.message)})
    }
    else alert("URL cannot be empty")
  }
}
