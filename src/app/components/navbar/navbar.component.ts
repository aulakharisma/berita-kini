import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsCategory } from '../../models/news.model';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  isScrolled = false;
  isMenuOpen = false;
  categories: NewsCategory[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.newsService.getCnnCategories()
      .subscribe(cats => this.categories = cats);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 10;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  formatName(raw: string): string {
    const spaced = raw.replace(/([a-z])([A-Z])/g, '$1 $2');
    return spaced.charAt(0).toUpperCase() + spaced.slice(1);
  }

  getTextColor(): string {
    return this.isScrolled ? 'text-white' : 'text-gray-400';
  }

  getNavLinkClass(isActive: boolean): string {
  if (this.isMenuOpen) {
    // Saat menu mobile terbuka, pakai warna gelap
    return isActive ? 'text-gray-800 font-semibold' : 'text-gray-600 font-light';
  }

  if (this.isScrolled) {
    return isActive ? 'text-white font-semibold' : 'text-white font-light';
  } else {
    return isActive ? 'text-[#0090FF] font-semibold' : 'text-gray-400 font-light';
  }
}

}
