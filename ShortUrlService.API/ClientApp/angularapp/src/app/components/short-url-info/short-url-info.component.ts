import { Component, OnInit } from '@angular/core';
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
  url: ShortUrl | null = null;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private shortUrlService: ShortUrlService
  ) { }

  ngOnInit() {
    const code = this.route.snapshot.paramMap.get('code')!;
    console.log(code);
    this.shortUrlService.getByCode(code).subscribe({
      next: u => this.url = u,
      error: () => this.error = 'Failed to download detailes.'
    });
  }

  goBack() {
    window.history.back();
  }
}
