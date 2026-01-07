export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Appointment {
  id: string;
  date: string;
  time: string;
  doctor: string;
  status: 'confirmed' | 'pending';
}

export interface BlogPostData {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  category: string;
}

export enum ViewState {
  HOME = 'HOME',
  BOOKING = 'BOOKING',
  LIVE_SESSION = 'LIVE_SESSION',
  LEADS = 'LEADS',
  BLOG_POST = 'BLOG_POST'
}