import { Component } from '@angular/core';
import { NewsHeadlineComponent } from '../../components/news-headline/news-headline.component';
import { PopularNewsComponent } from "../../components/popular-news/popular-news.component";
import { RecomendationNewsComponent } from "../../components/recomendation-news/recomendation-news.component";
import { AdsBannerComponent } from "../../components/ads-banner/ads-banner.component";

@Component({
  selector: 'app-home',
  imports: [NewsHeadlineComponent, PopularNewsComponent, RecomendationNewsComponent, AdsBannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
