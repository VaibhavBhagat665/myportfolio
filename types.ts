
export interface NavLink {
  id: string;
  label: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactNode;
}

export enum SkillCategory {
  FRONTEND = 'Development',
  AIML = 'AI/Machine Learning',
  TOOLS = 'Tools & Platforms',
  LANGUAGES = 'Programming Languages',
  LEARNING = 'Currently Learning'
}

export interface Skill {
  id: string;
  name:string;
  icon?: (props: React.SVGProps<SVGSVGElement>) => React.ReactNode; // Optional: for custom SVG icons
  category: SkillCategory;
  level?: number; // Optional: for proficiency indication 0-100
}

export interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  imageUrl: string;
  githubUrl?: string;
  demoUrl?: string;
  year: number;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string; // Could be 'Ongoing', 'YYYY-MM' or 'YYYY'
  credentialUrl?: string;
  icon?: (props: React.SVGProps<SVGSVGElement>) => React.ReactNode;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}