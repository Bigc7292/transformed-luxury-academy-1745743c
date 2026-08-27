import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Play, Pause, Award, ShieldCheck, Zap, ZoomIn, X, Video, FileText, ArrowRight } from 'lucide-react';
import { BOOKING_URL } from '../data/serviceCategories';

interface VideoAsset {
  id: number;
  title: string;
  description: string;
  src: string;
  thumbnail: string;
}

interface ImageAsset {
  id: number;
  title: string;
  description: string;
  src: string;
  category: 'results' | 'awards' | 'promo';
}

const PrecisionLiftLaunch: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'video' | 'results' | 'awards' | 'promo'>('video');
  const [selectedVideo, setSelectedVideo] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const videos: VideoAsset[] = [
    {
      id: 1,
      title: 'Prescision Laser: Laser Fiber Showcase',
      description: 'See the next-gen laser fiber technology in action, tightening and lifting facial structures.',
      src: '/mixture/WhatsApp Video 2026-06-11 at 9.51.09 AM.mp4',
      thumbnail: '/mixture/WhatsApp Image 2026-06-11 at 9.50.25 AM (4).jpeg'
    },
    {
      id: 2,
      title: 'Clinical Procedure Demo',
      description: 'A close-up look at the expert application of non-invasive laser fiber technology.',
      src: '/mixture/WhatsApp Video 2026-06-11 at 9.53.52 AM.mp4',
      thumbnail: '/mixture/WhatsApp Image 2026-06-11 at 9.50.25 AM (3).jpeg'
    },
    {
      id: 3,
      title: 'Advanced Fiber Lift Demonstration',
      description: 'Step-by-step clinical walkthrough of the sub-dermal laser fiber lift treatment.',
      src: '/mixture/attachments (1)/1000439044.mp4',
      thumbnail: '/mixture/WhatsApp Image 2026-06-11 at 9.50.25 AM (2).jpeg'
    },
    {
      id: 4,
      title: 'Full Treatment Procedure Walkthrough',
      description: 'Complete recording of the non-surgical laser lifting procedure for facial rejuvenation.',
      src: '/mixture/attachments/1000597489.mp4',
      thumbnail: '/mixture/WhatsApp Image 2026-06-11 at 9.50.25 AM.jpeg'
    },
    {
      id: 5,
      title: 'Precision Technique & Setup',
      description: 'Kayla demonstrating the machine parameters and skin preparation for the Laser Lift.',
      src: '/mixture/attachments/1000620988.mp4',
      thumbnail: '/mixture/attachments (1)/1000530641.webp'
    }
  ];

  const images: ImageAsset[] = [
    {
      id: 1,
      title: 'Full Face Lift Transformation',
      description: 'Surgical-grade results without incisions. Visible tightening along the jawline, cheeks, and neck.',
      src: '/mixture/WhatsApp Image 2026-06-11 at 9.50.25 AM.jpeg',
      category: 'results'
    },
    {
      id: 2,
      title: 'Lower Tummy Skin Tightening',
      description: 'Dramatic firming and remodeling of loose skin on the lower abdomen.',
      src: '/mixture/WhatsApp Image 2026-06-11 at 9.50.25 AM (1).jpeg',
      category: 'results'
    },
    {
      id: 3,
      title: 'Academy HQ Award Certificate',
      description: 'Accredited certificate of excellence awarded to Transformed Academy HQ for Precision Lift training.',
      src: '/mixture/WhatsApp Image 2026-06-11 at 9.50.25 AM (5).jpeg',
      category: 'awards'
    },
    {
      id: 4,
      title: 'Nickalea Deacon Practitioner Certificate',
      description: 'PPA Certificate of Excellence awarded to Nickalea Deacon for advanced clinical training.',
      src: '/mixture/WhatsApp Image 2026-06-11 at 9.50.25 AM (6).jpeg',
      category: 'awards'
    },
    {
      id: 5,
      title: 'Launch Banner & Technology',
      description: 'Official promotional launch detailing next-gen 2026 machine technology.',
      src: '/mixture/WhatsApp Image 2026-06-11 at 9.50.25 AM (4).jpeg',
      category: 'promo'
    },
    {
      id: 6,
      title: 'Instagram Launch Offer Detail',
      description: 'Tightens, firms, and promotes collagen. Limited time promotional sale.',
      src: '/mixture/WhatsApp Image 2026-06-11 at 9.50.25 AM (2).jpeg',
      category: 'promo'
    }
  ];

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(err => console.log('Playback error:', err));
      setIsPlaying(true);
    }
  };

  const handleVideoSelect = (id: number) => {
    setSelectedVideo(id);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-zinc-950 via-black to-zinc-950 text-white overflow-hidden border-y border-gold-500/20 relative">
      {/* Decorative lasers background */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl opacity-30 pointer-events-none" />

      {/* Embedded local keyframe animations */}
      <style>{`
        @keyframes laser-sweep {
          0% { top: 0%; opacity: 0.1; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { top: 100%; opacity: 0.1; }
        }
        .laser-sweep-line {
          animation: laser-sweep 3s linear infinite;
        }
        .gold-glow-hover {
          transition: all 0.3s ease;
        }
        .gold-glow-hover:hover {
          box-shadow: 0 0 25px rgba(212, 175, 55, 0.4);
          border-color: rgba(212, 175, 55, 0.6);
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-950/40 border border-gold-500/30 text-gold-300 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4 animate-pulse">
            <Award className="w-4 h-4 text-gold-400" />
            2026 award winner: precision lift™
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white font-medium tracking-tight mb-4">
            The Future of <span className="bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 bg-clip-text text-transparent">Skin Lifting</span>
          </h2>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mb-6" />
          <p className="text-gray-400 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            Introducing next-generation non-surgical Laser Fiber technology. Proudly certified by the Progressive Practitioner Awards, delivering surgical-grade skin tightening with minimal downtime.
          </p>
        </div>

        {/* Global Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-12">
          {[
            { id: 'video', label: 'Treatment Videos', icon: <Video className="w-4 h-4" /> },
            { id: 'results', label: 'Before & After Results', icon: <Sparkles className="w-4 h-4" /> },
            { id: 'awards', label: 'Accreditations & Awards', icon: <Award className="w-4 h-4" /> },
            { id: 'promo', label: 'Technology Features', icon: <FileText className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full border text-xs sm:text-sm font-medium tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-gold-400 to-gold-500 text-black border-gold-400 shadow-lg shadow-gold-500/20'
                  : 'bg-zinc-900/60 border-zinc-800 text-gray-400 hover:text-white hover:border-gold-500/30'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Content Area */}
        <AnimatePresence mode="wait">
          {activeTab === 'video' && (
            <motion.div
              key="video-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch"
            >
              {/* Left Column: Interactive Video Player */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div className="relative rounded-2xl overflow-hidden border border-gold-500/30 bg-black aspect-video shadow-2xl group">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover opacity-90"
                    src={videos.find(v => v.id === selectedVideo)?.src}
                    playsInline
                    loop
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onClick={handlePlayPause}
                  />

                  {/* Glowing Laser Scan Micro-animation (only when playing) */}
                  {isPlaying && (
                    <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent laser-sweep-line pointer-events-none z-10" />
                  )}

                  {/* Big Play/Pause Overlay */}
                  <button
                    onClick={handlePlayPause}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors z-0 cursor-pointer"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    <span className={`w-16 h-16 rounded-full bg-gold-500/90 text-black flex items-center justify-center shadow-xl transform transition-transform duration-300 ${isPlaying ? 'scale-90 opacity-0 group-hover:opacity-100' : 'scale-100 animate-pulse'}`}>
                      {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                    </span>
                  </button>

                  {/* Scanner Indicator HUD overlay */}
                  <div className="absolute bottom-4 left-4 z-10 bg-black/60 backdrop-blur-sm border border-gold-500/20 px-3 py-1 rounded text-[10px] tracking-widest uppercase text-gold-300 font-mono flex items-center gap-1.5 pointer-events-none">
                    <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 animate-ping' : 'bg-gold-500'}`} />
                    {isPlaying ? 'System Active: Scanning' : 'System Ready'}
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-xl sm:text-2xl font-serif text-gold-100 mb-2">
                    {videos.find(v => v.id === selectedVideo)?.title}
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    {videos.find(v => v.id === selectedVideo)?.description}
                  </p>
                </div>
              </div>

              {/* Right Column: Video Selection & Offer */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-6">
                {/* Playlist Selection */}
                <div className="space-y-4">
                  <h4 className="text-xs font-semibold tracking-wider text-gray-500 uppercase mb-2">Select Video Demonstration</h4>
                  {videos.map((vid) => (
                    <button
                      key={vid.id}
                      onClick={() => handleVideoSelect(vid.id)}
                      className={`w-full text-left p-4 rounded-xl border flex gap-4 items-center transition-all duration-300 cursor-pointer ${
                        selectedVideo === vid.id
                          ? 'bg-gold-950/20 border-gold-500/60 shadow-lg shadow-gold-500/5'
                          : 'bg-zinc-900/40 border-zinc-800 hover:border-gold-500/30'
                      }`}
                    >
                      <div className="w-20 aspect-video rounded-lg overflow-hidden bg-zinc-950 border border-zinc-800 flex-shrink-0 relative">
                        <img src={vid.thumbnail} alt={vid.title} className="w-full h-full object-cover opacity-60" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <Play className="w-4 h-4 text-white fill-current" />
                        </div>
                      </div>
                      <div>
                        <h5 className={`font-serif text-sm font-medium ${selectedVideo === vid.id ? 'text-gold-300' : 'text-white'}`}>
                          {vid.title}
                        </h5>
                        <p className="text-xs text-gray-500 line-clamp-1 mt-1">{vid.description}</p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Golden Launch Pricing Box */}
                <div className="p-6 rounded-2xl border-2 border-gold-500/30 bg-gradient-to-br from-gold-950/25 via-zinc-950 to-zinc-950 relative overflow-hidden shadow-2xl">
                  {/* Glowing background highlights */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/10 rounded-full blur-xl pointer-events-none" />
                  
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[10px] tracking-wider text-gold-400 font-semibold uppercase bg-gold-950/80 border border-gold-500/30 px-2.5 py-1 rounded">Launch Special</span>
                      <h4 className="text-lg font-serif text-white mt-2">Precision Lift™ Full Face</h4>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 line-through">Was £999</p>
                      <p className="text-2xl font-serif text-gold-400 font-semibold">£699</p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 mb-6 leading-relaxed">
                    Experience results that last up to 3 years. This next-gen non-invasive laser lift tightens and firms skin instantly, promoting deep collagen synthesis.
                  </p>

                  <div className="space-y-2.5 mb-6 text-xs text-gray-300">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-gold-400" />
                      <span>FDA-Approved Laser Fiber Technology</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-gold-400" />
                      <span>Instant remodeling + 3 years collagen duration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-gold-400" />
                      <span>Performed by Level 5 Certified Educator</span>
                    </div>
                  </div>

                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-gold-400 to-gold-500 text-black text-center font-semibold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20 hover:shadow-gold-500/40 hover:scale-101 transition-all duration-300"
                  >
                    <span>Book Launch Special</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'results' && (
            <motion.div
              key="results-tab"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {images.filter(img => img.category === 'results').map((item) => (
                <div
                  key={item.id}
                  onClick={() => setZoomImage(item.src)}
                  className="group relative rounded-2xl overflow-hidden border border-gold-500/20 bg-zinc-900/50 shadow-xl cursor-zoom-in gold-glow-hover flex flex-col"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-black relative">
                    <img src={item.src} alt={item.title} className="w-full h-full object-cover opacity-90 group-hover:scale-103 transition-transform duration-700 ease-out" />
                    
                    {/* Dark gradient mask */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                    
                    {/* Zoom Icon indicator */}
                    <div className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-sm border border-gold-500/20 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ZoomIn className="w-4 h-4 text-gold-400" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-serif text-gold-300 mb-2">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'awards' && (
            <motion.div
              key="awards-tab"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
              {/* Trust Badge and Intro */}
              <div className="flex flex-col md:flex-row gap-8 items-center bg-zinc-900/40 border border-zinc-800 p-6 sm:p-8 rounded-2xl max-w-4xl mx-auto">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-zinc-950 border-2 border-gold-500/40 flex-shrink-0 flex items-center justify-center p-1 relative shadow-lg">
                  <img src="/mixture/WhatsApp Image 2026-06-11 at 9.50.25 AM (7).jpeg" alt="Accredited Winner Badge" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-xl font-serif text-gold-300 mb-2">Progressive Practitioner Award Winner</h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    Transformed Academy HQ is certified and recognized for advanced aesthetic instruction. Kayla (Nickalea Deacon) is a Level 5 Qualified Educator holding certificates of excellence for non-surgical Precision Lifting. Rest assured, you are receiving treatments from an industry educator.
                  </p>
                </div>
              </div>

              {/* Certificates grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {images.filter(img => img.category === 'awards').map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setZoomImage(item.src)}
                    className="group relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/35 shadow-lg cursor-zoom-in gold-glow-hover flex flex-col"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-white relative flex items-center justify-center p-2">
                      <img src={item.src} alt={item.title} className="max-w-full max-h-full object-contain opacity-95 group-hover:scale-102 transition-transform duration-700 ease-out" />
                      
                      {/* Zoom Indicator */}
                      <div className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-sm border border-gold-500/20 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ZoomIn className="w-4 h-4 text-gold-400" />
                      </div>
                    </div>
                    <div className="p-5 border-t border-zinc-800">
                      <h4 className="text-sm font-serif text-gold-300 mb-1">{item.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'promo' && (
            <motion.div
              key="promo-tab"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            >
              {images.filter(img => img.category === 'promo').map((item) => (
                <div
                  key={item.id}
                  onClick={() => setZoomImage(item.src)}
                  className="group relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/50 shadow-xl cursor-zoom-in gold-glow-hover flex flex-col"
                >
                  <div className="aspect-square w-full overflow-hidden bg-black relative flex items-center justify-center">
                    <img src={item.src} alt={item.title} className="w-full h-full object-cover opacity-90 group-hover:scale-102 transition-transform duration-700 ease-out" />
                    
                    {/* Zoom Icon indicator */}
                    <div className="absolute top-4 right-4 z-10 bg-black/60 backdrop-blur-sm border border-gold-500/20 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ZoomIn className="w-4 h-4 text-gold-400" />
                    </div>
                  </div>
                  <div className="p-5 border-t border-zinc-800">
                    <h3 className="text-base font-serif text-gold-300 mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fullscreen Certificate/Image Zoom Lightbox */}
      <AnimatePresence>
        {zoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8 backdrop-blur-md cursor-zoom-out"
          >
            {/* Close Button */}
            <button
              onClick={() => setZoomImage(null)}
              className="absolute top-6 right-6 z-50 text-white/80 hover:text-gold-400 p-2 bg-black/50 border border-white/10 hover:border-gold-500/30 rounded-full transition-all"
              aria-label="Close image"
            >
              <X className="w-6 h-6" />
            </button>

            {/* High-res Image display */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-4xl max-h-[85vh] rounded-xl overflow-hidden border border-gold-500/30 shadow-2xl bg-zinc-950 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                className="max-w-full max-h-[85vh] object-contain"
                src={zoomImage}
                alt="Zoomed Result"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PrecisionLiftLaunch;
