import { Component } from '@angular/core';
import { NewsDetailComponent } from "../../components/news-detail/news-detail.component";
import { PopularNewsComponent } from '../../components/popular-news/popular-news.component';
import { RecomendationNewsComponent } from "../../components/recomendation-news/recomendation-news.component";

@Component({
  selector: 'app-page-detail',
  imports: [NewsDetailComponent, PopularNewsComponent, RecomendationNewsComponent],
  templateUrl: './page-detail.component.html',
  styleUrl: './page-detail.component.scss'
})
export class PageDetailComponent {

}
