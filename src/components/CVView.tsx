import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, FileText, Download } from 'lucide-react';
import { RetroWindow } from './RetroWindow';

interface CVViewProps {
  onBack: () => void;
}

export const CVView: React.FC<CVViewProps> = ({ onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-12 max-w-6xl min-h-screen"
    >
      <div className="mb-8">
        <button 
          onClick={onBack}
          className="win95-button flex items-center gap-2 px-6 py-2 font-bold"
        >
          <ArrowLeft size={20} /> Back to Portfolio
        </button>
      </div>

      <RetroWindow title="CV_Viewer.exe" className="w-full h-[85vh]">
        <div className="w-full h-full flex flex-col gap-4">
          <div className="flex justify-between items-center px-4 py-2 bg-win-grey border-b-2 border-win-border-dark">
            <div className="flex items-center gap-2 text-win-blue font-bold font-mono text-sm">
              <FileText size={18} />
              <span>Ido_Moyal_CV.pdf</span>
            </div>
            <a 
              href="https://drive.google.com/uc?export=download&id=1U4KPDfegzJ3_SXEBS6qmsBk_UIekWUZj" 
              className="win95-button flex items-center gap-2 text-xs font-bold px-4 py-1"
            >
              <Download size={14} /> Download
            </a>
          </div>
          
          <div className="flex-grow win95-inset bg-white overflow-hidden relative">
            <iframe 
              src="https://drive.google.com/file/d/1U4KPDfegzJ3_SXEBS6qmsBk_UIekWUZj/preview" 
              className="absolute top-0 left-0 w-full h-full border-none"
              allow="autoplay"
              title="CV Document"
            />
          </div>
        </div>
      </RetroWindow>
    </motion.div>
  );
};
