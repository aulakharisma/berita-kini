import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsPost } from '../../models/latest-news.model';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-news-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.scss'
})
export class NewsDetailComponent implements OnInit {
  news: NewsPost | null = null;
  loading = true;

  staticContent: string = `Jakarta, CNN Indonesia --Ketua Badan Tim Nasional (BTN) PSSI Sumardji merespons peluang Timnas  Indonesia pindah dari Stadion Utama Gelora Bung Karno (GBK) apabila  lolos ke putaran ketiga Kualifikasi Piala Dunia 2026. Akhir-akhir ini rumput lapangan Stadion GBK yang jadi markas Indonesia  dalam babak kedua Kualifikasi Piala Dunia 2026 kerap bermasalah. Pada pertandingan kandang pertama melawan Vietnam, Maret lalu, rumput  GBK rusak parah. PPKGBK selalu pengelola pun mendapat kritik deras.[br][/br]Acara-acara di luar  sepak bola itu kerap membuat kondisi rumput tidak sehat dan tidak  terlihat bagus saat pertandingan, khususnya laga Timnas Indonesia. Sampai saat melawan Irak, rumput GBK tidak terlihat sempurna meskipun  kondisinya lebih bagus dibanding lawan Vietnam. Opsi pindah kandang pun  muncul.[br][/br]"Nanti kami akan  sampaikan [rencana pindah dari GBK]," ujar Sumardji saat ditanya  kemungkinan menggunakan stadion lain di putaran ketiga kualifikasi. Sumardji tidak membantah kondisi rumput GBK yang masih kurang bagus  dalam duel Indonesia vs Irak. PSSI pun berharap PPKGBK bisa lebih  memperhatikan kondisi rumput untuk pertandingan Skuad Garuda. "Kami sampai saat ini sudah telepon dengan pengelola GBK karena kondisi  rumput kemarin kurang bagus, kami memohon ke pihak GBK supaya  betul-betul disiapkan dan diperhatikan kondisi rumput," tutur Sumardji. "Kalau dilihat-lihat sepertinya kondisi rumput GBK kayaknya stres itu,  sehingga dengan kondisi itu akan memengaruhi, tadi saya telepon supaya  diperhatikan," kata Sumardji menambahkan.`;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    const category = this.route.snapshot.paramMap.get('category')!;
    const slug = this.route.snapshot.paramMap.get('slug')!;

    this.newsService.getCnnNewsByCategory(category).subscribe(posts => {
      this.news = posts.find(post => this.toSlug(post.title) === slug) || null;
      this.loading = false;
    });
  }

  toSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  }

  // Getter untuk render deskripsi dengan <br>
  get descriptionWithBreaks(): string {
    return this.staticContent.replace(/\[br\]\[\/br\]/g, '<br>');
  }

}
