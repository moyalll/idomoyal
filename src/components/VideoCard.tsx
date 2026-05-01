import React from 'react';
import { motion } from 'motion/react';
import { Play, Heart, MessageCircle } from 'lucide-react';
import { MediaHandler } from './MediaHandler';
import { RetroWindow } from './RetroWindow';
import { SocialStats } from '../types';

interface VideoCardProps {
  title: string;
  url: string;
  stats?: SocialStats;
  badge?: string;
  aspectRatio?: string;
}

export const VideoCard: React.FC<VideoCardProps> = ({ title, url, stats, badge, aspectRatio }) => {
  return (
    <RetroWindow title={title} className="w-full max-w-[320px] mx-auto">
      <div className="relative group overflow-hidden">
        {badge && (
          <div className="absolute top-2 left-2 z-10 bg-retro-yellow text-black text-[10px] font-bold px-2 py-0.5 win95-outset rotate-[-5deg] group-hover:rotate-0 transition-transform">
            {badge}
          </div>
        )}
        <MediaHandler url={url} aspectRatio={aspectRatio} />
      </div>
      
      {stats && (
        <div className="mt-4 grid grid-cols-3 gap-2 font-pixel text-xs">
          <div className="flex items-center gap-1">
            <Play size={12} className="text-win-blue" /> {stats.views}
          </div>
          <div className="flex items-center gap-1">
            <Heart size={12} className="text-retro-pink" /> {stats.likes}
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle size={12} className="text-retro-cyan" /> {stats.comments}
          </div>
        </div>
      )}
    </RetroWindow>
  );
};
