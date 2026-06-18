export type SubscriptionTier = "free" | "premium";
export type SubscriptionStatus = "active" | "canceled" | "past_due" | "trialing";
export type Proficiency = "beginner" | "intermediate" | "expert";

export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  github_id: string | null;
  github_username: string | null;
  subscription_tier: SubscriptionTier;
  subscription_status: SubscriptionStatus | null;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  website: string;
  avatar_url: string;
  linkedin_url: string;
  twitter_url: string;
  github_url: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  portfolio_id: string;
  title: string;
  description: string;
  tech_stack: string[];
  github_url: string;
  live_url: string;
  screenshot_url: string;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: string;
  portfolio_id: string;
  company: string;
  role: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  description: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  portfolio_id: string;
  name: string;
  proficiency: Proficiency;
  category: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Portfolio {
  id: string;
  user_id: string;
  slug: string;
  custom_domain: string | null;
  template: string;
  is_published: boolean;
  published_url: string | null;
  deployed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  experiences: Experience[];
  skills: Skill[];
  portfolio: Portfolio;
}

export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  pushed_at: string;
}

export interface Analytics {
  id: string;
  portfolio_id: string;
  visitor_id: string;
  page_path: string;
  referrer: string | null;
  country: string | null;
  created_at: string;
}

export interface AnalyticsSummary {
  total_views: number;
  unique_visitors: number;
  top_referrers: { referrer: string; count: number }[];
  top_countries: { country: string; count: number }[];
  views_by_day: { date: string; views: number }[];
}
