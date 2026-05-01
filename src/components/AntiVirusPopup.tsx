import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldAlert, Instagram, Music2 } from 'lucide-react';

interface AntiVirusPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AntiVirusPopup: React.FC<AntiVirusPopupProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: 340, y: 100, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          exit={{ x: 340, y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className="fixed bottom-10 right-0 z-[100] w-[340px] shadow-2xl overflow-hidden rounded-tl-lg font-sans border-t border-l border-white/20"
        >
          {/* Top Red Header - McAfee Style */}
          <div className="bg-[#c01818] p-4 flex items-center justify-between relative">
             <div className="flex items-center gap-3">
                <div className="bg-white p-1 rounded-sm shadow-inner">
                   <ShieldAlert className="text-[#c01818]" size={20} />
                </div>
                <div className="flex flex-col">
                   <span className="text-white font-bold text-xl leading-none">Creative Alert</span>
                   <span className="text-white/80 text-[10px] uppercase font-bold tracking-wider mt-1">McMoyal Defender</span>
                </div>
             </div>
             <button 
               onClick={onClose}
               className="text-white/60 hover:text-white transition-colors"
             >
               <X size={18} />
             </button>
          </div>

          {/* Main Content Area - White Section */}
          <div className="bg-white p-6 border-x border-gray-200">
             <h3 className="text-gray-900 font-bold text-lg mb-1 leading-tight">
                I'm also a Content Creator!
             </h3>
             <p className="text-gray-500 text-sm mb-4">
                Follow me for more creative experiments and behind-the-scenes.
             </p>
             
             {/* Styled "Serial Number" or extra info like the screenshot */}
             <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] text-gray-400 font-bold uppercase">Status:</span>
                <div className="flex gap-1">
                   {['L1V3', 'F1R3', 'HOT', 'NEW'].map(tag => (
                      <span key={tag} className="bg-gray-100 border border-gray-300 text-gray-600 text-[9px] px-1.5 py-0.5 rounded-sm font-mono">
                         {tag}
                      </span>
                   ))}
                </div>
             </div>
          </div>

          {/* Bottom Button Area - Dark Section */}
          <div className="bg-[#2c2c2c] p-3 flex gap-2 border-x border-b border-gray-200">
             <a 
               href="https://www.instagram.com/moyal/" 
               target="_blank" 
               rel="no-referrer"
               className="flex-1 bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white py-2.5 rounded text-sm font-bold flex items-center justify-center gap-2 transition-all border border-white/10 no-underline"
             >
               <Instagram size={16} /> Instagram
             </a>
             <a 
               href="https://www.tiktok.com/@moyalllll" 
               target="_blank" 
               rel="no-referrer"
               className="flex-1 bg-[#3a3a3a] hover:bg-[#4a4a4a] text-white py-2.5 rounded text-sm font-bold flex items-center justify-center gap-2 transition-all border border-white/10 no-underline"
             >
               <Music2 size={16} /> TikTok
             </a>
          </div>

          {/* Bottom edge accent */}
          <div className="h-1 bg-[#c01818]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
