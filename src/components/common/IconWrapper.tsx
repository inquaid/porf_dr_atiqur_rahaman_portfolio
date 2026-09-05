import React from 'react';
import { IconType } from 'react-icons';
import { IconBaseProps } from 'react-icons';

interface IconWrapperProps {
  icon: IconType;
  size?: number;
}

// Cast the icon to ReactElement to avoid TypeScript errors
export const IconWrapper: React.FC<IconWrapperProps> = ({ icon, size = 18 }) => {
  // Cast to any to bypass TypeScript checking
  const IconComponent = icon as React.ComponentType<IconBaseProps>;
  return <IconComponent size={size} />;
};
