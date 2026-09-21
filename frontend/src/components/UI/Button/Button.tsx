import React from 'react';
import styles from './Button.modules.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const stylesMap = styles as Record<string, string>;

  return (
    <button className={`${stylesMap.button || ''} ${stylesMap[variant] || ''} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
};