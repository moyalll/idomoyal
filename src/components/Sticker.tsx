import React from 'react';
import { motion } from 'motion/react';

interface StickerProps {
  children: React.ReactNode;
  className?: string;
  initialRotation?: number;
}

export const Sticker: React.FC<StickerProps> = ({ children, className = "", initialRotation = 0 }) => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      initial={{ rotate: initialRotation, scale: 0 }}
      animate={{ rotate: initialRotation, scale: 1 }}
      whileHover={{ scale: 1.1, rotate: initialRotation + 5 }}
      whileTap={{ scale: 0.95 }}
      className={`absolute cursor-grab active:cursor-grabbing z-50 select-none ${className}`}
    >
      <div className="bg-white p-1 win95-outset shadow-xl">
        <div className="border border-dashed border-gray-400 p-1">
          {children}
        </div>
      </div>
    </motion.div>
  );
};
