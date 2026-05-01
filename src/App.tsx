import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Video, 
  PenTool, 
  Cpu, 
  FileText, 
  Mail, 
  Phone, 
  Instagram, 
  Linkedin, 
  Download,
  AlertTriangle,
  Monitor,
  MousePointer2,
  ExternalLink,
  ChevronRight,
  Play,
  Trash2,
  Globe,
  Folder
} from 'lucide-react';
import { RetroWindow } from './components/RetroWindow';
import { VideoCard } from './components/VideoCard';
import { BrandVideoCard } from './components/BrandVideoCard';
import { MediaHandler } from './components/MediaHandler';
import { AntiVirusPopup } from './components/AntiVirusPopup';
import { VibeAlert } from './components/VibeAlert';
import { CVView } from './components/CVView';
import { Sticker } from './components/Sticker';
import { portfolioData } from './data';

export default function App() {
  const [view, setView] = useState<'main' | 'cv'>('main');
  const [showPopup, setShowPopup] = useState(false);
  const [showVibeAlert, setShowVibeAlert] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);


  useEffect(() => {
    if (view !== 'main' || hasShownPopup) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowPopup(true);
          setHasShownPopup(true);
        }
      },
      { threshold: 0.1 }
    );

    const socialSection = document.getElementById('social');
    if (socialSection) observer.observe(socialSection);

    return () => observer.disconnect();
  }, [view, hasShownPopup]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const copySection = document.getElementById('copy');
      if (copySection) {
        const rect = copySection.getBoundingClientRect();
        // Show hint when user has scrolled past the top of the "Posts" section
        setShowScrollHint(rect.top < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    // 1. YouTube API postMessage listener (fallback)
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://www.youtube.com') return;
      try {
        let data;
        if (typeof event.data === 'string') {
          data = JSON.parse(event.data);
        } else if (typeof event.data === 'object' && event.data !== null) {
          data = event.data;
        } else {
          return;
        }
        
        // Auto-subscribe when iframe announces it is ready
        if (data.event === 'initialDelivery' || data.event === 'infoDelivery' || data.event === 'onReady') {
          if (event.source && typeof (event.source as Window).postMessage === 'function') {
            (event.source as Window).postMessage(JSON.stringify({
              event: 'command',
              func: 'addEventListener',
              args: ['onStateChange']
            }), '*');
          }
        }
        
        // YouTube player state 1 means playing
        if (data.event === 'onStateChange' && data.info === 1) {
          document.querySelectorAll('video').forEach((video) => video.pause());
          document.querySelectorAll('iframe').forEach((iframe) => {
            if (iframe.src.includes('youtube.com') && iframe.contentWindow !== event.source) {
              iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            }
          });
        }
      } catch (e) {
        // Ignore parsing errors
      }
    };

    // 2. Blur trick: Detect when user clicks into any iframe (like YouTube) and pause native videos
    const handleBlur = () => {
      // Small timeout to allow document.activeElement to update
      setTimeout(() => {
        if (document.activeElement instanceof HTMLIFrameElement) {
          document.querySelectorAll('video').forEach((video) => video.pause());
          
          // We can also pause OTHER iframes here, but we don't know which one was clicked 
          // without comparing activeElement.
          const activeIframe = document.activeElement;
          document.querySelectorAll('iframe').forEach((iframe) => {
            if (iframe !== activeIframe && iframe.src.includes('youtube.com')) {
              iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            }
          });
        }
      }, 0);
    };

    window.addEventListener('message', handleMessage);
    window.addEventListener('blur', handleBlur);
    
    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#008080] selection:bg-retro-pink selection:text-white">
      <AnimatePresence mode="wait">
        {view === 'cv' ? (
          <CVView key="cv" onBack={() => setView('main')} />
        ) : (
          <motion.div 
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pb-24"
          >
            {/* Taskbar */}
      {/* Navigation Hint */}
      <AnimatePresence>
        {showScrollHint && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-16 left-4 z-[110] flex flex-col items-center animate-bounce pointer-events-none"
          >
            <div className="win95-outset bg-retro-yellow px-4 py-2 text-xs font-pixel text-black border-2 border-black shadow-lg whitespace-nowrap">
              WANNA GO UP? CLICK START
            </div>
            <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-black mt-[-1px] rotate-180" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-0 left-0 right-0 h-10 bg-win-grey win95-outset z-[100] flex items-center px-1">
        <button 
          onClick={() => scrollTo('hero')}
          className="win95-button flex items-center gap-2 font-bold px-2 mr-4"
        >
          <img src="https://win98icons.alexmeub.com/icons/png/windows-0.png" alt="Start" className="w-4 h-4 image-pixelated" />
          Start
        </button>
        <div className="win95-inset h-8 flex-grow mx-2 px-2 flex items-center gap-4 overflow-x-auto no-scrollbar">
          <button onClick={() => scrollTo('brands')} className="win95-button flex items-center gap-2 text-xs truncate max-w-[120px]">
             Campaigns
          </button>
          <button onClick={() => scrollTo('reels')} className="win95-button flex items-center gap-2 text-xs truncate max-w-[120px]">
             Reels
          </button>
          <button onClick={() => scrollTo('social')} className="win95-button flex items-center gap-2 text-xs truncate max-w-[120px]">
             Content
          </button>
          <button onClick={() => scrollTo('copy')} className="win95-button flex items-center gap-2 text-xs truncate max-w-[120px]">
             Posts
          </button>
        </div>
        <div className="win95-inset px-4 h-8 flex items-center text-xs font-pixel bg-gray-200">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      <main className="container mx-auto px-4 pt-32 md:pt-12 relative max-w-6xl">
        {/* Desktop Icons */}
        <div className="absolute top-4 md:top-12 left-0 right-0 md:right-auto md:left-4 z-20 flex flex-row md:flex-col justify-center md:justify-start gap-2 md:gap-6 px-4 md:px-0">
          <div 
            onClick={() => setShowVibeAlert(true)}
            className="flex flex-col items-center gap-1 group cursor-pointer w-20"
          >
            <div className="p-1 group-hover:bg-win-blue/30 rounded-sm transition-colors ring-1 ring-transparent group-hover:ring-white/20">
              <img 
                src="https://win98icons.alexmeub.com/icons/png/computer-3.png" 
                alt="My Computer" 
                className="w-8 h-8 image-pixelated"
              />
            </div>
            <span className="text-[10px] font-pixel text-white bg-black/40 px-1.5 py-0.5 text-center leading-none">My Computer</span>
          </div>
          
          <div 
            onClick={() => setShowVibeAlert(true)}
            className="flex flex-col items-center gap-1 group cursor-pointer w-20"
          >
            <div className="p-1 group-hover:bg-win-blue/30 rounded-sm transition-colors ring-1 ring-transparent group-hover:ring-white/20">
              <img 
                src="https://win98icons.alexmeub.com/icons/png/recycle_bin_empty-4.png" 
                alt="Recycle Bin" 
                className="w-8 h-8 image-pixelated"
              />
            </div>
            <span className="text-[10px] font-pixel text-white bg-black/40 px-1.5 py-0.5 text-center leading-none">Recycle Bin</span>
          </div>

          <div 
            onClick={() => setShowVibeAlert(true)}
            className="flex flex-col items-center gap-1 group cursor-pointer w-20"
          >
            <div className="p-1 group-hover:bg-win-blue/30 rounded-sm transition-colors ring-1 ring-transparent group-hover:ring-white/20">
              <img 
                src="https://win98icons.alexmeub.com/icons/png/msie1-1.png" 
                alt="The Internet" 
                className="w-8 h-8 image-pixelated"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://win98icons.alexmeub.com/icons/png/world-2.png";
                }}
              />
            </div>
            <span className="text-[10px] font-pixel text-white bg-black/40 px-1.5 py-0.5 text-center leading-none text-nowrap">The Internet</span>
          </div>

          <div 
            onClick={() => setShowVibeAlert(true)}
            className="flex flex-col items-center gap-1 group cursor-pointer w-20"
          >
            <div className="p-1 group-hover:bg-win-blue/30 rounded-sm transition-colors ring-1 ring-transparent group-hover:ring-white/20">
              <img 
                src="https://win98icons.alexmeub.com/icons/png/briefcase-2.png" 
                alt="My Briefcase" 
                className="w-8 h-8 image-pixelated"
              />
            </div>
            <span className="text-[10px] font-pixel text-white bg-black/40 px-1.5 py-0.5 text-center leading-none text-nowrap">My Briefcase</span>
          </div>
        </div>

        {/* Hero Section */}
        <section id="hero" className="min-h-[80vh] flex flex-col items-center justify-center relative mb-12">
          <div className="z-10 w-full max-w-4xl space-y-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <RetroWindow title="Greeting.exe" className="w-full md:w-[62%] flex-shrink-0">
                <div className="space-y-6">
                  <h1 className="text-7xl md:text-9xl font-display leading-none font-bold text-win-blue drop-shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
                    Hey :-)
                  </h1>
                        <div className="space-y-4">
                          <h2 className="text-2xl font-bold font-display italic underline decoration-retro-pink decoration-4">I'm {portfolioData.name},</h2>
                          <p className="text-lg md:text-2xl font-medium leading-snug whitespace-pre-line">
                            {portfolioData.intro}
                          </p>
                        </div>
                        <div className="win95-inset p-4 bg-white/40 border-l-4 border-win-blue">
                          <p className="text-sm md:text-base font-medium leading-relaxed whitespace-pre-line">
                            {portfolioData.personality}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-4 pt-4">
                          <button 
                            onClick={() => setView('cv')}
                            className="win95-button flex items-center gap-2 !bg-win-blue !text-white px-8 py-3 font-bold no-underline"
                          >
                            <Download size={20} /> My CV
                          </button>
                          <button 
                            onClick={() => scrollTo('contact')}
                            className="win95-button flex items-center gap-2 px-8 py-3 font-bold"
                          >
                            <Mail size={20} /> Contact me
                          </button>
                        </div>
                </div>
              </RetroWindow>

              {/* Floating Profile Box */}
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="hidden md:block w-full md:w-[38%] pt-12"
              >
                <RetroWindow title="Workspace.jpg" className="rotate-[3deg] hover:rotate-0 transition-transform">
                    <div className="aspect-[4/5] bg-gray-300 win95-inset mb-2 relative overflow-hidden group">
                      {/* Direct Image Method (Preferred) */}
                      <div 
                        className="absolute inset-0 z-10 grayscale group-hover:grayscale-0 transition-all duration-700 bg-cover bg-center"
                        style={{ 
                          backgroundImage: `url(https://drive.google.com/thumbnail?id=1nSagw8SjO12tMpQ1hB4ao5LhOt41FoMY&sz=w1600)` 
                        }}
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      
                      {/* Cropped Iframe Method (Fallback/UI Cleanup) */}
                      <iframe 
                        src="https://drive.google.com/file/d/1nSagw8SjO12tMpQ1hB4ao5LhOt41FoMY/preview"
                        className="absolute inset-0 w-full h-full border-none pointer-events-none grayscale group-hover:grayscale-0 transition-all duration-700"
                        allow="autoplay"
                      />
                    </div>
                  <div className="text-[10px] font-mono text-gray-600 text-center uppercase tracking-tighter p-2">
                    {portfolioData.about}
                  </div>
                </RetroWindow>
              </motion.div>
            </div>

            <div className="flex flex-col items-center gap-4 animate-bounce opacity-80 mt-6">
              <span className="font-pixel text-2xl uppercase text-white shadow-sm tracking-widest">My Portfolio</span>
              <div className="flex flex-col items-center">
                <span className="text-xs font-mono text-white mb-2">just keep scrolling</span>
                <ChevronRight size={32} className="rotate-90 text-white" />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects / Brands */}
        <section id="brands" className="mb-24">
          <div className="space-y-12">
             {portfolioData.brandVideos.map((bv) => (
                <BrandVideoCard key={bv.id} bv={bv} />
             ))}
          </div>

          <div id="reels" className="flex flex-col items-center gap-4 mt-32 text-center">
            <h2 className="text-5xl md:text-7xl font-display font-bold uppercase text-white drop-shadow-xl tracking-tight">
              Reel Talk
            </h2>
            <div className="bg-win-grey win95-outset px-6 py-2 font-mono text-sm text-win-blue font-bold border-2 border-win-blue">
               iCount, Strauss Ice Cream, Toyota, Visa Cal, AlArz Tahini.
            </div>
            <p className="text-sm font-mono text-white mt-4 italic">Writing, filming, production, and editing.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto px-4">
            {portfolioData.brandGridVideos.map((video) => (
               <VideoCard 
                 key={video.id} 
                 title={video.title}
                 url={video.url}
                 stats={video.stats}
                 aspectRatio="aspect-[9/16]"
               />
            ))}
          </div>
        </section>

        {/* Social Content */}
        <section id="social" className="mb-24">
          <div className="flex flex-col items-center gap-6 mb-20 text-center">
             <div className="rotate-[-1deg]">
                <h2 className="text-5xl md:text-8xl font-display font-bold uppercase text-retro-pink drop-shadow-[4px_4px_0px_white] tracking-tighter">
                  Content Creation
                </h2>
             </div>
            <div className="win95-inset bg-white px-6 py-2 font-mono text-xs font-bold text-win-blue uppercase">
              Video content for my social media channels
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto px-4 justify-items-center">
            {portfolioData.socialVideos.map((video) => (
              <VideoCard 
                key={video.id}
                title={video.title}
                url={video.url}
                stats={video.stats}
                aspectRatio="aspect-[9/16]"
              />
            ))}
          </div>
        </section>

        {/* Social Posts Section */}
        <section id="copy" className="mb-24 px-4">
          <div className="flex flex-col items-center mb-16 text-center">
            <div className="bg-retro-cyan text-black px-8 py-3 rotate-[-1.5deg] win95-outset z-10 border-2 border-black/10">
              <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-widest">
                Social Posts
              </h2>
            </div>
            <p className="text-sm font-mono mt-6 text-white drop-shadow-md bg-black/20 px-4 py-1 max-w-xl">
              A curated collection of social media content and copywriting...
            </p>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 w-full max-w-7xl mx-auto space-y-8">
             {portfolioData.socialPosts.map((post) => (
                <div
                  key={post.id}
                  className="break-inside-avoid"
                >
                  <RetroWindow title={post.title} className="w-full">
                    <MediaHandler url={post.imageUrl} aspectRatio="aspect-auto" />
                  </RetroWindow>
                </div>
             ))}
          </div>
        </section>





        {/* Contact Section */}
        <section id="contact" className="mb-24 px-4">
          <div className="max-w-2xl mx-auto">
            {/* Header Popup */}
            <div className="bg-retro-pink text-white px-4 py-1 win95-outset w-fit mx-auto mb-[-20px] relative z-20 rotate-[-1deg]">
              <span className="font-bold uppercase tracking-widest text-[10px]">Contact_Form.exe</span>
            </div>
            
            <RetroWindow title="Let's make cool things" className="bg-win-grey/50 backdrop-blur-sm shadow-2xl">
              <div className="text-center space-y-12 py-10">
                <h2 className="text-5xl md:text-7xl font-display font-bold text-win-blue leading-none">Drop a line</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                  <a href={`mailto:${portfolioData.contact.email}`} className="win95-button flex items-center justify-center gap-3 p-4 no-underline group hover:bg-win-blue hover:text-white transition-all">
                    <Mail size={24} />
                    <div className="text-left">
                       <div className="text-[10px] font-mono leading-none opacity-60 uppercase font-bold">Email me</div>
                       <div className="text-xs font-bold font-mono tracking-tighter truncate">{portfolioData.contact.email}</div>
                    </div>
                  </a>
                  <a href={`tel:${portfolioData.contact.phone}`} className="win95-button flex items-center justify-center gap-3 p-4 no-underline group hover:bg-retro-green hover:text-black transition-all">
                    <Phone size={24} />
                    <div className="text-left">
                       <div className="text-[10px] font-mono leading-none opacity-60 uppercase font-bold">Call me</div>
                       <div className="text-xs font-bold font-mono tracking-tighter">{portfolioData.contact.phone}</div>
                    </div>
                  </a>
                </div>
                
                <div className="flex justify-center gap-8 pt-4">
                  <a href={portfolioData.contact.instagram} target="_blank" rel="no-referrer" className="win95-button !p-4 hover:bg-retro-pink hover:text-white transition-all">
                    <Instagram size={28} />
                  </a>
                  <a href={portfolioData.contact.linkedin} target="_blank" rel="no-referrer" className="win95-button !p-4 hover:bg-win-blue hover:text-white transition-all">
                    <Linkedin size={28} />
                  </a>
                </div>
                

              </div>
            </RetroWindow>
          </div>
        </section>

      </main>


          </motion.div>
        )}
      </AnimatePresence>

      <AntiVirusPopup 
        isOpen={showPopup} 
        onClose={() => setShowPopup(false)} 
      />

      <VibeAlert 
        isOpen={showVibeAlert} 
        onClose={() => setShowVibeAlert(false)} 
      />
    </div>
  );
}
