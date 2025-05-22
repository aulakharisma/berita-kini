import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { PageDetailComponent } from './pages/page-detail/page-detail.component';

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
        component: PageDetailComponent, // Komponen detail berita
      },
      // Tambahkan route detail news di sini nanti
    ]
  }
];
