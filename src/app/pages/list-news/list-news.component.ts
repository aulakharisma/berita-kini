import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NewsPost } from '../../models/latest-news.model';
import { NewsService } from '../../services/news.service';
import { ListNewsCardComponent } from '../../components/list-news-card/list-news-card.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-news',
  imports: [ CommonModule, ListNewsCardComponent ],
  templateUrl: './list-news.component.html',
  styleUrl: './list-news.component.scss'
})
export class ListNewsComponent implements OnInit {
  category: string = '';
  berita: NewsPost[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const categoryParam = params.get('category');
      if (categoryParam) {
        this.category = categoryParam;
        this.ambilBerita(this.category);
      }
    });
  }

  ambilBerita(category: string): void {
    this.isLoading = true;
    this.errorMessage = null;
    
    this.newsService.getCnnNewsByCategory(category).subscribe({
      next: (data) => {
        this.berita = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Gagal mengambil berita:', err);
        this.errorMessage = 'Gagal mengambil berita. Silakan coba lagi.';
        this.isLoading = false;
      }
    });
  }

}
