// src/app/services/news.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { NewsCategory } from '../models/news.model';
import { NewsApiResponse, NewsPost } from '../models/latest-news.model';
import { forkJoin } from 'rxjs';


@Injectable({ providedIn: 'root' })

export class NewsService {
  private apiUrl = 'https://api-berita-indonesia.vercel.app/';

  public cnnCategories = [
    'terbaru',
    'nasional',
    'internasional',
    'ekonomi',
    'olahraga',
    'teknologi',
    'hiburan',
    'gayaHidup',
  ];

  constructor(private http: HttpClient) {}

  getCnnCategories(): Observable<NewsCategory[]> {
    return this.http.get<{ endpoints: any[] }>(this.apiUrl).pipe(
      map(res => {
        const cnn = res.endpoints.find(ep => ep.name === 'cnn');
        return cnn?.paths || [];
      })
    );
  }

  getLatestCnnNews(): Observable<NewsPost[]> {
    const category = 'terbaru';
    return this.http.get<NewsApiResponse>(`${this.apiUrl}cnn/${category}/`).pipe(
      map(res => {
        return res.data.posts.map(post => ({
          ...post,
          category // tambahkan kategori agar bisa digunakan di view
        }));
      })

    );
  }

  getRandomCnnNews(): Observable<NewsPost[]> {
    const randomCategory = this.cnnCategories[Math.floor(Math.random() * this.cnnCategories.length)];
    const url = `${this.apiUrl}cnn/${randomCategory}/`;

    return this.http.get<NewsApiResponse>(url).pipe(
      map(res => {
        const posts = res.data.posts.map(post => ({
          ...post,
          category: randomCategory // 👈 Tambahkan kategori
        }));
        return posts.sort(() => 0.5 - Math.random()).slice(0, 5); // 👈 Ambil 5 random
      })
    );
  }

  getCnnNewsByCategory(category: string): Observable<NewsPost[]> {
    const url = `${this.apiUrl}cnn/${category}/`;

    return this.http.get<NewsApiResponse>(url).pipe(
      map(res => {
        return res.data.posts.map(post => ({
          ...post,
          category
        }));
      })
    );
  }

  getRandomNewsFromMultipleCategories(count: number = 10): Observable<NewsPost[]> {
    const requests = this.cnnCategories.map(category =>
      this.getCnnNewsByCategory(category).pipe(
        map(posts => posts.map(post => ({ ...post, category })))
      )
    );

    return forkJoin(requests).pipe(
      map(results => {
        const allPosts = results.flat();
        return allPosts.sort(() => 0.5 - Math.random()).slice(0, count);
      })
    );
  }




}
