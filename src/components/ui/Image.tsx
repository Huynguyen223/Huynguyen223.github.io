import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fill?: boolean;
}

export function Image({ fill, className = '', alt, ...props }: ImageProps) {
  // Mocking Next.js Image behavior for Vite environment
  const fillStyles = fill ? 'absolute inset-0 w-full h-full object-cover' : '';
  return (
    <img 
      className={`${fillStyles} ${className}`} 
      loading="lazy" 
      decoding="async" 
      alt={alt || ''}
      {...props} 
    />
  );
}
