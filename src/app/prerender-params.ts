// export async function getPrerenderParams() {
//   // URL API yang mengembalikan data berita
//   const apiUrl = 'https://api-berita-indonesia.vercel.app/cnn/terbaru/';

//   // Fetch data pakai fetch bawaan Node
//   const response = await fetch(apiUrl);
//   const data = await response.json();

//   // Asumsi data.data.posts ada array berita dengan slug dan category
//   // Mapping data ke format yang dibutuhkan prerender params
//   const params = data.data.posts.map((post: any) => ({
//     category: post.category || 'terbaru', // pastikan ada category
//     slug: post.slug, // sesuaikan dengan field slug di API-mu
//   }));

//   return params;
// }


// // Untuk daftar kategori: /:category
// export async function getPrerenderCategories() {
//   const apiUrl = 'https://api-berita-indonesia.vercel.app/cnn';
//   const response = await fetch(apiUrl);
//   const data = await response.json();

//   return data.data.channels.map((channel: any) => ({
//     category: channel.id, // atau `channel.slug` jika ada
//   }));
// }



// src/utils/prerender.ts

export async function getPrerenderParams() {
  const responses = await Promise.all([
    fetch('https://api-berita-indonesia.vercel.app/cnn'),
    fetch('https://api-berita-indonesia.vercel.app/cnn/terbaru'),
  ]);

  const [categoryRes, beritaRes] = await Promise.all(responses.map(res => res.json()));

  const categoryRoutes = categoryRes.data.channels.map((channel: any) => ({
    category: channel.id,
  }));

  const beritaRoutes = beritaRes.data.posts.map((post: any) => ({
    category: post.category || 'terbaru',
    slug: post.slug,
  }));

  return [...categoryRoutes, ...beritaRoutes];
}
