import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ShortUrlLight } from '../models/short-url-light';
import { ShortUrl } from '../models/short-url';
import { environment } from '../enviroment';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ShortUrlService {

  private http: HttpClient = inject(HttpClient);
  private authService = inject(AuthService);

  constructor() { }

  getAll(): Observable<ShortUrlLight[]>
  {
    const url = new URL('shorturls/light', environment.backendUrl).toString();
    return this.http.get<ShortUrlLight[]>(url);
  }

  createShortUrl(originalUrl: string) : Observable<ShortUrl> {
    const url = new URL('shorturls', environment.backendUrl).toString();
    return this.http.post<ShortUrl>(url,
      originalUrl,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.authService.getToken()}`
        }
      }
    )
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
