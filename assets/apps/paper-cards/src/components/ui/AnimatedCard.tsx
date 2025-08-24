import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

interface AnimatedCardProps extends Omit<HTMLMotionProps<"div">, 'children'> {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'glass';
  hoverScale?: number;
  hoverY?: number;
  staggerDelay?: number;
}

const cardVariants = {
  default: "glass-effect card-shadow rounded-xl",
  elevated: "bg-white card-shadow-hover rounded-xl border border-gray-100",
  glass: "glass-effect rounded-xl border border-white/30"
};

const AnimatedCard = ({ 
  children, 
  className = "", 
  variant = "default",
  hoverScale = 1.02,
  hoverY = -5,
  staggerDelay = 0,
  ...motionProps 
}: AnimatedCardProps) => {
  const baseClasses = cardVariants[variant];
  
  return (
    <motion.div
      className={`${baseClasses} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: staggerDelay * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        scale: hoverScale, 
        y: hoverY,
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 20 
        }
      }}
      whileTap={{ scale: 0.98 }}
      style={{
        transformOrigin: "center center",
        willChange: "transform"
      }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;