"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { 
  motion, 
  AnimatePresence, 
  useMotionValue, 
  useTransform, 
  useSpring 
} from "framer-motion";
import { 
  Download, 
  Loader2, 
  ArrowRight, 
  Shield, 
  Globe,
  Link2,
  Play,
  Layers,
  Smartphone,
  FileAudio,
  MousePointer2,
  ChevronDown,
  Music4,
  CloudLightning,
  Sparkles,
  RefreshCcw,
  Menu,       
  X           
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- UTILS ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- 3D TILT CARD COMPONENT ---
function Card3D({ children, className }: { children: React.ReactNode, className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    if (window.innerWidth < 768) return; 

    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set(clientX - left - width / 2);
    y.set(clientY - top - height / 2);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-200, 200], [8, -8]);
  const rotateY = useTransform(mouseX, [-200, 200], [-8, 8]);

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn("relative group perspective-1000 w-full", className)}
    >
      <div style={{ transform: "translateZ(20px)" }} className="relative z-10 h-full">
        {children}
      </div>
      <div 
        className="absolute inset-0 z-0 bg-red-600/0 group-hover:bg-red-600/10 blur-3xl transition-colors duration-500 rounded-3xl" 
        style={{ transform: "translateZ(-30px) scale(0.9)" }}
      />
    </motion.div>
  );
}

