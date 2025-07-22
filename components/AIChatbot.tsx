import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from '../types';
import { USER_INFO } from '../constants';
import { skillsData } from '../data/skillsData';
import { userProfile } from '../data/userProfile';
import { projectsData } from '../data/projectsData';
import { certificationsData } from '../data/certificationsData';
import { ChatBubbleIcon, XIcon, SendIcon } from './ui/Icons';
import Button from './ui/Button';

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const apiKey = process.env.API_KEY;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [10, -10]));
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-10, 10]));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleButtonMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const handleButtonMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  
  const initializeChat = () => {
    if (!apiKey) {
      console.error("API_KEY is not set for the chatbot.");
      setError("Chatbot is currently unavailable (API key missing).");
      setMessages([{
        id: 'error-init',
        text: "I'm currently unable to connect. Please try again later.",
        sender: 'ai',
        timestamp: new Date(),
      }]);
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      
      const context = `
        You are a friendly and helpful AI assistant for Vaibhav Bhagat's personal portfolio website. 
Your goal is to answer questions about Vaibhav naturally and conversationally, as if you know him personally. 
Be concise, professional, and authentic. Avoid phrases like "based on the information provided" or "according to his portfolio" - just speak naturally about him.
You can guide users to different sections of the website when relevant (e.g., "You should check out his Projects section for more details").

export const userProfile = {
  name: "Vaibhav Bhagat",
  age: 20,
  college: "Indian Institute of Information Technology (IIIT) Sonepat",
  branch: "Information Technology",
  year: "1st year (2024-2028)",

  personality: 'Vaibhav is a proactive, ambitious, and impact-driven learner who blends technical depth with strong communication and leadership skills. He thrives in collaborative environments, takes initiative naturally, and prefers building real-world projects that solve problems or inspire curiosity. Known for his clarity of thought, ownership, and efficiency, he consistently seeks to elevate both technical and human aspects of software projects.',

  skills: {
    languages: [
      "Python (for ML, automation, and scripting)",
      "JavaScript (for frontend and interactivity)",
      "C++ (academic and algorithmic problems)",
      "HTML & CSS (UI development)"
    ],
    machineLearning: [
      "Linear & Logistic Regression",
      "Support Vector Machines (SVM)",
      "Classification, Clustering, and Data Preprocessing",
      "Scikit-learn, Pandas, NumPy",
      "Reinforcement Learning (Q-learning basics)",
      "Model tuning, evaluation, and deployment mindset"
    ],
    tools: [
      "Git & GitHub (version control, collaborative dev)",
      "VS Code (daily environment)",
      "Firebase (real-time backend)",
      "Google GenAI (chat and context-aware systems)"
    ],
    webDev: [
      "React with JSX & State Management",
      "Tailwind CSS for efficient styling",
      "DOM manipulation, Forms, Responsive Design",
      "Frontend-backend integration with Firebase"
    ],
    leadershipAndPM: [
      "Project Planning & Timeline Breakdown",
      "Task Delegation using GitHub Projects or Notion",
      "Team Collaboration (Hackathon experience or group projects)",
      "Clear Communication, Daily Progress Syncing",
      "UI/UX decision-making and product flow mapping"
    ],
    softSkills: [
      "Strong verbal and written communication",
      "Team-first mindset, listens and adapts",
      "Problem-solving under pressure",
      "Quick learner with self-accountability",
      "Confidence in articulating technical ideas to non-tech audiences"
    ]
  },

  strengths: [
    "Quick learner who adapts fast to new technologies",
    "Strong problem-solving abilities under pressure",
    "Excellent communication skills, both technical and non-technical",
    "Natural leadership and project management instincts",
    "Builds practical, real-world focused projects",
    "Self-motivated and takes ownership of work"
  ],

  areasForGrowth: [
    "Sometimes spends too much time perfecting small details - he really cares about quality outcomes but is learning to balance perfection with meeting deadlines and iterating on early versions",
    "As a first-year student, he's still focused on developing strong fundamentals through practical projects and is actively seeking professional opportunities",
    "Tends to take on a lot of responsibility in projects because he likes having control over outcomes. He's working on improving collaboration and delegation skills, especially for larger cross-functional projects, using tools like project boards and better team communication"
  ],

  learningJourney: 'Vaibhav started with Python and C++ in school, then got hands-on with ML using scikit-learn. He quickly moved into regression and classification projects, and even explored Q-learning out of curiosity. Realizing the value of end-to-end development, he added React and Firebase to his toolkit. Now he's diving into GenAI and context-aware assistants. He learns fast and applies even faster.',

  projects: [
    {
      id: 'talevo',
      title: 'Talevo - Interactive Storytelling WebApp',
      description: 'Built Talevo, a web platform for reading and exploring interactive, choice-driven stories. Features immersive visuals and replayable story paths. Developed for experimentation in UI/UX design, storytelling logic, and dynamic user interaction.',
      stack: ['HTML', 'CSS', 'JavaScript', 'Firebase','Firestore'],
      imageUrl: 'https://iili.io/3QjTfpf.png',
      githubUrl: 'https://github.com/VaibhavBhagat665/talevo-2',
      demoUrl: 'https://talevo-2.vercel.app',
      year: 2024,
    },
    {
      id: 'mindsetu',
      title: 'Mindsetu - Mental Wellness Platform for Students',
      description: 'Built a full-stack web app for college mental health support during his first hackathon. MindSetu features role-based dashboards for students, teachers, and admins; mood tracking; assignment insights; AI chatbot support; and data privacy.',
      stack: ['React', 'Tailwind CSS', 'TypeScript', 'Express', 'Node.js', 'Firebase'],
      imageUrl: 'https://iili.io/FxsR8f1.png',
      demoUrl: 'https://mindsetu-b0db5.web.app/', 
      year: 2023,
    },
    {
      name: "Tic-Tac-Toe Q-learning Agent",
      description: "Implemented a self-learning Tic-Tac-Toe bot that updates its strategy through trial and error. It helped him understand how RL agents behave and how state-action value pairs evolve.",
      stack: ["Python"]
    },
    {
      name: "Real Estate Price Prediction",
      description: "Designed a regression-based ML model that predicts housing prices based on features like location, area, and condition. This project polished his data cleaning, feature encoding, and model evaluation skills.",
      stack: ["Python", "Scikit-learn"]
    }
  ],

  certifications: [
    {
      id: 'ml-a-z-udemy',
      name: 'Machine Learning A-Z™: AI, Python & R + ChatGPT Bonus',
      issuer: 'Udemy',
      date: 'January 2025',
      credentialUrl: 'https://www.udemy.com/certificate/UC-189be3bb-1e33-4874-8c89-430de5db2350/', 
      logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7zmzguRUdNPxg-5ixP9ICiFXXiKx1gBAIKQ&s',
    },
    {
      id: 'python-data-science',
      name: 'Python for Data Science',
      issuer: 'IBM',
      date: 'July 2023',
      credentialUrl: 'https://www.credly.com/badges/4fdfb73e-7676-40fe-87fa-8fb638b40cbd', 
      logoUrl: 'https://static-00.iconduck.com/assets.00/ibm-icon-2048x2048-p5c23kq4.png',
    },
    {
      id: 'foundational-project-management',
      name: 'Foundations of Project Management',
      issuer: 'Google',
      date: 'June 2025',
      credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/TD8QEM1CH7I6?utm_source%3Dandroid%26utm_medium%3Dcertificate%26utm_content%3Dcert_image%26utm_campaign%3Dsharing_cta%26utm_product%3Dcourse', 
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png',
    },
    {
      id: 'sql-intermediate',
      name: 'SQL Intermediate Certification',
      issuer: 'HackerRank',
      date: 'July 2023',
      credentialUrl: 'https://www.hackerrank.com/certificates/251aca2f6583', 
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png',
    },
    {
      id: 'web-dev-bootcamp',
      name: 'The Complete Web Development Bootcamp',
      issuer: 'Udemy',
      date: 'Ongoing',
      logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7zmzguRUdNPxg-5ixP9ICiFXXiKx1gBAIKQ&s',
    },
  ],

  aspirations: 'Vaibhav is targeting AI/ML research internships or product-based internships that involve real problem-solving, ML/AI pipelines, or GenAI integrations. Long-term, he wants to contribute to building intelligent systems that support human creativity and cognition - especially in learning tools, automation, or storytelling systems. He is also open to SDE intern roles.',

  preferences: {
    tone: "Confident but not arrogant, honest but friendly",
    likesAnswerStyle: "Precise, direct, and insightful with good reasoning",
    favoriteTopics: [
      "GenAI & Prompt Engineering",
      "AI Assistants & NLP",
      "React Apps",
      "ML Model Debugging",
      "Human-AI Collaboration"
    ],
    personalityKeywords: [
      "builder",
      "driven",
      "quick learner",
      "problem solver",
      "team contributor",
      "efficient communicator"
    ]
  },

  extras: {
    hometown: "Delhi, India",
    likes: [
      "Night coding sessions",
      "Listening to lo-fi or indie music while working",
      "Solving algorithmic problems for fun",
      "Lifting dumbbells or stretching to reset brain",
      "Chatting with GenAI assistants to learn prompt structuring"
    ],
    habits: [
      "Reflects on self-growth frequently",
      "Balances technical with creative expression",
      "Tries to document what he builds or learns"
    ],
    values: [
      "Efficiency in design and communication",
      "Helping others debug or unblock",
      "AI should be an assistant, not a replacement"
    ]
  }
};

Important: Do not use markdown symbols like asterisks (**) or backticks () in your responses. 
Write everything as plain text, in a natural and readable way.
Speak about Vaibhav as if you know him personally, not as if you're reading from a document.
        `;

      chatSessionRef.current = ai.chats.create({
        model: 'gemini-pro-vision-lite',
        config: { systemInstruction: context },
      });

      setMessages([
        {
          id: 'initial-greeting',
          text: `Hello! I'm Vaibhav's AI assistant. How can I help you learn more about his work and skills today?`,
          sender: 'ai',
          timestamp: new Date(),
        }
      ]);
      setError(null);
    } catch (e) {
      console.error("Failed to initialize GenAI chat:", e);
      setError("Failed to initialize chatbot.");
       setMessages([{
        id: 'error-init-catch',
        text: "Sorry, I couldn't start up properly. Please try opening me again.",
        sender: 'ai',
        timestamp: new Date(),
      }]);
    }
  };

  useEffect(() => {
    if (isOpen && !chatSessionRef.current && !error) {
      initializeChat();
    }
  }, [isOpen, error]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || !chatSessionRef.current) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      const response: GenerateContentResponse = await chatSessionRef.current.sendMessage({ message: userMessage.text });
      const aiResponseText = response.text;
      
      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (e) {
      console.error('Error sending message to Gemini:', e);
      setError('Sorry, I encountered an error. Please try again.');
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        text: 'I had trouble responding. Could you try asking again?',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            ref={buttonRef}
            onClick={toggleChat}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] group"
            style={{
              perspective: 1000,
              transformStyle: 'preserve-3d',
            }}
            onMouseMove={handleButtonMouseMove}
            onMouseLeave={handleButtonMouseLeave}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            aria-label="Toggle AI Chatbot"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-purple via-accent-teal to-accent-purple blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 scale-150"></div>
            
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-accent-teal rounded-full opacity-40 hidden sm:block"
                style={{
                  left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 40}px`,
                  top: `${50 + Math.sin(i * 60 * Math.PI / 180) * 40}px`,
                }}
                animate={{
                  scale: [0.5, 1.5, 0.5],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

            <motion.div
              className="relative bg-gradient-to-br from-accent-purple to-accent-teal text-white p-3 sm:p-4 rounded-full shadow-2xl border border-accent-purple/30"
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
            >
              <motion.div style={{ translateZ: 20 }}>
                <ChatBubbleIcon className="w-6 h-6 sm:w-8 sm:h-8" />
              </motion.div>
              
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-purple/50 to-accent-teal/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 100, scale: 0.8, rotateX: -15 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="fixed inset-0 sm:inset-auto sm:bottom-20 sm:right-4 sm:top-4 lg:right-6 lg:bottom-24 w-full sm:w-96 lg:w-[28rem] h-full sm:h-auto sm:max-h-[calc(100vh-6rem)] z-[99] group"
            style={{
              perspective: 1000,
              transformStyle: 'preserve-3d',
            }}
            aria-modal="true"
            role="dialog"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 sm:from-accent-purple/20 via-accent-teal/10 sm:via-accent-teal/20 to-accent-purple/10 sm:to-accent-purple/20 blur-2xl rounded-none sm:rounded-2xl opacity-60"></div>
            
            <div className="relative bg-background-light/90 sm:bg-background-light/80 backdrop-blur-xl shadow-2xl rounded-none sm:rounded-2xl border-0 sm:border sm:border-white/20 flex flex-col h-full sm:h-auto sm:max-h-[calc(100vh-6rem)] overflow-hidden">
              <div className="absolute inset-0 rounded-none sm:rounded-2xl bg-gradient-to-r from-accent-purple via-accent-teal to-accent-purple opacity-10 sm:opacity-20 animate-pulse hidden sm:block"></div>
              
              <motion.div 
                className="relative flex items-center justify-between p-4 sm:p-4 border-b border-white/10 bg-gradient-to-r from-card-dark/50 to-card-dark/30 backdrop-blur-sm"
                style={{ translateZ: 10 }}
              >
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-accent-purple to-accent-teal rounded-full flex items-center justify-center border border-white/20"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="w-4 h-4 sm:w-6 sm:h-6 bg-white rounded-full opacity-80"></div>
                  </motion.div>
                  
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-text-primary font-display">AI Assistant</h3>
                    <div className="flex items-center space-x-1">
                      <motion.div
                        className="w-2 h-2 bg-green-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-xs text-green-400">Online</span>
                    </div>
                  </div>
                </div>
                
                <motion.button 
                  onClick={toggleChat} 
                  className="text-text-secondary hover:text-accent-teal p-2 rounded-full hover:bg-white/10 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close chat"
                >
                  <XIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
              </motion.div>

              <div className="flex-grow p-3 sm:p-4 overflow-y-auto space-y-3 sm:space-y-4 bg-gradient-to-b from-transparent to-black/5 min-h-0">
                {messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <motion.div
                      className={`max-w-[85%] sm:max-w-[80%] p-3 sm:p-4 rounded-2xl shadow-lg border ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-br from-accent-teal to-accent-teal/80 text-white border-accent-teal/30 rounded-br-none'
                          : 'bg-gradient-to-br from-card-dark/80 to-card-dark/60 text-text-primary border-white/10 rounded-bl-none backdrop-blur-sm'
                      }`}
                      style={{ 
                        transformStyle: 'preserve-3d',
                        translateZ: msg.sender === 'user' ? 15 : 10 
                      }}
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0px 10px 20px rgba(0,0,0,0.2)"
                      }}
                    >
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                      <p className={`text-xs mt-2 ${
                        msg.sender === 'user' 
                          ? 'text-white/70 text-right' 
                          : 'text-text-secondary/70 text-left'
                      }`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </motion.div>
                  </motion.div>
                ))}
                
                {isLoading && (
                  <motion.div 
                    className="flex justify-start"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="max-w-[75%] p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-card-dark/80 to-card-dark/60 text-text-primary border border-white/10 backdrop-blur-sm">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 bg-accent-teal rounded-full"
                              animate={{ scale: [1, 1.5, 1] }}
                              transition={{
                                duration: 1,
                                delay: i * 0.2,
                                repeat: Infinity,
                              }}
                            />
                          ))}
                        </div>
                        <p className="text-sm italic">AI is thinking...</p>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {error && !isLoading && messages.length > 0 && messages[messages.length-1].id.startsWith('error-') && (
                  <motion.div 
                    className="text-center text-red-400 text-xs py-2 px-4 bg-red-400/10 rounded-lg border border-red-400/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {error}
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              <motion.form
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                className="p-3 sm:p-4 border-t border-white/10 bg-gradient-to-r from-card-dark/30 to-card-dark/50 backdrop-blur-sm"
                style={{ translateZ: 20 }}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex-grow relative">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={!apiKey && !chatSessionRef.current ? "Chatbot unavailable..." : "Ask about Vaibhav..."}
                      className="w-full bg-background-light/50 border border-white/20 text-black rounded-xl p-3 text-sm focus:ring-2 focus:ring-accent-teal focus:border-transparent transition-all duration-300 disabled:opacity-50 backdrop-blur-sm placeholder-text-secondary/60"
                      disabled={isLoading || (!apiKey && !chatSessionRef.current)}
                      aria-label="Chat input"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent-teal/5 sm:from-accent-teal/10 to-accent-purple/5 sm:to-accent-purple/10 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="md" 
                      disabled={isLoading || !inputValue.trim() || (!apiKey && !chatSessionRef.current)}
                      className="!px-3 sm:!px-4 !py-3 bg-gradient-to-r from-accent-teal to-accent-purple border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                      aria-label="Send message"
                    >
                      <motion.div
                        animate={isLoading ? { rotate: 360 } : {}}
                        transition={isLoading ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
                      >
                        <SendIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </div>
              </motion.form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
