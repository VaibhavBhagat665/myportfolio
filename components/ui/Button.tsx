
import React from 'react';
import { motion, Transition } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string; 
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  leftIcon,
  rightIcon,
  href,
  ...props
}) => {
  const baseStyle = "font-medium rounded-lg focus:outline-none focus:ring-4 transition-all duration-300 ease-in-out inline-flex items-center justify-center";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const variantStyles = {
    primary: "bg-accent-teal hover:bg-accent-teal/90 text-white focus:ring-accent-teal/50",
    secondary: "bg-accent-purple hover:bg-accent-purple/90 text-white focus:ring-accent-purple/50",
    outline: "border-2 border-accent-teal text-accent-teal hover:bg-accent-teal/10 focus:ring-accent-teal/30",
  };

  const combinedClassName = `${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </>
  );

  const motionAnimProps = { 
    whileHover: { scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.2)" },
    whileTap: { scale: 0.95 },
    transition: { type: "spring", stiffness: 300, damping: 15 } as Transition
  };

  const {
    onAnimationStart,
    onAnimationEnd,
    onAnimationIteration,
    onTransitionEnd,
    onDrag,
    onDragEnd,
    onDragEnter,
    onDragExit,
    onDragLeave,
    onDragOver,
    onDragStart,
    onDrop,
    ...restHtmlProps 
  } = props;

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClassName}
        {...motionAnimProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={combinedClassName}
      {...restHtmlProps} 
      {...motionAnimProps} 
    >
      {content}
    </motion.button>
  );
};

export default Button;
