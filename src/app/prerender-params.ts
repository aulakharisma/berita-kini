export async function getPrerenderParams() {
  // URL API yang mengembalikan data berita
  const apiUrl = 'https://api-berita-indonesia.vercel.app/cnn/terbaru/';

  // Fetch data pakai fetch bawaan Node
  const response = await fetch(apiUrl);
  const data = await response.json();

  // Asumsi data.data.posts ada array berita dengan slug dan category
  // Mapping data ke format yang dibutuhkan prerender params
  const params = data.data.posts.map((post: any) => ({
    category: post.category || 'terbaru', // pastikan ada category
    slug: post.slug, // sesuaikan dengan field slug di API-mu
  }));

  return params;
}
