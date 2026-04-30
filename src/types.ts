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

export interface BrandContent {
  id: string;
  name: string;
  mediaUrl: string;
  description: string;
}

export interface CopywritingContent {
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
  copywriting: CopywritingContent[];
  articles: ArticleContent[];
}
