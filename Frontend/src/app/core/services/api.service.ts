import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Article } from '../models/article.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.apiBase;

  constructor(private http: HttpClient) {}

  getArticles(limit = 10, offset = 0): Observable<Article[]> {
    let params = new HttpParams().set('limit', String(limit)).set('offset', String(offset));
    return this.http.get<Article[]>(`${this.base}/articles`, { params });
  }

  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.base}/articles/${id}`);
  }

  getStatistics(): Observable<any> {
    return this.http.get<any>(`${this.base}/visualizations/statistics`);
  }
}
