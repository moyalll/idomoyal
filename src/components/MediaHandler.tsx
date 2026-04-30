import React from 'react';

interface MediaHandlerProps {
  url: string;
  className?: string;
  type?: 'video' | 'image' | 'auto';
  poster?: string;
  aspectRatio?: string;
}

export const MediaHandler: React.FC<MediaHandlerProps> = ({ 
  url, 
  className = "", 
  type = 'auto',
  poster,
  aspectRatio
}) => {
  // Helper to handle Google Drive links
  const getEmbedUrl = (rawUrl: string) => {
    if (!rawUrl) return "";
    
    // Check if it's a Google Drive link
    if (rawUrl.includes('drive.google.com')) {
      const match = rawUrl.match(/\/file\/d\/([^/]+)/);
      if (match && match[1]) {
        return `https://drive.google.com/file/d/${match[1]}/preview`;
      }
    }
    return rawUrl;
  };

  const embedUrl = getEmbedUrl(url);
  const isVideo = type === 'video' || (type === 'auto' && (url.includes('.mp4') || url.includes('.mov') || url.includes('drive.google.com')));

  if (!url) {
    return (
      <div className={`win95-inset bg-gray-200 flex items-center justify-center text-gray-500 font-mono text-xs text-center p-4 ${className}`}>
        [MEDIA_NOT_FOUND]
      </div>
    );
  }

  if (url.includes('drive.google.com')) {
    return (
      <div className={`relative w-full ${aspectRatio || 'aspect-[9/16]'} ${className}`}>
        <iframe
          src={embedUrl}
          className="absolute inset-0 w-full h-full border-none win95-inset"
          allow="autoplay; fullscreen"
          loading="lazy"
        />
      </div>
    );
  }

  if (isVideo) {
    return (
      <video 
        src={url} 
        controls 
        poster={poster}
        className={`win95-inset w-full h-auto ${className}`}
        loading="lazy"
      />
    );
  }

  return (
    <img 
      src={url} 
      alt="Portfolio media" 
      className={`win95-inset w-full h-auto object-cover ${className}`}
      loading="lazy"
      onError={(e) => {
        (e.target as HTMLImageElement).src = "https://placehold.co/400x600?text=Image+Not+Found";
      }}
    />
  );
};
