import React from 'react';

const Card = ({ 
  children, 
  title, 
  subtitle, 
  className = '',
  headerClassName = '',
  bodyClassName = '',
  onClick 
}) => {
  const cardClasses = `bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-200 hover:shadow-md ${onClick ? 'cursor-pointer' : ''} ${className}`;

  return (
    <div className={cardClasses} onClick={onClick}>
      {(title || subtitle) && (
        <div className={`p-6 pb-4 ${headerClassName}`}>
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
          )}
          {subtitle && (
            <p className="text-sm text-gray-600">{subtitle}</p>
          )}
        </div>
      )}
      <div className={`${title || subtitle ? 'px-6 pb-6' : 'p-6'} ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default Card;