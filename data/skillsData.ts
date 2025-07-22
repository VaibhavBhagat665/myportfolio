import { Skill, SkillCategory } from '../types';
import { 
    PythonIcon, 
    JavaScriptIcon, 
    HTMLIcon, 
    CSSIcon, 
    GitIcon, 
    FirebaseIcon, 
    ReactIcon, 
    TensorFlowIcon, 
    VSCodeIcon,
    CodeIcon,  
    BrainIcon, 
    WrenchIcon 
} from '../components/ui/Icons';

export const skillsData: Skill[] = [
  // Languages
  { id: 'python', name: 'Python', category: SkillCategory.LANGUAGES, icon: PythonIcon },
  { id: 'javascript', name: 'JavaScript', category: SkillCategory.LANGUAGES, icon: JavaScriptIcon },
  { id: 'html', name: 'HTML5', category: SkillCategory.LANGUAGES, icon: HTMLIcon },
  { id: 'css', name: 'CSS3', category: SkillCategory.LANGUAGES, icon: CSSIcon },

  // Frontend
  { id: 'react', name: 'React.js', category: SkillCategory.FRONTEND, icon: ReactIcon },
  { id: 'tailwind', name: 'Tailwind CSS', category: SkillCategory.FRONTEND, icon: CodeIcon }, 

  // AI/ML
  { id: 'mlbasics', name: 'ML Basics', category: SkillCategory.AIML, icon: BrainIcon }, 
  { id: 'numpy', name: 'NumPy', category: SkillCategory.AIML, icon: PythonIcon }, 
  { id: 'pandas', name: 'Pandas', category: SkillCategory.AIML, icon: PythonIcon }, 
  
  // Tools & Platforms
  { id: 'git', name: 'Git', category: SkillCategory.TOOLS, icon: GitIcon },
  { id: 'firebase', name: 'Firebase', category: SkillCategory.TOOLS, icon: FirebaseIcon },
  { id: 'vscode', name: 'VS Code', category: SkillCategory.TOOLS, icon: VSCodeIcon },
  { id: 'jupyter', name: 'Jupyter Notebooks', category: SkillCategory.TOOLS, icon: PythonIcon },

  // Currently Learning
  { id: 'deeplearning', name: 'Deep Learning', category: SkillCategory.LEARNING, icon: TensorFlowIcon }, 
  { id: 'nextjs', name: 'Next.js', category: SkillCategory.LEARNING, icon: ReactIcon }, 
  { id: 'docker', name: 'Docker', category: SkillCategory.LEARNING, icon: WrenchIcon }, 
];