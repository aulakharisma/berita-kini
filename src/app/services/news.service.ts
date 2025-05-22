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

  // fungsi untuk buat slug dari title
  private slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');
  }
  
  // method baru untuk ambil semua category + slug
  getAllCategorySlugPairs(): Observable<{ category: string; slug: string }[]> {
    // buat array observable untuk tiap kategori
    const requests = this.cnnCategories.map(category =>
      this.http.get<any>(`${this.apiUrl}cnn/${category}/`).pipe(
        map(res => {
          // dari API dapatkan posts, lalu buat slug dari title tiap post
          return res.data.posts.map((post: any) => ({
            category,
            slug: this.slugify(post.title),
          }));
        })
      )
    );

    // gabungkan semua array hasil map per kategori jadi satu array
    return new Observable(observer => {
      // gabungkan semua request, flatten hasilnya
      Promise.all(requests.map(req => req.toPromise()))
        .then(results => {
          const combined = results.flat();
          observer.next(combined);
          observer.complete();
        })
        .catch(err => observer.error(err));
    });
  }




}
