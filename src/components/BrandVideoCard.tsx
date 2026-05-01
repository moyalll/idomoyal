import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RetroWindow } from './RetroWindow';
import { MediaHandler } from './MediaHandler';
import { BrandContent } from '../types';
import { Play } from 'lucide-react';

interface BrandVideoCardProps {
  bv: BrandContent;
}

export const BrandVideoCard: React.FC<BrandVideoCardProps> = ({ bv }) => {
  const [activeVideo, setActiveVideo] = useState(bv.mediaUrl);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <RetroWindow title={bv.name} className="max-w-5xl mx-auto shadow-2xl">
        <div className="grid md:grid-cols-12 gap-8 items-start p-2">
          <div className="order-2 md:order-1 md:col-span-5 space-y-6">
            <h3 className="text-4xl font-display font-bold text-win-blue">{bv.name}</h3>
            <div className="win95-inset bg-gray-50/50 p-4 border-l-4 border-retro-cyan">
              <p className="text-base font-medium text-gray-700 leading-relaxed whitespace-pre-line">
                {bv.description}
              </p>
            </div>
            
            {bv.playlist && bv.playlist.length > 0 && (
              <div className="space-y-2 mt-4">
                <div className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-2 border-b border-gray-300 pb-1">
                  Playlist.exe
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {bv.playlist.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveVideo(item.mediaUrl)}
                      className={`win95-button flex items-center gap-3 p-2 text-left transition-colors ${
                        activeVideo === item.mediaUrl 
                          ? '!bg-win-blue !text-white' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <Play size={14} className={activeVideo === item.mediaUrl ? 'fill-white' : 'text-win-blue'} />
                      <span className="text-xs font-bold font-sans truncate">{item.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {bv.footerImage ? (
              <div className="pt-2 w-full">
                <div className="win95-inset p-1 bg-white/50 block rounded-sm w-full overflow-hidden">
                  <img 
                    src={bv.footerImage} 
                    alt="Project Detail" 
                    className="w-full h-auto object-cover image-pixelated"
                  />
                </div>
              </div>
            ) : (
              <div className="flex gap-3">
                 <span className="win95-button text-[12px] uppercase font-bold px-3 py-1 bg-retro-yellow/10">Campaign.exe</span>
                 <span className="win95-button text-[12px] uppercase font-bold px-3 py-1 bg-retro-cyan/10">Production.sh</span>
              </div>
            )}
          </div>
          <div className="order-1 md:order-2 md:col-span-7">
            {bv.mediaUrls && bv.mediaUrls.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {bv.mediaUrls.map((url, i) => (
                  <div key={i} className="group relative">
                    <MediaHandler url={url} aspectRatio="aspect-[3/4]" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="group relative">
                 <MediaHandler url={activeVideo} aspectRatio="aspect-video" />
              </div>
            )}
          </div>
        </div>
      </RetroWindow>
    </motion.div>
  );
};
