import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShortUrlLight } from '../models/short-url-light';
import { ShortUrl } from '../models/short-url';
import { environment } from '../enviroment';

@Injectable({ providedIn: 'root' })
export class ShortUrlService {

  private http: HttpClient = inject(HttpClient);

  constructor() { }

  getAll(): Observable<ShortUrlLight[]>
  {
    const url = new URL('shorturls/light', environment.backendApi).toString();
    return this.http.get<ShortUrlLight[]>(url);
  }

  createShortUrl(originalUrl: string) : Observable<ShortUrl> {
    const url = new URL('shorturls', environment.backendApi).toString();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<ShortUrl>(url, originalUrl, { headers });
  }

  getByCode(code: string): Observable<ShortUrl> {
    const url = new URL(`shorturls/details/${code}`, environment.backendApi).toString();
    return this.http.get<ShortUrl>(url);
  }

  deleteShortUrl(id: string): Observable<void> {
    const url = new URL(`shorturls/${id}`, environment.backendApi).toString();
    return this.http.delete<void>(url);
  }
}
