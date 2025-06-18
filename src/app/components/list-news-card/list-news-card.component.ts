import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsPost } from '../../models/latest-news.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-news-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './list-news-card.component.html',
  styleUrl: './list-news-card.component.scss'
})
export class ListNewsCardComponent {
  @Input() news!: NewsPost;

  toSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/[\s_-]+/g, '-');
  }
}
