import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from '../types';
import { USER_INFO } from '../constants';
import { skillsData } from '../data/skillsData';
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

  // 3D interaction values
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
        Your goal is to answer questions about Vaibhav based on the information provided below. 
        Be concise and professional. If a question is outside the scope of this information, politely state that you can only provide details based on his portfolio.
        You can also guide users to different sections of the website if their query implies it (e.g., "Tell me about his projects" -> "You can find more details in the Projects section.").

        Information about Vaibhav Bhagat:
        Name: ${USER_INFO.name}
        Role: ${USER_INFO.role}
        Aspirations: ${USER_INFO.aspirations}
        Bio: ${USER_INFO.bio}

        Skills:
        ${skillsData.map(skill => `- ${skill.name} (${skill.category})`).join('\n')}

        Projects:
        ${projectsData.map(project => `- ${project.title}: ${project.description.substring(0,100)}... (Tech: ${project.stack.join(', ')})`).join('\n')}

        Certifications:
        ${certificationsData.map(cert => `- ${cert.name} from ${cert.issuer} (${cert.date})`).join('\n')}
      `;

      chatSessionRef.current = ai.chats.create({
        model: 'gemini-2.5-flash-preview-04-17',
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
      {/* Enhanced 3D Floating Action Button */}
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
        aria-label="Toggle AI Chatbot"
      >
        {/* Holographic glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-purple via-accent-teal to-accent-purple blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 scale-150"></div>
        
        {/* Floating particles around button - hidden on mobile for performance */}
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

        {/* Main button with 3D effect */}
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
          
          {/* Inner glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-purple/50 to-accent-teal/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </motion.div>

        {/* Notification badge */}
        {!isOpen && messages.length > 1 && (
          <motion.div
            className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-white"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            !
          </motion.div>
        )}
      </motion.button>

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
            {/* Holographic background glow - reduced on mobile */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 sm:from-accent-purple/20 via-accent-teal/10 sm:via-accent-teal/20 to-accent-purple/10 sm:to-accent-purple/20 blur-2xl rounded-none sm:rounded-2xl opacity-60"></div>
            
            {/* Glass morphism container */}
            <div className="relative bg-background-light/90 sm:bg-background-light/80 backdrop-blur-xl shadow-2xl rounded-none sm:rounded-2xl border-0 sm:border sm:border-white/20 flex flex-col h-full sm:h-auto sm:max-h-[calc(100vh-6rem)] overflow-hidden">
              {/* Animated border - hidden on mobile for performance */}
              <div className="absolute inset-0 rounded-none sm:rounded-2xl bg-gradient-to-r from-accent-purple via-accent-teal to-accent-purple opacity-10 sm:opacity-20 animate-pulse hidden sm:block"></div>
              
              {/* Header with 3D effect */}
              <motion.div 
                className="relative flex items-center justify-between p-4 sm:p-4 border-b border-white/10 bg-gradient-to-r from-card-dark/50 to-card-dark/30 backdrop-blur-sm"
                style={{ translateZ: 10 }}
              >
                <div className="flex items-center space-x-3">
                  {/* AI Avatar */}
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

              {/* Messages Area with enhanced styling */}
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
              
              {/* Enhanced Input Area */}
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
                      className="w-full bg-background-light/50 border border-white/20 text-text-primary rounded-xl p-3 text-sm focus:ring-2 focus:ring-accent-teal focus:border-transparent transition-all duration-300 disabled:opacity-50 backdrop-blur-sm placeholder-text-secondary/60"
                      disabled={isLoading || (!apiKey && !chatSessionRef.current)}
                      aria-label="Chat input"
                    />
                    {/* Input glow effect - reduced on mobile */}
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