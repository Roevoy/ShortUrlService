import { Component, EventEmitter, Output } from '@angular/core';
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
  @Output() created = new EventEmitter<ShortUrlLight>();

  constructor(
    public authService: AuthService,
    private shortUrlService: ShortUrlService
  ) { }

  onCreateClick(event: Event) {
    event.preventDefault();
    const originalUrl = prompt('Enter original URL');
    if (!originalUrl) return;

    this.shortUrlService.createShortUrl(originalUrl).subscribe({
      next: (newUrl) => this.created.emit(newUrl),
      error: () => alert("Failed to create new short URL")
    });
  }
}
