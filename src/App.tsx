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
  Play
} from 'lucide-react';
import { RetroWindow } from './components/RetroWindow';
import { VideoCard } from './components/VideoCard';
import { MediaHandler } from './components/MediaHandler';
import { WorkflowPipeline } from './components/WorkflowPipeline';
import { Sticker } from './components/Sticker';
import { portfolioData } from './data';

export default function App() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen text-black bg-[#008080] pb-24 selection:bg-retro-pink selection:text-white">
      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-10 bg-win-grey win95-outset z-[100] flex items-center px-1">
        <button 
          onClick={() => scrollTo('hero')}
          className="win95-button flex items-center gap-2 font-bold px-2 mr-4"
        >
          <img src="https://win95icons.com/images/start-icon.png" alt="Start" className="w-5 h-5 image-pixelated" />
          Start
        </button>
        <div className="win95-inset h-8 flex-grow mx-2 px-2 flex items-center gap-4 overflow-x-auto no-scrollbar">
          <button onClick={() => scrollTo('brands')} className="win95-button flex items-center gap-2 text-xs truncate max-w-[120px]">
             Brands
          </button>
          <button onClick={() => scrollTo('social')} className="win95-button flex items-center gap-2 text-xs truncate max-w-[120px]">
             Social
          </button>
          <button onClick={() => scrollTo('copy')} className="win95-button flex items-center gap-2 text-xs truncate max-w-[120px]">
             Copy
          </button>
          <button onClick={() => scrollTo('ai')} className="win95-button flex items-center gap-2 text-xs truncate max-w-[120px]">
             AI
          </button>
        </div>
        <div className="win95-inset px-4 h-8 flex items-center text-xs font-pixel bg-gray-200">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      <main className="container mx-auto px-4 pt-12 relative max-w-6xl">
        {/* Sticky Decos */}
        <div className="hidden lg:block">
          <Sticker className="top-20 left-4" initialRotation={-15}>
            <span className="text-4xl">🤟</span>
          </Sticker>
          <Sticker className="top-40 right-4" initialRotation={10}>
            <div className="text-center p-2">
              <div className="text-xl font-display font-bold text-win-blue">BRAIN PEEK</div>
              <div className="text-[8px] font-mono tracking-tighter uppercase italic">Processing Ideas...</div>
            </div>
          </Sticker>
        </div>

        {/* Hero Section */}
        <section id="hero" className="min-h-[90vh] flex flex-col items-center justify-center relative mb-24">
          <div className="z-10 w-full max-w-4xl space-y-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <RetroWindow title="Greeting.exe" className="w-full md:w-3/5">
                <div className="space-y-6">
                  <h1 className="text-7xl md:text-9xl font-display leading-none font-bold text-win-blue drop-shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
                    Hey :-)
                  </h1>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold font-display italic underline decoration-retro-pink decoration-4">I'm {portfolioData.name},</h2>
                    <p className="text-lg md:text-2xl font-medium leading-snug">
                      {portfolioData.intro}
                    </p>
                  </div>
                  <div className="win95-inset p-4 bg-white/40 border-l-4 border-win-blue">
                    <p className="text-sm md:text-base font-medium leading-relaxed">
                      {portfolioData.personality}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <a 
                      href={portfolioData.cvUrl} 
                      target="_blank" 
                      rel="no-referrer"
                      className="win95-button flex items-center gap-2 !bg-win-blue !text-white px-8 py-3 font-bold no-underline"
                    >
                      <Download size={20} /> My CV
                    </a>
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
                className="hidden md:block w-full md:w-2/5 pt-12"
              >
                <RetroWindow title="Workspace.jpg" className="rotate-[3deg] hover:rotate-0 transition-transform">
                  <div className="aspect-[4/5] bg-gray-300 win95-inset mb-2 flex items-center justify-center overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format" 
                      alt="Work" 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <div className="text-[10px] font-mono text-gray-600 text-center uppercase tracking-tighter p-2">
                    {portfolioData.about}
                  </div>
                </RetroWindow>
              </motion.div>
            </div>

            <div className="flex flex-col items-center gap-4 animate-bounce opacity-80 mt-12">
              <span className="font-pixel text-2xl uppercase text-white shadow-sm tracking-widest">My Portfolio</span>
              <div className="flex flex-col items-center">
                <span className="text-xs font-mono text-white mb-2">just keep scrolling</span>
                <ChevronRight size={32} className="rotate-90 text-white" />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects / Brands */}
        <section id="brands" className="mb-64">
          <div className="flex flex-col items-center gap-4 mb-20 text-center">
            <h2 className="text-5xl md:text-7xl font-display font-bold uppercase text-white drop-shadow-xl tracking-tight">
              Brand Works
            </h2>
            <div className="bg-win-grey win95-outset px-6 py-2 font-mono text-sm text-win-blue font-bold border-2 border-win-blue">
               iCount, Strauss Ice Cream, AlArz Tahini, Toyota, Visa Cal.
            </div>
            <p className="text-sm font-mono text-white mt-4 italic">Writing, filming, production, and editing.</p>
          </div>

          <div className="space-y-32">
             {portfolioData.brandVideos.map((bv, idx) => (
                <motion.div 
                  key={bv.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <RetroWindow title={bv.name} className="max-w-4xl mx-auto shadow-2xl">
                    <div className="grid md:grid-cols-2 gap-8 items-start p-2">
                      <div className="order-2 md:order-1 space-y-6">
                        <h3 className="text-4xl font-display font-bold text-win-blue">{bv.name}</h3>
                        <div className="win95-inset bg-gray-50/50 p-4 border-l-4 border-retro-cyan">
                          <p className="text-base font-medium text-gray-700 leading-relaxed">
                            {bv.description}
                          </p>
                        </div>
                        <div className="flex gap-3">
                           <span className="win95-button text-[12px] uppercase font-bold px-3 py-1 bg-retro-yellow/10">Campaign.exe</span>
                           <span className="win95-button text-[12px] uppercase font-bold px-3 py-1 bg-retro-cyan/10">Production.sh</span>
                        </div>
                      </div>
                      <div className="order-1 md:order-2">
                         <div className="group relative">
                            <MediaHandler url={bv.mediaUrl} aspectRatio="aspect-video" />
                         </div>
                      </div>
                    </div>
                  </RetroWindow>
                </motion.div>
             ))}
          </div>
        </section>

        {/* Social Content */}
        <section id="social" className="mb-64">
          <div className="flex flex-col items-center gap-6 mb-20 text-center">
             <div className="rotate-[-1deg]">
                <h2 className="text-5xl md:text-8xl font-display font-bold uppercase text-retro-pink drop-shadow-[4px_4px_0px_white] tracking-tighter">
                  Social Content
                </h2>
             </div>
            <div className="win95-inset bg-white px-6 py-2 font-mono text-xs font-bold text-win-blue uppercase">
              Video content for my social media channels
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {portfolioData.socialVideos.map((video) => (
              <VideoCard 
                key={video.id}
                title={video.title}
                url={video.url}
                stats={video.stats}
              />
            ))}
          </div>
        </section>

        {/* Copywriting Section */}
        <section id="copy" className="mb-64">
          <div className="flex flex-col items-center mb-16">
            <div className="bg-retro-cyan text-black px-8 py-3 rotate-[-1.5deg] win95-outset z-10 border-2 border-black/10">
              <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-widest">
                Script Room
              </h2>
            </div>
            <p className="text-sm font-mono mt-6 text-white drop-shadow-md bg-black/20 px-4 py-1">
              A messy desktop full of social media copywriting...
            </p>
          </div>

          <div className="relative h-[700px] w-full overflow-hidden win95-inset bg-[#006666] border-4 border-win-grey/50 shadow-inner">
             {portfolioData.copywriting.map((copy, idx) => (
                <motion.div
                  key={copy.id}
                  drag
                  dragConstraints={{ left: 0, right: 900, top: 0, bottom: 500 }}
                  initial={{ 
                    x: 100 + (idx * 200), 
                    y: 100 + (idx * 40),
                    rotate: (idx % 2 === 0 ? 4 : -4)
                  }}
                  whileHover={{ zIndex: 50, scale: 1.02 }}
                  className="absolute cursor-move drop-shadow-2xl"
                >
                  <RetroWindow title={copy.title} className="w-[300px] md:w-[360px]">
                    <MediaHandler url={copy.imageUrl} />
                  </RetroWindow>
                </motion.div>
             ))}
             
             <div className="absolute bottom-6 left-6 flex flex-col gap-10 pointer-events-none opacity-20 group">
                <div className="flex flex-col items-center gap-2">
                  <Monitor size={48} className="text-white" />
                  <span className="text-[12px] text-white font-mono uppercase">Drafts</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <FileText size={48} className="text-white" />
                  <span className="text-[12px] text-white font-mono uppercase">Ideas_Trash</span>
                </div>
             </div>
          </div>
        </section>

        {/* AI Workflow Section */}
        <section id="ai" className="mb-64">
          <RetroWindow title="AI_Production_Optimization.sys" className="max-w-5xl mx-auto border-4 border-retro-green/30">
            <div className="grid md:grid-cols-2 gap-12 p-6">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-retro-green/10 rounded-lg">
                    <Cpu className="text-retro-green animate-pulse" size={32} />
                  </div>
                  <h2 className="text-4xl font-display font-bold text-win-blue underline group-hover:no-underline transition-all cursor-default">AI Production</h2>
                </div>
                <div className="space-y-4">
                  {[
                    "GPT-based fact-checking assistant for scripts",
                    "AI-driven wording corrections pre-filming",
                    "Optimized filming rig with integrated teleprompter",
                    "Direct-to-SSD recording pipeline",
                    "Gling.ai for automated first-pass cleanup",
                    "Manual AI enhancement with Captions.ai"
                  ].map((bullet, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 10 }}
                      className="flex items-start gap-3 p-2 bg-win-grey/30 win95-inset"
                    >
                      <span className="text-retro-green font-bold text-lg">{">"}</span>
                      <span className="text-sm font-bold uppercase tracking-tight leading-tight">{bullet}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <div className="win95-inset bg-black p-6 mb-8 shadow-[inset_0_0_20px_rgba(0,255,128,0.3)]">
                  <p className="text-retro-green font-mono text-xs space-y-1">
                    <span className="block opacity-50"># Initializing AI Pipeline...</span>
                    <span className="block text-retro-cyan font-bold tracking-widest uppercase mt-4">Status: Optimal</span>
                    <span className="block mt-2">Efficiency_Gain: +240%</span>
                    <span className="block">Human_Touch: Maintained</span>
                    <span className="block opacity-70 mt-4 animate-pulse underline decoration-1 underline-offset-4 cursor-default">-- RELEASING FOR RENDER --</span>
                  </p>
                </div>
                <WorkflowPipeline />
              </div>
            </div>
          </RetroWindow>
        </section>

        {/* Article Section */}
        <section id="articles" className="mb-64">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
            <h2 className="text-6xl md:text-8xl font-display font-bold text-white drop-shadow-[5px_5px_0px_#00ffff]">Opinions</h2>
            <div className="flex items-center gap-4 bg-win-blue text-white px-6 py-2 win95-outset rotate-[2deg]">
               <FileText size={24} />
               <span className="font-pixel text-xl uppercase tracking-tighter">Read & Learn</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {portfolioData.articles.map(article => (
              <a 
                key={article.id} 
                href={article.link} 
                target="_blank" 
                rel="no-referrer"
                className="block group no-underline"
              >
                <RetroWindow title={article.publication} className="group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform duration-300">
                  <div className="space-y-4">
                    <div className="overflow-hidden win95-inset grayscale group-hover:grayscale-0 transition-all duration-500">
                      <img src={article.imageUrl} className="w-full aspect-video object-cover" />
                    </div>
                    <h3 className="text-2xl font-bold font-display leading-tight group-hover:text-win-blue transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex justify-between text-[11px] font-mono border-t border-gray-200 pt-3">
                       <span className="font-bold opacity-60 uppercase">{article.date}</span>
                       <span className="flex items-center gap-1 font-bold text-retro-pink">CLICK_TO_READ <ExternalLink size={12} /></span>
                    </div>
                  </div>
                </RetroWindow>
              </a>
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
                
                <div className="pt-12">
                   <div className="win95-inset bg-white p-2 inline-block">
                      <p className="text-[11px] font-pixel text-gray-500 uppercase tracking-widest px-4">
                        ESTD 2024 | ALL RIGHTS BELONG TO THE CULTURE
                      </p>
                   </div>
                </div>
              </div>
            </RetroWindow>
          </div>
        </section>

      </main>

      <footer className="w-full py-20 flex flex-col items-center gap-8 border-t border-white/10 mt-24">
        <div className="flex gap-10 opacity-30 text-white">
          <Monitor size={24} />
          <MousePointer2 size={24} />
          <AlertTriangle size={24} />
        </div>
        <div className="text-center space-y-2">
          <p className="text-xs font-mono text-white/60 tracking-[0.2em] font-bold">
            MADE WITH TOO MANY TABS OPEN.
          </p>
          <p className="text-[9px] font-pixel text-white/40">
            RUNNING VERSION 1.0.95-STABLE
          </p>
        </div>
      </footer>
    </div>
  );
}
