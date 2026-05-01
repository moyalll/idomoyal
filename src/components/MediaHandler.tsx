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
  const isGDriveImage = url.includes('drive.google.com/uc');

  // Helper to handle Google Drive and YouTube links
  const getEmbedUrl = (rawUrl: string) => {
    if (!rawUrl) return "";
    
    // Check if it's a Google Drive direct image link
    if (rawUrl.includes('drive.google.com/uc')) {
      const match = rawUrl.match(/id=([^&]+)/);
      if (match && match[1]) {
        return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1600`;
      }
    }

    // Check if it's a Google Drive link (but NOT a direct image link)
    if (rawUrl.includes('drive.google.com') && !isGDriveImage) {
      const match = rawUrl.match(/\/file\/d\/([^/]+)/);
      if (match && match[1]) {
        return `https://drive.google.com/file/d/${match[1]}/preview`;
      }
    }
    
    // Check if it's a YouTube playlist link
    if (rawUrl.includes('youtube.com/playlist?list=')) {
      const match = rawUrl.match(/list=([^&]+)/);
      if (match && match[1]) {
        return `https://www.youtube.com/embed/videoseries?list=${match[1]}&enablejsapi=1`;
      }
    }
    
    // Check if it's a standard YouTube video link
    if (rawUrl.includes('youtube.com/watch?v=')) {
      const match = rawUrl.match(/v=([^&]+)/);
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}?enablejsapi=1`;
      }
    }
    
    // Check if it's a YouTube short link (youtu.be)
    if (rawUrl.includes('youtu.be/')) {
      const match = rawUrl.match(/youtu\.be\/([^?]+)/);
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}?enablejsapi=1`;
      }
    }
    
    return rawUrl;
  };

  const embedUrl = getEmbedUrl(url);
  const isVideo = type === 'video' || (type === 'auto' && (url.includes('.mp4') || url.includes('.mov')));
  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');


  if (!url) {
    return (
      <div className={`win95-inset bg-gray-200 flex items-center justify-center text-gray-500 font-mono text-xs text-center p-4 ${className}`}>
        [MEDIA_NOT_FOUND]
      </div>
    );
  }

  if (url.includes('drive.google.com') && !isGDriveImage) {
    return (
      <div className={`relative w-full overflow-hidden win95-inset bg-black ${aspectRatio || 'aspect-[9/16]'} ${className}`}>
        <iframe
          src={embedUrl}
          className="absolute inset-0 w-full h-full border-none"
          allow="autoplay; fullscreen"
          loading="lazy"
        />
      </div>
    );
  }

  if (isYouTube) {
    return (
      <div className={`relative w-full overflow-hidden win95-inset ${aspectRatio || 'aspect-video'} ${className}`}>
        <iframe
          src={embedUrl}
          onLoad={(e) => {
            const win = e.currentTarget.contentWindow;
            const subscribe = () => {
              win?.postMessage(
                JSON.stringify({
                  event: 'command',
                  func: 'addEventListener',
                  args: ['onStateChange']
                }),
                '*'
              );
            };
            // Try immediately and again after delays to ensure the player is ready
            subscribe();
            setTimeout(subscribe, 500);
            setTimeout(subscribe, 1500);
            setTimeout(subscribe, 3000);
          }}
          className="absolute left-0 top-0 w-full h-full border-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    );
  }

  if (isVideo) {
    return (
      <div className={`relative w-full overflow-hidden win95-inset ${aspectRatio || 'aspect-[9/16]'} ${className}`}>
        <video 
          src={embedUrl} 
          controls 
          poster={poster}
          className="absolute left-0 top-0 w-full h-full object-cover"
          loading="lazy"
          onPlay={(e) => {
            // Pause other native videos
            const videos = document.querySelectorAll('video');
            videos.forEach((video) => {
              if (video !== e.currentTarget) {
                video.pause();
              }
            });
            // Pause YouTube iframes
            const iframes = document.querySelectorAll('iframe');
            iframes.forEach((iframe) => {
              if (iframe.src.includes('youtube.com')) {
                iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
              }
            });
          }}
        />
      </div>
    );
  }

  return (
    <div className={`overflow-hidden win95-inset bg-gray-100 ${aspectRatio || 'aspect-auto'} ${className}`}>
      <img 
        src={embedUrl} 
        alt="Portfolio media" 
        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
        loading="lazy"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "https://placehold.co/400x600?text=Image+Not+Found";
        }}
      />
    </div>
  );
};
