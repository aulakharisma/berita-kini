import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { NewsPost } from '../../models/latest-news.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recomendation-news',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './recomendation-news.component.html',
  styleUrl: './recomendation-news.component.scss',
})
export class RecomendationNewsComponent implements OnInit {
  newsList: NewsPost[] = [];
  displayedNews: NewsPost[] = [];

  loading = true;
  currentPage = 1;
  pageSize = 8;
  totalPages = 1;

  searchTerm = '';

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getRandomNewsFromMultipleCategories(70).subscribe({
      next: (news) => {
        this.newsList = news;
        this.applyFilter();
        this.loading = false;
      },
      error: (err) => {
        console.error('Gagal memuat rekomendasi:', err);
        this.loading = false;
      },
    });
  }

  get filteredNews(): NewsPost[] {
    return this.searchTerm
      ? this.newsList.filter((n) =>
          n.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      : this.newsList;
  }

  applyFilter(): void {
    const filtered = this.filteredNews;
    this.totalPages = Math.ceil(filtered.length / this.pageSize);
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayedNews = filtered.slice(start, end);
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.applyFilter();
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.applyFilter();
  }

  handlePageClick(page: number | string): void {
    if (typeof page === 'number') {
      this.onPageChange(page);
    }
  }

  getMin(a: number, b: number): number {
    return Math.min(a, b);
  }

  toSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')       // Hapus karakter non-alfanumerik (selain spasi dan -)
      .trim()
      .replace(/\s+/g, '-');          // Ganti spasi dengan tanda "-"
  }


  get visiblePages(): (number | string)[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const delta = 2;
    const range: (number | string)[] = [];

    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
        range.push(i);
      } else if (range[range.length - 1] !== '...') {
        range.push('...');
      }
    }

    return range;
  }
}
