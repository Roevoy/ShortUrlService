import { Component, OnInit } from '@angular/core';
import { ShortUrlLight } from '../../models/short-url-light';
import { ShortUrlService } from '../../services/short-url.service';
import { CommonModule } from '@angular/common';
import { ShortUrlCreateComponent } from '../short-url-create-button.component/short-url-create-button.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-short-url-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ShortUrlCreateComponent],
  templateUrl: './short-url-list.component.html',
  styleUrls: ['./short-url-list.component.css']
})
export class ShortUrlListComponent implements OnInit {
  shortUrls: ShortUrlLight[] = [];
  error = '';

  constructor(private shortUrlService: ShortUrlService, public authService: AuthService) { }

  ngOnInit() {
    this.loadUrls();
  }

  loadUrls() {
    this.shortUrlService.getAll().subscribe({
      next: data => this.shortUrls = data,
      error: () => this.error = 'Downloading page error'
    });
  }

  onShortUrlCreated(newUrl: ShortUrlLight) {    this.shortUrls.unshift(newUrl);
  }

  onDelete(event: Event, code: string): void {
    event.preventDefault();

    this.shortUrlService.getByCode(code).subscribe({
      next: fullUrl => {
        const id = fullUrl.id;
        this.shortUrlService.deleteShortUrl(id).subscribe({
          next: () => {
            this.shortUrls = this.shortUrls.filter(u => u.shortCode !== code);
          },
          error: err => {
            alert("Delete error");
            console.error('Delete error:', err);
          }
        });
      },
      error: err => {
        alert("Get by code error");
        console.error('Get by code error:', err);
      }
    });
  }
}
