import { Component, OnInit } from '@angular/core';
import { NewsCategory } from '../../models/news.model';
import { NewsService } from '../../services/news.service';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { 
  bootstrapYoutube,
  bootstrapInstagram,
  bootstrapFacebook
 } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, NgIcon],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  viewProviders: [provideIcons({ bootstrapYoutube, bootstrapFacebook, bootstrapInstagram })]
})
export class FooterComponent implements OnInit {
  categories: NewsCategory[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getCnnCategories().subscribe(cats => this.categories = cats);
  }

  formatName(raw: string): string {
    return raw.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase());
  }
}
