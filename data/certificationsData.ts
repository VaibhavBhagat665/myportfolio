
import { Certification } from '../types';
import { UdemyIcon, CourseraIcon } from '../components/ui/Icons'; // Placeholders

export const certificationsData: Certification[] = [
  {
    id: 'ml-a-z-udemy',
    name: 'Machine Learning A-Z™: AI, Python & R + ChatGPT Bonus',
    issuer: 'Udemy',
    date: 'Ongoing', // Or a completion date like '2024-03'
    credentialUrl: '#', // Placeholder link
    icon: UdemyIcon,
  },
  {
    id: 'python-foundations-coursera',
    name: 'Python for Everybody Specialization',
    issuer: 'Coursera (University of Michigan)',
    date: 'Completed - 2023',
    credentialUrl: '#', // Placeholder link
    icon: CourseraIcon,
  },
  {
    id: 'web-dev-bootcamp',
    name: 'The Complete Web Development Bootcamp',
    issuer: 'Udemy',
    date: 'Ongoing',
    credentialUrl: '#', // Placeholder link
    icon: UdemyIcon,
  },
  // Add more certifications as Vaibhav completes them
];
