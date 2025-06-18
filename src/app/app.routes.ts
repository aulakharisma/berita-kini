import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { PageDetailComponent } from './pages/page-detail/page-detail.component';
import { ListNewsComponent } from './pages/list-news/list-news.component';

export const routes: Routes = [
    {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: ':category/:slug',
        component: PageDetailComponent
      },
      { path: ':category', component: ListNewsComponent },
      { path: '', redirectTo: '/terbaru', pathMatch: 'full' },
      { path: '**', redirectTo: '/terbaru' }
    ]
  }
];
