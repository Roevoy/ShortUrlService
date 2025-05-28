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
  
  private buildUrl(route: string): string {
    return new URL(route, environment.backendApi).toString();
  }

  getAll(): Observable<ShortUrlLight[]>
  {
    const url = this.buildUrl('shorturls/light');
    return this.http.get<ShortUrlLight[]>(url);
  }

  createShortUrl(originalUrl: string) : Observable<ShortUrl> {
    const url = this.buildUrl('shorturls')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<ShortUrl>(url, originalUrl, { headers });
  }

  getByCode(code: string): Observable<ShortUrl> {
    const url = this.buildUrl(`shorturls/details/${code}`);
    return this.http.get<ShortUrl>(url);
  }

  deleteShortUrl(id: string): Observable<void> {
    const url = this.buildUrl(`shorturls/${id}`);
    return this.http.delete<void>(url);
  }

}
