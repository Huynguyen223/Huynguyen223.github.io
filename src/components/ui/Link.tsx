import React from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

interface LinkProps extends Omit<RouterLinkProps, 'to'> {
  href: string;
}

export function Link({ href, children, ...props }: LinkProps) {
  return (
    <RouterLink to={href} {...props}>
      {children}
    </RouterLink>
  );
}
