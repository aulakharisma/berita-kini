export interface NewsPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail: string;
  category: string;
}

export interface NewsApiResponse {
  success: boolean;
  message: string | null;
  data: {
    posts: NewsPost[];
  };
}
