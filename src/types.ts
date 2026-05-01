export interface SocialStats {
  views: string;
  likes: string;
  comments: string;
}

export interface VideoContent {
  id: string;
  title: string;
  url: string; // Google Drive or direct link
  stats?: SocialStats;
  badge?: string;
  description?: string;
}

export interface PlaylistItem {
  id: string;
  title: string;
  mediaUrl: string;
}

export interface BrandContent {
  id: string;
  name: string;
  mediaUrl: string;
  mediaUrls?: string[];
  description: string;
  playlist?: PlaylistItem[];
}

export interface SocialPostContent {
  id: string;
  title: string;
  imageUrl: string;
}

export interface ArticleContent {
  id: string;
  title: string;
  publication: string;
  date: string;
  imageUrl: string;
  link: string;
}

export interface PortfolioData {
  name: string;
  intro: string;
  personality: string;
  about: string;
  cvUrl: string;
  contact: {
    email: string;
    phone: string;
    instagram: string;
    linkedin: string;
  };
  socialVideos: VideoContent[];
  brandVideos: BrandContent[];
  brandGridVideos: VideoContent[];
  socialPosts: SocialPostContent[];
  articles: ArticleContent[];
}
