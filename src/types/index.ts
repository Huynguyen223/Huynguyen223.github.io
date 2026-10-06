export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  altText: string;
}

export interface Product {
  id: string;
  name: string;
  slug?: string;
  fobPrice: string;
  categoryId: string;
  image: string;
  altText: string;
  specifications: string[];
  isFeatured: boolean;
  generalProperties?: Record<string, string>;
  quickDetails?: Record<string, string>;
  description?: string;
  storageInfo?: string;
  packagingInfo?: string;
  deliveryInfo?: string;
  features?: string[];
  relatedProductIds?: string[];
  certificateIds?: string[];
}

export interface HeroData {
  headline: string;
  subheadline: string;
  ctaText: string;
  backgroundImage: string;
}

export interface Certification {
  id: string;
  name: string;
  badge: string;
  logo: string;
  issuer: string;
  certNumber: string;
  validUntil: string;
}

export interface CompanyInfo {
  title: string;
  description: string;
  features: string[];
  image: string;
  altText: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  altText: string;
}
