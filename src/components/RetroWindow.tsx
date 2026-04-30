import React from 'react';
import { motion } from 'motion/react';
import { X, Minus, Square } from 'lucide-react';

interface RetroWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
  onClose?: () => void;
  maxWidth?: string;
}

export const RetroWindow: React.FC<RetroWindowProps> = ({ 
  title, 
  children, 
  className = "", 
  id,
  onClose,
  maxWidth = "none"
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      id={id}
      className={`win95-window flex flex-col ${className}`}
      style={{ maxWidth }}
    >
      <div className="win95-title-bar">
        <span className="truncate mr-4">{title}</span>
        <div className="flex gap-1 shrink-0">
          <button className="win95-button !p-0.5 w-5 h-5 flex items-center justify-center">
            <Minus size={12} strokeWidth={3} />
          </button>
          <button className="win95-button !p-0.5 w-5 h-5 flex items-center justify-center">
            <Square size={10} strokeWidth={3} />
          </button>
          <button 
            onClick={onClose}
            className="win95-button !p-0.5 w-5 h-5 flex items-center justify-center ml-1"
          >
            <X size={12} strokeWidth={3} />
          </button>
        </div>
      </div>
      <div className="p-4 win95-scroll-area flex-grow">
        {children}
      </div>
    </motion.div>
  );
};
