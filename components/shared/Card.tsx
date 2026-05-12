
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  action?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className = '', title, action }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-shadow hover:shadow-lg ${className}`}>
      {(title || action) && (
        <div className="p-4 sm:p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          {title && <h3 className="text-lg font-semibold text-gray-800 dark:text-white font-serif">{title}</h3>}
          {action}
        </div>
      )}
      <div className="p-4 sm:p-5">
        {children}
      </div>
    </div>
  );
};

export default Card;