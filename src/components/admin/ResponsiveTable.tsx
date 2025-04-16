import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveTableProps {
  children: ReactNode;
  className?: string;
}

const ResponsiveTable: React.FC<ResponsiveTableProps> = ({ children, className }) => {
  return (
    <div className={cn(
      "overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0 pb-4",
      className
    )}>
      {children}
    </div>
  );
};

export default ResponsiveTable;
