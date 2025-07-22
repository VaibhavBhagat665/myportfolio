
import { NavLink, SocialLink } from './types';
import { GithubIcon, LinkedinIcon, MailIcon, TwitterIcon } from './components/ui/Icons'; 

export const NAV_LINKS: NavLink[] = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/vaibhavbhagat665', icon: GithubIcon }, 
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/vaibhavbhagat5', icon: LinkedinIcon }, 
  { name: 'Email', url: 'mailto:vaibhavbhagat7461@gmail.com', icon: MailIcon }, 
];

export const USER_INFO = {
  name: "Vaibhav Bhagat",
  role: "B.Tech IT Student @ IIIT Sonepat (1st Year)",
  aspirations: "Aspiring AI/ML Engineer & Full-Stack Developer",
  avatar: "https://iili.io/ForJw41.jpg", 
  bio: "I am a passionate and driven first-year B.Tech student in Information Technology at IIIT Sonepat. With a keen interest in Artificial Intelligence, Machine Learning, and Full-Stack Development, I am dedicated to building innovative solutions and continuously expanding my technical horizons. I thrive on challenges and am eager to contribute to the next generation of technology.",
};
