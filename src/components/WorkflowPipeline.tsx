import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Search, Video, Cpu, Scissors, CheckCircle, Share2 } from 'lucide-react';

export const WorkflowPipeline: React.FC = () => {
  const steps = [
    { icon: <Search size={20} />, label: "Script" },
    { icon: <CheckCircle size={20} />, label: "Fact Check" },
    { icon: <Video size={20} />, label: "Film" },
    { icon: <Cpu size={20} />, label: "AI Rough Cut" },
    { icon: <Scissors size={20} />, label: "Final Edit" },
    { icon: <Share2 size={20} />, label: "Publish" },
  ];

  return (
    <div className="win95-inset bg-gray-100 p-6 overflow-x-auto">
      <div className="flex items-center min-w-max gap-4 px-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.label}>
            <div className="flex flex-col items-center gap-2 group">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 bg-win-grey win95-outset flex items-center justify-center text-win-blue group-hover:bg-retro-cyan group-hover:text-black transition-colors"
              >
                {step.icon}
              </motion.div>
              <span className="text-[10px] font-bold uppercase tracking-wider">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <ArrowRight size={16} className="text-win-border-dark animate-pulse" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
