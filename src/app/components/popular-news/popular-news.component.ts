import { Component, OnInit, Input } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { NewsPost } from '../../models/latest-news.model';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-popular-news',
  imports: [CommonModule, RouterModule],
  templateUrl: './popular-news.component.html',
  styleUrl: './popular-news.component.scss'
})
export class PopularNewsComponent implements OnInit {
  popularNews: NewsPost[] = [];
  loading = true;
  @Input() isDetailPage = false;  // default false

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.loading = true;

    forkJoin([
      this.newsService.getCnnNewsByCategory('olahraga'),
      this.newsService.getCnnNewsByCategory('nasional'),
      this.newsService.getCnnNewsByCategory('teknologi')
    ]).subscribe({
      next: ([olahragaNews, nasionalNews, teknologiNews]) => {
        // Ambil satu berita dari masing-masing kategori
        this.popularNews = [
          olahragaNews[0],
          nasionalNews[0],
          teknologiNews[0]
        ];
        this.loading = false;
      },
      error: (err) => {
        console.error('Gagal memuat berita:', err);
        this.loading = false;
      }
    });
    }

    toSlug(title: string): string {
      return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')       // Hapus karakter non-alfanumerik (selain spasi dan -)
        .trim()
        .replace(/\s+/g, '-');          // Ganti spasi dengan tanda "-"
    }
}
