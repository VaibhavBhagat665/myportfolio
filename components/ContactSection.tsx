
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
    // In a real app, you would send this data to a backend or email service
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
      boxShadow: '0 0 0 2px rgba(20, 184, 166, 0.3)',
      transition: { duration: 0.3 }
    },
    blur: {
      borderColor: '#27272a', // border-dark
      boxShadow: 'none',
      transition: { duration: 0.3 }
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
            className="text-center p-6 bg-accent-teal/10 text-accent-teal rounded-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3 className="text-xl font-semibold">Thank you!</h3>
            <p>Your message has been "sent" (simulated). I'll get back to you soon.</p>
          </motion.div>
        ) : (
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6 bg-card-dark p-6 sm:p-8 rounded-xl shadow-2xl border border-border-dark"
            initial={{ opacity:0, y:20 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.5, delay:0.4 }}
          >
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">Full Name</label>
              <motion.input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-background-light border border-border-dark text-text-primary rounded-md p-3 focus:ring-accent-teal focus:border-accent-teal transition-colors"
                placeholder="Your Name"
                whileFocus="focus"
                variants={inputVariants}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">Email Address</label>
              <motion.input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-background-light border border-border-dark text-text-primary rounded-md p-3 focus:ring-accent-teal focus:border-accent-teal transition-colors"
                placeholder="you@example.com"
                whileFocus="focus"
                variants={inputVariants}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-1">Message</label>
              <motion.textarea
                name="message"
                id="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-background-light border border-border-dark text-text-primary rounded-md p-3 focus:ring-accent-teal focus:border-accent-teal transition-colors"
                placeholder="Your message..."
                whileFocus="focus"
                variants={inputVariants}
              />
            </div>
            <div className="text-center">
              <Button type="submit" variant="primary" size="lg" rightIcon={<SendIcon className="w-5 h-5"/>}>
                Send Message
              </Button>
            </div>
          </motion.form>
        )}

        <div className="mt-12 text-center">
          <p className="text-text-secondary mb-4">Or connect with me on:</p>
          <div className="flex justify-center space-x-6">
            {SOCIAL_LINKS.filter(link => link.name !== 'Email').map((link, index) => ( // Filter out email as it's for mailto
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
