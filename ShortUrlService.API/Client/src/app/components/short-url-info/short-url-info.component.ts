import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShortUrlService } from '../../services/short-url.service';
import { ShortUrl } from '../../models/short-url';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-short-url-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './short-url-info.component.html',
  styleUrl: './short-url-info.component.css'
})

export class ShortUrlInfoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private shortUrlService: ShortUrlService = inject(ShortUrlService);

  url: ShortUrl | null = null;
  error = '';

  constructor( ) { }

  ngOnInit() {
    const code = this.route.snapshot.paramMap.get('code')!;
    this.shortUrlService.getByCode(code).subscribe({
      next: u => this.url = u,
      error: (error) => this.error = error.message
    });
  }

  goBack() {
    window.history.back();
  }
}
