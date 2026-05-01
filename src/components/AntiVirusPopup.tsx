import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldAlert, Instagram, MessageCircle } from 'lucide-react';

interface AntiVirusPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AntiVirusPopup: React.FC<AntiVirusPopupProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0, x: '-50%', y: '-50%' }}
          animate={{ scale: 1, opacity: 1, x: '-50%', y: '-50%' }}
          exit={{ scale: 0.5, opacity: 0, x: '-50%', y: '-50%' }}
          className="fixed top-1/2 left-1/2 z-[100] w-[320px] bg-win-grey border-2 win95-window shadow-2xl"
        >
          {/* Header */}
          <div className="win95-title-bar bg-[#ff0000] flex justify-between items-center px-2 py-1">
            <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-tighter">
              <ShieldAlert size={14} />
              <span>McMoyal Anti-Boredom v1.0</span>
            </div>
            <button 
              onClick={onClose}
              className="win95-button !p-0.5 w-5 h-5 flex items-center justify-center bg-win-grey text-black"
            >
              <X size={12} strokeWidth={3} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            <div className="flex gap-4 items-center">
              <div className="shrink-0 w-12 h-12 bg-white win95-inset flex items-center justify-center text-[#ff0000]">
                <ShieldAlert size={32} />
              </div>
              <p className="font-pixel text-sm leading-tight uppercase tracking-tight">
                I'm also a Content Creator!<br />
                <span className="text-win-blue font-bold italic">FOLLOW ME</span>
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <a 
                href="https://www.instagram.com/moyal/" 
                target="_blank" 
                rel="no-referrer"
                className="win95-button flex items-center justify-center gap-3 py-3 font-bold no-underline hover:bg-retro-pink hover:text-white transition-all"
              >
                <Instagram size={20} /> Instagram
              </a>
              <a 
                href="https://www.tiktok.com/@moyalllll" 
                target="_blank" 
                rel="no-referrer"
                className="win95-button flex items-center justify-center gap-3 py-3 font-bold no-underline hover:bg-black hover:text-white transition-all"
              >
                <MessageCircle size={20} /> TikTok
              </a>
            </div>

            <div className="pt-2 flex justify-end">
              <button 
                onClick={onClose}
                className="win95-button px-6 py-1 text-xs font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
