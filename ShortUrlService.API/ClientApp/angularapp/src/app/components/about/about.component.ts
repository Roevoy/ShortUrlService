import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  aboutText = '';
  isAdmin = false;

  constructor(private http: HttpClient, private auth: AuthService) { }

  ngOnInit(): void {
    this.loadText();
    this.isAdmin = this.auth.hasRole('Admin'); 
  }

  loadText(): void {
    this.http.get('/api/about', { responseType: 'text' }).subscribe(text => {
      this.aboutText = text;
    });
  }

  save(): void {
    this.http.post('/api/about', '"'+this.aboutText+'"', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    }).subscribe(() => alert('Saved!'));
  }
}
