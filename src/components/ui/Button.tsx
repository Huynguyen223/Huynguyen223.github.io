import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export function Button({ variant = 'primary', size = 'md', children, className = '', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-semibold tracking-wide transition-all duration-200 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer';

  const sizes: Record<string, string> = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: 'var(--clr-primary)',
      color: '#fff',
      fontFamily: 'var(--font-body)',
    },
    secondary: {
      backgroundColor: 'var(--clr-bg-alt)',
      color: 'var(--clr-text)',
      border: '1px solid var(--clr-border)',
      fontFamily: 'var(--font-body)',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--clr-primary)',
      border: '1.5px solid var(--clr-primary)',
      fontFamily: 'var(--font-body)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--clr-text-muted)',
      fontFamily: 'var(--font-body)',
    },
  };

  return (
    <button
      className={`${base} ${sizes[size]} ${className}`}
      style={variants[variant]}
      {...props}
    >
      {children}
    </button>
  );
}
