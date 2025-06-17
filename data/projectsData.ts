
import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'project-portfolio',
    title: 'Personal Portfolio Website',
    description: 'This very website! A responsive and animated portfolio built with React, TypeScript, and Tailwind CSS to showcase my skills and projects. Features smooth animations with Framer Motion.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    imageUrl: 'https://picsum.photos/seed/portfolio/600/400',
    githubUrl: 'https://github.com/vaibhavbhagat01/portfolio-v1', // Replace with actual link
    demoUrl: '#', // Current site
    year: 2024,
  },
  {
    id: 'project-ml-classifier',
    title: 'Basic Image Classifier',
    description: 'An introductory project exploring machine learning concepts. Built a simple image classifier using Python and a common ML library to categorize images based on pre-trained models.',
    stack: ['Python', 'Scikit-learn', 'NumPy', 'Matplotlib'],
    imageUrl: 'https://picsum.photos/seed/mlclassifier/600/400',
    githubUrl: '#', // Placeholder
    year: 2024,
  },
  {
    id: 'project-web-scraper',
    title: 'Simple Web Scraper',
    description: 'Developed a Python script to extract data from a static website. Focused on learning web scraping fundamentals using libraries like Beautiful Soup and Requests.',
    stack: ['Python', 'Beautiful Soup', 'Requests'],
    imageUrl: 'https://picsum.photos/seed/webscraper/600/400',
    githubUrl: '#', // Placeholder
    year: 2023,
  },
  // Add more projects as Vaibhav completes them
];