// --- NAVBAR ---
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Why?", href: "#why-us" },
    { name: "How To", href: "#how-it-works" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 md:top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <div 
          className={cn(
            "pointer-events-auto w-full max-w-4xl rounded-full transition-all duration-500 ease-out border backdrop-blur-xl flex items-center justify-between py-2 md:py-3 px-4 md:px-6 shadow-2xl",
            isScrolled || mobileMenuOpen
              ? "bg-[#0a0a0a]/90 border-white/10 shadow-red-900/10" 
              : "bg-[#0a0a0a]/60 border-white/5"
          )}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="relative w-8 h-8 md:w-10 md:h-10 overflow-hidden group-hover:scale-105 transition-transform duration-500">
               <Image 
                 src="/logo.png" 
                 alt="Logo" 
                 width={40} 
                 height={40} 
                 className="object-contain w-full h-full"
               />
            </div>
            <span className="text-lg md:text-xl font-bold text-white tracking-tight hidden xs:block">
              YT<span className="text-red-500">MP3</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="px-6 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-3 md:hidden">
             <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-white bg-white/10 rounded-full hover:bg-white/20 transition-colors"
             >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
             </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl pt-32 px-6 md:hidden flex flex-col items-center gap-8"
          >
             {navLinks.map((link, idx) => (
               <motion.a
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-bold text-white hover:text-red-500"
               >
                 {link.name}
               </motion.a>
             ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// --- VISUALIZER BARS ---
const VisualizerBars = () => (
  <div className="flex items-end gap-1.5 h-16 mb-6">
    {[1, 2, 3, 4, 5].map((i) => (
      <motion.div
        key={i}
        className="w-3 bg-gradient-to-t from-red-600 to-red-400 rounded-t-full shadow-[0_0_15px_rgba(220,38,38,0.5)]"
        animate={{ height: ["20%", "100%", "40%", "80%", "20%"] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "mirror", delay: i * 0.1, ease: "easeInOut" }}
      />
    ))}
  </div>
);

// --- MAIN PAGE ---
export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [videoData, setVideoData] = useState<any>(null);
  const [error, setError] = useState("");

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setAnalyzing(true);
    setVideoData(null);
    setError("");

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Gagal menganalisa video");

      setVideoData(data);
    } catch (err: any) {
      setError(err.message);
      alert(err.message); 
    } finally {
      setAnalyzing(false);
    }
  };

  const handleConvert = async () => {
    if (!url) return;
    setLoading(true);
    setError("");

    try {
      // Force MP3
      const res = await fetch('/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, format: 'mp3' })
      });
      
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Gagal konversi");

      if (data.url) {
        // Construct filename for MP3
        const safeTitle = videoData?.title ? videoData.title.replace(/[^a-z0-9]/gi, '_').substring(0, 50) : 'audio';
        const filename = `${safeTitle}.mp3`;
        
        // Use proxy to force download
        const downloadUrl = `/api/download?url=${encodeURIComponent(data.url)}&filename=${encodeURIComponent(filename)}`;
        
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

      } else {
        throw new Error("Link download tidak ditemukan");
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat download");
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setVideoData(null);
    setUrl("");
  };

  return (
    <main className="min-h-screen bg-[#020202] text-white font-sans overflow-x-hidden relative selection:bg-red-500/30 selection:text-red-200">
      <Navbar />

      {/* === GLOBAL BACKGROUND (Fixed Grid) === */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:40px_40px] opacity-20" />
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] md:w-[1000px] h-[600px] bg-red-600/10 rounded-full blur-[100px] md:blur-[150px] animate-pulse" />
        <div className="absolute bottom-[20%] left-[10%] w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-red-900/10 rounded-full blur-[80px] md:blur-[100px]" />
      </div>

      <section className="relative min-h-[95vh] flex flex-col justify-center items-center px-4 md:px-6 pt-32 md:pt-40 pb-20 z-10">
        <AnimatePresence mode="wait">
          
          {/* STATE 1: HERO SECTION */}
          {!videoData ? (
            <motion.div
               key="hero-section"
               initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
               animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
               exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", transition: { duration: 0.5 } }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               className="relative text-center w-full max-w-5xl mx-auto"
            >
               {/* Version Badge */}
               <motion.div 
                 initial={{ scale: 0, rotate: -10 }}
                 animate={{ scale: 1, rotate: 0 }}
                 transition={{ delay: 0.3, type: "spring" }}
                 className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-1.5 rounded-full border border-red-500/30 bg-red-950/20 text-red-400 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-6 md:mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(220,38,38,0.2)]"
               >
                 <Sparkles className="w-3 h-3 text-red-500 animate-pulse" />
                 Premium Audio Quality
               </motion.div>
               
               {/* Title */}
               <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 md:mb-8 text-white relative z-10 leading-[0.9]">
                 Youtube <br className="hidden md:block" />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-400 to-red-600 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]">
                   TO MP3
                 </span>
               </h1>
               
               <p className="text-base sm:text-lg md:text-2xl text-gray-400 max-w-xl md:max-w-2xl mx-auto mb-10 md:mb-16 leading-relaxed font-light px-2">
                 The ultimate converter for music lovers. Extract <span className="text-white font-semibold">320kbps Audio</span> from any video directly in your browser.
               </p>

               {/* SEARCH CONSOLE */}
               <div className="w-full max-w-3xl mx-auto relative group perspective-1000 z-50 px-2 md:px-0">
                 {/* Glow Behind Input */}
                 <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-orange-600 to-red-600 rounded-full opacity-40 blur-2xl group-hover:opacity-60 transition duration-500 animate-tilt hidden md:block" />
                 
                 <form 
                   onSubmit={handleAnalyze} 
                   className="relative flex flex-col md:flex-row items-center bg-[#0a0a0a] border border-white/10 rounded-2xl md:rounded-full p-2 shadow-2xl transition-transform duration-300 group-hover:scale-[1.01]"
                 >
                   <div className="hidden md:block pl-6 text-gray-500">
                      <Link2 className="w-6 h-6 group-focus-within:text-red-500 transition-colors" />
                   </div>
                   
                   <input 
                     type="text" 
                     placeholder="Paste YouTube Link Here..." 
                     className="flex-1 bg-transparent border-none outline-none text-white px-4 py-4 md:px-6 placeholder:text-gray-600 font-medium text-base md:text-lg text-center md:text-left w-full h-full"
                     value={url}
                     onChange={(e) => setUrl(e.target.value)}
                     spellCheck={false}
                   />
                   
                   <button 
                     type="submit"
                     disabled={analyzing || !url}
                     className="w-full md:w-auto h-12 md:h-14 px-8 rounded-xl md:rounded-full bg-red-600 hover:bg-red-500 text-white font-bold transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.4)] active:scale-95"
                   >
                     {analyzing ? (
                       <> <Loader2 className="w-5 h-5 animate-spin" /> <span className="hidden md:inline">Processing</span> </>
                     ) : (
                       <> <span className="hidden md:inline">Convert</span> <ArrowRight className="w-5 h-5" /> </>
                     )}
                   </button>
                 </form>
               </div>
            </motion.div>
          ) : (
            
            /* STATE 2: RESULT SECTION */
            <motion.div 
               key="result-section"
               initial={{ opacity: 0, y: 100, scale: 0.9 }}
               animate={{ opacity: 1, y: 0, scale: 1 }}
               exit={{ opacity: 0, y: 100, scale: 0.9, transition: { duration: 0.3 } }}
               transition={{ type: "spring", bounce: 0.4 }}
               className="bg-black/60 backdrop-blur-2xl border border-white/10 rounded-3xl md:rounded-[2.5rem] p-6 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group w-full max-w-5xl mx-4"
            >
               {/* Decoration Lines */}
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50" />
               
               <div className="flex flex-col md:flex-row gap-8 lg:gap-12 relative z-10 items-start">
                 {/* Image Area */}
                 <div className="w-full md:w-[320px] shrink-0">
                    <Card3D className="w-full">
                       <div className="aspect-square rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl relative group border border-white/10 w-full">
                         <img 
                           src={videoData.thumbnails[0]?.url} 
                           alt={videoData.title} 
                           className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100" 
                         />
                         <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-all">
                             <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600/90 rounded-full flex items-center justify-center shadow-[0_0_30px_red] scale-90 group-hover:scale-110 transition-all duration-300">
                                <Music4 className="w-6 h-6 md:w-8 md:h-8 text-white fill-current ml-1" />
                             </div>
                         </div>
                       </div>
                    </Card3D>
                 </div>

                 {/* Info Area */}
                 <div className="flex-1 flex flex-col w-full justify-center">
                   <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-4 mb-4">
                       <span className="self-start bg-red-500/10 text-red-400 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold border border-red-500/20 tracking-wider">AUDIO READY</span>
                       
                       <button 
                          onClick={handleReset}
                          className="text-gray-500 hover:text-white flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors self-end md:self-auto"
                       >
                          <RefreshCcw className="w-3 h-3" />
                          Convert Another
                       </button>
                   </div>

                   <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight mb-4 line-clamp-2">
                     {videoData.title}
                   </h2>
                   
                   <div className="flex flex-wrap items-center gap-4 md:gap-6 text-gray-400 mb-8 border-b border-white/5 pb-8">
                      <span className="flex items-center gap-2 text-sm"><MousePointer2 className="w-4 h-4 text-red-500" /> {videoData.author}</span>
                   </div>

                   <div className="flex flex-col gap-3">
                     <button 
                       onClick={handleConvert}
                       disabled={loading}
                       className="group relative w-full overflow-hidden bg-red-600 hover:bg-red-500 text-white font-black py-5 rounded-xl md:rounded-2xl shadow-[0_0_40px_rgba(220,38,38,0.3)] active:scale-[0.99] transition-all flex items-center justify-center gap-3 text-lg border border-red-400/20"
                     >
                       <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_1.5s_infinite]" />
                       {loading ? (
                         <> <Loader2 className="w-5 h-5 md:w-6 md:h-6 animate-spin" /> DOWNLOADING... </>
                       ) : (
                         <> <Download className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-y-1 transition-transform" /> DOWNLOAD MP3 </>
                       )}
                     </button>
                     <p className="text-center text-xs text-gray-500 mt-2 font-medium">Highest Quality Available (up to 320kbps)</p>
                   </div>
                 </div>
               </div>
            </motion.div>
          )}

        </AnimatePresence>
      </section>

      {/* --- WHY CHOOSE US (Cinematic Bento) --- */}
      <section id="why-us" className="py-20 md:py-32 px-4 md:px-6 relative z-10">
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight">
              Why <span className="text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-900"><br className="md:hidden" />Youtube MP3</span>?
            </h2>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto px-4">
              Pure audio focus. We extract exactly what you want to hear, without the video bloat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6 auto-rows-[minmax(250px,auto)] md:auto-rows-[minmax(280px,auto)]">
            
            {/* Card 1: Features */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8 p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] bg-zinc-900/40 border border-white/5 backdrop-blur-xl hover:border-red-500/40 hover:bg-zinc-900/60 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10 flex flex-col h-full justify-between gap-8 md:gap-0">
                <div>
                     <div className="w-12 h-12 md:w-16 md:h-16 bg-red-600/10 rounded-2xl flex items-center justify-center mb-6 md:mb-8 border border-red-500/20 group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-500">
                       <FileAudio className="w-6 h-6 md:w-8 md:h-8 text-red-500 group-hover:text-white transition-colors" />
                     </div>
                     <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">Dedicated Audio Engine</h3>
                     <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl">
                       Our converter is optimized for audio extraction only. We don't just "rip" the audio; we process it to ensure the <span className="text-white font-semibold">highest possible fidelity</span> and correct metadata.
                     </p>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Audio Vis */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-4 p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] bg-zinc-900/40 border border-white/5 backdrop-blur-xl hover:border-red-500/40 transition-all duration-500 flex flex-col justify-end group overflow-hidden relative min-h-[250px]"
            >
              <div className="absolute top-0 right-0 p-32 bg-red-600/10 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none" />
              <Music4 className="w-8 h-8 md:w-10 md:h-10 text-red-500 mb-auto" />
              <VisualizerBars />
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">High Bitrate</h3>
              <p className="text-sm md:text-base text-gray-400">Guaranteed <span className="text-red-500 font-bold">128-320kbps</span> quality for every track.</p>
            </motion.div>

             {/* Card 3: Cloud */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-12 p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] bg-zinc-900/40 border border-white/5 backdrop-blur-xl hover:border-red-500/40 transition-all duration-500 group flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
            >
              <div className="flex-1 relative z-10 order-2 md:order-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center justify-center md:justify-start gap-3">
                  <CloudLightning className="w-6 h-6 md:w-8 md:h-8 text-red-500" />
                  Instant Cloud Processing
                </h3>
                <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                   <span className="text-white">Music without waiting.</span> Our servers handle the conversion in milliseconds, saving your data and battery life.
                </p>
              </div>
              
              <div className="relative order-1 md:order-2 w-full md:w-1/3 h-32 md:h-full flex items-center justify-center">
                 <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-red-500/20 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                    <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border border-red-500/40 flex items-center justify-center animate-[spin_5s_linear_infinite_reverse]">
                       <div className="w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full shadow-[0_0_20px_red]" />
                    </div>
                 </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 md:py-24 px-4 md:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-12 md:mb-16">
             <h2 className="text-3xl md:text-4xl font-black text-white mb-4">How To Download MP3</h2>
             <p className="text-gray-500">From YouTube to Music Player in seconds.</p>
           </div>
           <div className="grid md:grid-cols-3 gap-6 md:gap-8">
             {[
               { i: "01", title: "Copy Link", desc: "Copy the YouTube video or music URL." },
               { i: "02", title: "Paste Here", desc: "Paste it above and hit Convert." },
               { i: "03", title: "Get Audio", desc: "The MP3 will start downloading immediately." }
             ].map((step, idx) => (
               <div key={idx} className="p-6 md:p-8 rounded-3xl bg-[#0a0a0a]/60 backdrop-blur-md border border-white/5 hover:border-red-600/50 hover:-translate-y-2 transition-all duration-300 text-center group">
                  <div className="text-4xl md:text-5xl font-black text-white/5 mb-4 md:mb-6 group-hover:text-red-600/20 transition-colors">{step.i}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm md:text-base">{step.desc}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 md:py-24 px-4 md:px-6 relative z-10 mb-20">
        <div className="max-w-3xl mx-auto">
           <h2 className="text-3xl md:text-4xl font-black text-white mb-12 text-center">FAQ</h2>
           <div className="flex flex-col gap-4">
             {[
               { q: "Is it really free?", a: "Yes, 100% free. Enjoy unlimited MP3 downloads." },
               { q: "Can I download from iPhones?", a: "Yes. Use Safari and the MP3 will save to your files." },
               { q: "What is the sound quality?", a: "We convert at the highest bitrate provided by the source, up to 320kbps." }
             ].map((item, idx) => (
               <details key={idx} className="group border border-white/10 rounded-2xl bg-[#0a0a0a]/80 backdrop-blur-md overflow-hidden transition-all duration-300 open:bg-zinc-900/80 open:border-red-500/30">
                 <summary className="flex items-center justify-between p-5 md:p-6 cursor-pointer list-none">
                    <h3 className="font-bold text-white text-base md:text-lg group-hover:text-red-400 transition-colors">{item.q}</h3>
                    <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" />
                 </summary>
                 <div className="px-6 pb-6 pt-0 text-sm md:text-base text-gray-400 border-t border-white/5 mt-2 mx-6">
                    <div className="pt-4">{item.a}</div>
                 </div>
               </details>
             ))}
           </div>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className="relative z-50 bg-black border-t border-white/10 pt-20 pb-12 px-6">
         {/* Top Horizon Glow Effect */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-red-600 shadow-[0_0_100px_rgba(220,38,38,1)]" />
         
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex flex-col gap-4 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3">
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden">
                     <Image src="/logo.png" alt="Logo" width={32} height={32} className="object-contain" />
                  </div>
                  <span className="font-bold text-white text-2xl tracking-tight">YT<span className="text-red-600">MP3</span></span>
              </div>
           </div>

           <div className="flex gap-8 text-sm font-semibold text-gray-500">
             <a href="#" className="hover:text-white transition-colors">Terms</a>
             <a href="#" className="hover:text-white transition-colors">Privacy</a>
             <a href="#" className="hover:text-white transition-colors">Contact</a>
           </div>

           <div className="text-sm text-gray-700 font-medium">
             © 2025 YTMP3 Inc.
           </div>
         </div>
      </footer>
    </main>
  );
}