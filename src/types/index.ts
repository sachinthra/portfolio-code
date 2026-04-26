export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string[];
  tech?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  blogSlug?: string;
  image?: string;
}

export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillGroup {
  category: string;
  skills: Skill[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
  grade: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface Achievement {
  title: string;
  description: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  updatedDate?: string;
  heroImage?: string;
  tags: string[];
  content: string;
}
