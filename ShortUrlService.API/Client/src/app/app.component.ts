import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShortUrlService } from './services/short-url.service';
import { ShortUrlLight } from './models/short-url-light';
import { HeaderComponent } from './components/header/header.component'; 



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private service: ShortUrlService) { }

  title = 'angularapp';
  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (data: ShortUrlLight[]) => {
      },
      error: err => {
      }
    });
  }
}
