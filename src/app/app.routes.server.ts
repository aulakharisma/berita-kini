import { RenderMode, ServerRoute } from '@angular/ssr';
import { getPrerenderParams } from './prerender-params';
import { NewsService } from './services/news.service';
import { inject } from '@angular/core';

export const serverRoutes: ServerRoute[] = [
  {
    path: ':category/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const newsService = inject(NewsService);
      const pairs = (await newsService.getAllCategorySlugPairs().toPromise()) || [];
      return pairs.map(item => ({ category: item.category, slug: item.slug }));
    }
  },

  // 2. List berita per kategori (tanpa slug)
  {
      path: ':category',
      renderMode: RenderMode.Prerender,
      async getPrerenderParams() {
        const newsService = inject(NewsService);
        const categories = await newsService.getCnnCategoriesRoutes().toPromise();
        return categories.map((cat: any) => ({
          category: cat.name
        }));
      }
  },



  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
