import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShortUrlLight } from '../models/short-url-light';
import { ShortUrl } from '../models/short-url';

@Injectable({ providedIn: 'root' })
export class ShortUrlService {
  private baseUrl = '/api/shorturl';
  constructor(private http: HttpClient) { }

  getAll(): Observable<ShortUrlLight[]>
  {
    return this.http.get<ShortUrlLight[]>('http://localhost:5114/api/shorturls/light');
  }
  createShortUrl(originalUrl: string) {
    return this.http.post<ShortUrlLight>(
      'http://localhost:5114/api/shorturls',
      originalUrl,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
  }
  getByCode(code: string): Observable<ShortUrl> {
    return this.http.get<ShortUrl>(
      'http://localhost:5114/api/shorturls/details/'+code,
      {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        })
      }
    );
  }
  deleteShortUrl(id: string): Observable<void> {
    const url = `http://localhost:5114/api/shorturls/${id}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete<void>(url, { headers });
  }
}
