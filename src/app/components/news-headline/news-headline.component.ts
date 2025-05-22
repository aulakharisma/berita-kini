import { Component, OnInit } from '@angular/core';
import { NewsPost } from '../../models/latest-news.model';
import { NewsService } from '../../services/news.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-news-headline',
  imports: [CommonModule, RouterModule],
  templateUrl: './news-headline.component.html',
  styleUrl: './news-headline.component.scss'
})


export class NewsHeadlineComponent implements OnInit {
  headlines: NewsPost[] = [];
  currentHeadlineIndex = 0;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getLatestCnnNews().subscribe(posts => {
      this.headlines = posts.slice(0, 5);
    });
  }

  get headline(): NewsPost | undefined {
    return this.headlines[this.currentHeadlineIndex];
  }

  get totalPages(): number {
    return this.headlines.length;
  }

  nextHeadline() {
    if (this.currentHeadlineIndex < this.totalPages - 1) {
      this.currentHeadlineIndex++;
    }
  }

  prevHeadline() {
    if (this.currentHeadlineIndex > 0) {
      this.currentHeadlineIndex--;
    }
  }

  toSlug(title: string): string {
      return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')       // Hapus karakter non-alfanumerik (selain spasi dan -)
        .trim()
        .replace(/\s+/g, '-');          // Ganti spasi dengan tanda "-"
    }
}

