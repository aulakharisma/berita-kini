import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Ads {
  imageUrl: string;
}

@Component({
  selector: 'app-ads-banner',
  imports: [CommonModule],
  templateUrl: './ads-banner.component.html',
  styleUrl: './ads-banner.component.scss'
})
export class AdsBannerComponent {
  currentIndex = 0;

  slides: Ads[] = [
    {
      imageUrl: '/img/ads-banner/ads.png'
    },
    {
      imageUrl: 'img/ads-banner/ads2.jpg'
    },
    {
      imageUrl: 'img/ads-banner/ads3.jpg'
    }
  ];

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

}
