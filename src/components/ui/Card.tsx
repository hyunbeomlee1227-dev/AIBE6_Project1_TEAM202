import React, { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
interface CardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  children: React.ReactNode;
  hoverable?: boolean;
}
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, hoverable = false, className = '', ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={
        hoverable ?
        {
          y: -4,
          scale: 1.01
        } :
        {}
        }
        className={`bg-white rounded-3xl shadow-soft overflow-hidden ${className}`}
        {...props}>
        
        {children}
      </motion.div>);

  }
);
Card.displayName = 'Card';