import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Section from './ui/Section';
import Button from './ui/Button';
import { SOCIAL_LINKS, USER_INFO } from '../constants';
import { SendIcon } from './ui/Icons'; // Placeholder

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactSection: React.FC<{ id: string }> = ({ id }) => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all fields.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    
    // Create email content
    const subject = encodeURIComponent(`Portfolio Contact Form - Message from ${formData.name}`);
    const body = encodeURIComponent(`
Hello,

You have received a new message through your portfolio contact form:

Full Name: ${formData.name}
Email Address: ${formData.email}

Message:
${formData.message}

---
This message was sent through your portfolio contact form.
    `);
    
    // Open email client with pre-filled content
    const mailtoLink = `mailto:vaibhavbhagat7461@gmail.com?subject=${subject}&body=${body}`;
    window.open(mailtoLink, '_blank');
    
    console.log('Form data submitted:', formData);
    setIsSubmitted(true);
    // Reset form after a delay (optional)
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitted(false);
    }, 5000);
  };
  
  const inputVariants = {
    focus: { 
      borderColor: '#14b8a6', // accent-teal
      boxShadow: '0 0 0 3px rgba(20, 184, 166, 0.15)',
      scale: 1.02,
      transition: { duration: 0.3 }
    },
    blur: {
      borderColor: '#27272a', // border-dark
      boxShadow: 'none',
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  const formCardVariants = {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <Section id={id} title="Get In Touch" className="bg-background-light">
      <div className="max-w-3xl mx-auto">
        <motion.p 
          className="text-center text-text-secondary mb-10"
          initial={{ opacity:0, y:10 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.5, delay:0.2 }}
        >
          Have a project in mind, a question, or just want to connect? Feel free to reach out! I'm always open to discussing new opportunities and collaborations.
        </motion.p>

        {isSubmitted ? (
          <motion.div 
            className="text-center p-8 bg-gradient-to-br from-accent-teal/15 via-accent-teal/10 to-transparent text-accent-teal rounded-2xl border border-accent-teal/20 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-accent-teal/20 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <SendIcon className="w-8 h-8 text-accent-teal" />
            </motion.div>
            <h3 className="text-2xl font-semibold mb-2">Thank you!</h3>
            <p className="text-text-secondary">Your email client should open with the pre-filled message. I'll get back to you soon!</p>
          </motion.div>
        ) : (
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6 bg-gradient-to-br from-card-dark via-card-dark to-card-dark/90 p-8 sm:p-10 rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] border border-border-dark/50 backdrop-blur-sm relative overflow-hidden"
            variants={formCardVariants}
            initial="initial"
            animate="animate"
          >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 via-transparent to-transparent pointer-events-none rounded-2xl" />
            
            <div className="relative z-10">
              {error && (
                <motion.p 
                  className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  {error}
                </motion.p>
              )}
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
                    Full Name
                  </label>
                  <motion.input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-background-light/50 border border-border-dark/50 text-text-primary rounded-xl p-4 focus:ring-2 focus:ring-accent-teal/50 focus:border-accent-teal transition-all duration-300 placeholder-text-secondary/60 backdrop-blur-sm"
                    placeholder="Your Name"
                    whileFocus="focus"
                    variants={inputVariants}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
                    Email Address
                  </label>
                  <motion.input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-background-light/50 border border-border-dark/50 text-text-primary rounded-xl p-4 focus:ring-2 focus:ring-accent-teal/50 focus:border-accent-teal transition-all duration-300 placeholder-text-secondary/60 backdrop-blur-sm"
                    placeholder="you@example.com"
                    whileFocus="focus"
                    variants={inputVariants}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
                    Message
                  </label>
                  <motion.textarea
                    name="message"
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-background-light/50 border border-border-dark/50 text-text-primary rounded-xl p-4 focus:ring-2 focus:ring-accent-teal/50 focus:border-accent-teal transition-all duration-300 placeholder-text-secondary/60 backdrop-blur-sm resize-none"
                    placeholder="Your message..."
                    whileFocus="focus"
                    variants={inputVariants}
                  />
                </div>
              </div>
              
              <div className="text-center pt-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    rightIcon={<SendIcon className="w-5 h-5"/>}
                    className="bg-gradient-to-r from-accent-teal to-accent-teal/90 hover:from-accent-teal/90 hover:to-accent-teal shadow-lg hover:shadow-accent-teal/25"
                  >
                    Send Message
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.form>
        )}

        <div className="mt-12 text-center">
          <p className="text-text-secondary mb-4">Or connect with me on:</p>
          <div className="flex justify-center space-x-6">
            {SOCIAL_LINKS.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5, color: '#14b8a6' }} // accent-teal
                whileTap={{ scale: 0.9 }}
                className="text-text-secondary hover:text-accent-teal transition-colors"
                aria-label={link.name}
                initial={{ opacity:0, y:10 }}
                animate={{ opacity:1, y:0 }}
                transition={{ duration:0.3, delay: 0.6 + index * 0.1 }}
              >
                <link.icon className="w-8 h-8" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ContactSection;
