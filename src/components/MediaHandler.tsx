import React, { useEffect, useRef, useId } from 'react';
import { Play } from 'lucide-react';

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
  const [isActivated, setIsActivated] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);
  const instanceId = useId();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isGDriveImage = url.includes('drive.google.com/uc');

  useEffect(() => {
    const handleGlobalPause = (e: any) => {
      if (e.detail.id === instanceId) return;

      // Reset activation state for iframes
      if (isYouTube || url.includes('drive.google.com') || url.includes('tiktok.com')) {
        setIsActivated(false);
      }

      // Pause Native Video
      if (videoRef.current) {
        videoRef.current.pause();
      }

      // Pause YouTube/Drive/TikTok Iframes
      if (iframeRef.current && iframeRef.current.contentWindow) {
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
          iframeRef.current.contentWindow.postMessage(
            JSON.stringify({ event: 'command', func: 'pauseVideo', args: '' }),
            '*'
          );
        }
      }
    };

    window.addEventListener('video-play', handleGlobalPause);
    return () => window.removeEventListener('video-play', handleGlobalPause);
  }, [instanceId, url]);

  const handleActivate = () => {
    setIsActivated(true);
    window.dispatchEvent(new CustomEvent('video-play', { detail: { id: instanceId } }));
  };

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
        return `https://www.youtube.com/embed/videoseries?list=${match[1]}&enablejsapi=1&autoplay=1`;
      }
    }
    
    // Check if it's a standard YouTube video link
    if (rawUrl.includes('youtube.com/watch?v=')) {
      const match = rawUrl.match(/v=([^&]+)/);
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}?enablejsapi=1&autoplay=1`;
      }
    }
    
    // Check if it's a YouTube short link (youtu.be)
    if (rawUrl.includes('youtu.be/')) {
      const match = rawUrl.match(/youtu\.be\/([^?]+)/);
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}?enablejsapi=1&autoplay=1`;
      }
    }

    // Check if it's a YouTube shorts link
    if (rawUrl.includes('youtube.com/shorts/')) {
      const match = rawUrl.match(/shorts\/([^?]+)/);
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}?enablejsapi=1&autoplay=1`;
      }
    }

    // Check if it's a TikTok video link
    if (rawUrl.includes('tiktok.com/')) {
      const match = rawUrl.match(/video\/(\d+)/);
      if (match && match[1]) {
        return `https://www.tiktok.com/embed/v2/${match[1]}`;
      }
    }
    
    return rawUrl;
  };

  const embedUrl = getEmbedUrl(url);
  const isVideo = type === 'video' || (type === 'auto' && (url.includes('.mp4') || url.includes('.mov')));
  const isYouTube = url.includes('youtube.com') || url.includes('youtu.be');
  const isGDrive = url.includes('drive.google.com');


  if (!url) {
    return (
      <div className={`win95-inset bg-gray-200 flex items-center justify-center text-gray-500 font-mono text-xs text-center p-4 ${className}`}>
        [MEDIA_NOT_FOUND]
      </div>
    );
  }

  // Get Thumbnail for Overlay
  const getThumbnailUrl = () => {
    if (isYouTube) {
      const match = url.match(/(?:v=|\/embed\/|\/shorts\/|youtu\.be\/)([^?&/]+)/);
      if (match && match[1]) {
        // Special case for ID vvW9Q0GdB4A which has broken high-res thumbnails on YT side
        if (match[1] === 'vvW9Q0GdB4A') return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
        return `https://img.youtube.com/vi/${match[1]}/hq720.jpg`;
      }
    }
    if (url.includes('drive.google.com')) {
      const match = url.match(/\/file\/d\/([^/]+)/) || url.match(/id=([^&]+)/);
      if (match && (match[1] || match[0])) {
        const id = match[1] || match[0];
        return `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;
      }
    }
    return poster;
  };

  const thumbUrl = getThumbnailUrl();

  // Common Overlay Component
  const PlayOverlay = () => (
    <div 
      onClick={handleActivate}
      className="absolute inset-0 z-20 cursor-pointer group/overlay flex items-center justify-center"
    >
      {thumbUrl && (
        <img 
          src={thumbUrl} 
          alt="Thumbnail" 
          className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src.includes('hq720')) {
              target.src = target.src.replace('hq720', 'maxresdefault');
            } else if (target.src.includes('maxresdefault')) {
              target.src = target.src.replace('maxresdefault', 'sddefault');
            } else if (target.src.includes('sddefault')) {
              target.src = target.src.replace('sddefault', 'hqdefault');
            }
          }}
        />
      )}
      <div className="relative win95-button p-4 bg-win-grey group-hover/overlay:bg-win-blue group-hover/overlay:text-white transition-colors z-30">
        <Play className="fill-current" size={32} />
      </div>
    </div>
  );

  // Use Iframe for Google Drive content (more reliable than direct image links)
  if (isGDrive) {
    const driveId = url.split('id=')[1]?.split('&')[0] || url.split('/d/')[1]?.split('/')[0];
    const previewUrl = `https://drive.google.com/file/d/${driveId}/preview`;
    // Using lh3.googleusercontent.com which is the most robust direct link format
    const directUrl = `https://lh3.googleusercontent.com/d/${driveId}`;

    return (
      <div className={`relative w-full win95-inset bg-white ${className}`}>
        {!imageError ? (
          <img 
            src={directUrl}
            alt="Portfolio Content"
            className="w-full h-auto block"
            style={{ minHeight: '100px' }}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="aspect-[3/4] w-full relative">
            <iframe
              src={previewUrl}
              className="absolute inset-0 w-full h-full border-none"
              allow="autoplay"
              loading="lazy"
            />
          </div>
        )}
      </div>
    );
  }

  if (isYouTube || url.includes('tiktok.com')) {
    return (
      <div className={`relative w-full overflow-hidden win95-inset ${aspectRatio || (isYouTube ? 'aspect-video' : 'aspect-[9/16]')} ${className}`}>
        {!isActivated && <PlayOverlay />}
        {isActivated && (
          <iframe
            ref={iframeRef}
            src={embedUrl}
            className="absolute inset-0 w-full h-full border-none"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        )}
      </div>
    );
  }

  if (isVideo) {
    return (
      <div className={`relative w-full overflow-hidden win95-inset ${aspectRatio || 'aspect-[9/16]'} ${className}`}>
        <video 
          ref={videoRef}
          src={embedUrl} 
          controls 
          poster={poster}
          className="absolute left-0 top-0 w-full h-full object-cover"
          loading="lazy"
          onPlay={handleActivate}
        />
      </div>
    );
  }

  return (
    <div className={`overflow-hidden win95-inset bg-gray-100 ${aspectRatio || 'aspect-auto'} ${className}`}>
      <img 
        src={embedUrl} 
        alt="Portfolio media" 
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
};
