import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Info } from 'lucide-react';

interface VibeAlertProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VibeAlert: React.FC<VibeAlertProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay to catch clicks */}
          <div 
            className="fixed inset-0 z-[110] bg-black/10" 
            onClick={onClose}
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, x: '-50%', y: '-50%' }}
            animate={{ scale: 1, opacity: 1, x: '-50%', y: '-50%' }}
            exit={{ scale: 0.9, opacity: 0, x: '-50%', y: '-50%' }}
            className="fixed top-1/2 left-1/2 z-[120] w-fit min-w-[420px] bg-win-grey border-2 win95-window shadow-2xl"
          >
            {/* Title Bar */}
            <div className="win95-title-bar flex justify-between items-center px-1 py-0.5 m-0.5">
              <span className="text-white font-bold text-xs flex items-center gap-1">
                <img src="https://win98icons.alexmeub.com/icons/png/msg_information-2.png" alt="" className="w-3.5 h-3.5" />
                System Message
              </span>
              <button 
                onClick={onClose}
                className="win95-button !p-0 w-4 h-4 flex items-center justify-center bg-win-grey text-black"
              >
                <X size={10} strokeWidth={3} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 px-8 flex gap-4 items-center">
              <div className="shrink-0">
                <img 
                  src="https://win98icons.alexmeub.com/icons/png/msg_information-2.png" 
                  alt="Info" 
                  className="w-8 h-8 image-pixelated"
                />
              </div>
              <div className="space-y-6 flex-grow">
                <p className="text-sm font-pixel leading-none whitespace-nowrap pt-1">
                  don't push it.. i'm vibe coding not Bill Gates
                </p>
                <div className="flex justify-center">
                  <button 
                    onClick={onClose}
                    className="win95-button px-6 py-1 text-xs font-bold min-w-[80px]"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
