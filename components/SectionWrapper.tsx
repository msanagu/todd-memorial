import React from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, className = "" }) => {
  return (
    <div 
      className={`relative z-10 p-6 md:p-8 ${className}`}
    >
      {children}
    </div>
  );
};