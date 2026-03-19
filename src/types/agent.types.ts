export interface Agency {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  phone: string;
  email: string;
  website?: string;
  address: string;
  city: string;
  verified: boolean;
  agentCount: number;
  totalListings: number;
  established: number;
  rating: number;
  reviewCount: number;
}

export interface Agent {
  id: string;
  name: string;
  slug: string;
  photo: string;
  coverPhoto?: string;
  phone: string;
  email: string;
  whatsapp?: string;
  agency: Agency;
  rating: number;
  reviewCount: number;
  totalListings: number;
  activeListings: number;
  soldListings: number;
  rentedListings: number;
  responseTime: string;
  languages: string[];
  specializations: string[];
  areas: string[];
  about: string;
  verified: boolean;
  featured: boolean;
  yearsExperience: number;
  nationality: string;
  license?: string;
  joinedAt: string;
  socialLinks?: { linkedin?: string; instagram?: string; twitter?: string; facebook?: string };
  awards?: AgentAward[];
}

export interface AgentAward {
  id: string;
  title: string;
  year: number;
  issuer: string;
}

export interface AgentReview {
  id: string;
  agentId: string;
  reviewerName: string;
  reviewerPhoto?: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  propertyType?: string;
}