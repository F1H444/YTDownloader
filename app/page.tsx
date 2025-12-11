"use client";

import React, { useState, useEffect } from "react";
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform,
  useMotionTemplate,
  useMotionValue
} from "framer-motion";
import { 
  Download, 
  Music, 
  Video, 
  Youtube, 
  Loader2, 
  ArrowRight, 
  Shield, 
  Zap, 
  Sparkles,
  Link2,
  AlertCircle,
  Play,
  CheckCircle2,
  Globe,
  Smartphone,
  HelpCircle,
  Menu,
  X
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- CONSTANTS ---
const FAQ = [
  {
    q: "Is this YouTube Downloader free?",
    a: "Yes, our tool is 100% free to use. You can download as many videos as you want without any hidden fees or subscription requirements."
  },
  {
    q: "What formats can I download?",
    a: "We support high-quality MP4 for video and MP3 for audio. You can choose your preferred format before downloading."
  },
  {
    q: "Is it safe to use?",
    a: "Absolutely. We do not store any user data or downloaded files. The conversion happens in real-time and is secure."
  },
  {
    q: "Does it work on mobile?",
    a: "Yes! Our website is fully responsive and works perfectly on iPhone, Android, tablets, and desktop computers."
  }
];

const FEATURES = [
  {
    icon: Zap,
    title: "Instant Processing",
    description: "Our engineered core processes video data in milliseconds.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "No logs, no tracking. Your downloads are completely anonymous.",
  },
  {
    icon: Sparkles,
    title: "Lossless Quality",
    description: "Preserve the original audio fidelity and video bitrate.",
  },
  {
    icon: Globe,
    title: "Universal Support",
    description: "Works with all standard YouTube videos, Shorts, and Live replays."
  },
  {
    icon: Smartphone,
    title: "Mobile Ready",
    description: "Optimized experience for touch devices and small screens."
  },
  {
    icon: CheckCircle2,
    title: "No Registration",
    description: "Just paste your link and go. No account needed."
  }
];

// --- COMPONENTS ---

// 1. Background Mesh
const BackgroundMesh = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#050505]">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1200px] opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[120px] mix-blend-screen animate-blob" />
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-2000" />
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-4000" />
    </div>
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
  </div>
);

// 2. Spotlight Card
const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "group relative border border-white/5 bg-white/[0.02] overflow-hidden rounded-3xl",
        className
      )}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.06),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

// 3. Navbar (Responsive)
const Navbar = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => setIsScrolled(latest > 50));
  }, [scrollY]);

  // Close mobile menu when scrolling significantly
  useEffect(() => {
    if(isMobileMenuOpen && isScrolled) setIsMobileMenuOpen(false);
  }, [isScrolled]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center p-4 md:pt-6 pointer-events-none">
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={cn(
          "pointer-events-auto relative flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 border border-transparent z-50",
          (isScrolled || isMobileMenuOpen)
            ? "bg-[#0A0A0A]/80 backdrop-blur-xl border-white/10 shadow-2xl w-full max-w-2xl" 
            : "w-full max-w-7xl bg-transparent"
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-red-600 to-rose-900 shadow-lg shadow-red-900/20">
            <Youtube className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            YTDownloader
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {["Features", "FAQ", "Guide"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-white/50 hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </div>
        
        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
            {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
            ) : (
                <Menu className="w-5 h-5 text-white" />
            )}
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
           <motion.div
             initial={{ opacity: 0, y: -20, scale: 0.95 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, y: -20, scale: 0.95 }}
             transition={{ duration: 0.2 }}
             className="pointer-events-auto absolute top-[70px] w-[calc(100%-2rem)] max-w-2xl bg-[#0A0A0A]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-2xl md:hidden overflow-hidden z-40"
           >
              <div className="flex flex-col gap-2">
                 {["Features", "FAQ", "Guide"].map((item) => (
                    <a 
                      key={item} 
                      href={`#${item.toLowerCase()}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 transition-colors group"
                    >
                       <span className="font-medium text-white">{item}</span>
                       <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                    </a>
                 ))}
              </div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// 4. Main Page
export default function Home() {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState<"mp3" | "mp4">("mp4");
  const [status, setStatus] = useState<"idle" | "fetching" | "ready" | "converting" | "finished" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [videoData, setVideoData] = useState<any>(null);
  const [progress, setProgress] = useState(0);

  // Simulation MOCK DATA for Demo (Since /api/download is not real)
  const MOCK_DATA = {
    title: "Lofi Hip Hop Radio - Beats to Relax/Study to",
    author: "Lofi Girl",
    viewCount: "54230000",
    thumbnails: [{ url: "https://i.ytimg.com/vi/jfKfPfyJRdk/maxresdefault.jpg" }],
    formats: { mp4: "#", mp3: "#" }
  };

  const handleProcess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    
    // Basic YouTube regex or includes check
    if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
      setStatus("error");
      setErrorMsg("Please enter a valid YouTube URL (e.g., youtube.com/watch?v=...)");
      return;
    }

    setStatus("fetching");
    setErrorMsg("");
    setVideoData(null);

    // SIMULATED FETCH for Demo purposes
    setTimeout(() => {
        setVideoData(MOCK_DATA);
        setStatus("ready");
    }, 1500);

    /* Real API Call Implementation:
    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch video");
      setVideoData(data);
      setStatus("ready");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong.");
    }
    */
  };

  const handleConvert = () => {
    setStatus("converting");
    setProgress(0);

    // Simulate conversion progress for UX
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus("finished");
          return 100;
        }
        return prev + Math.random() * 20; 
      });
    }, 200);
  };

  const handleDownloadFile = () => {
      if (!videoData) return;
      alert(`Downloading ${format.toUpperCase()} file... (This is a demo)`);
  };

  const handleReset = () => {
    setStatus("idle");
    setUrl("");
    setProgress(0);
    setVideoData(null);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-red-500/20 text-white flex flex-col">
      <BackgroundMesh />
      <Navbar />

      <main className="relative pt-32 md:pt-40 px-6 flex-grow">
        {/* HERO SECTION */}
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-md shadow-xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-xs font-medium text-neutral-300 tracking-wide uppercase">System Operational</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40">
              Download <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600">YouTube Videos.</span>
            </h1>
            
            <p className="text-base md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed px-4">
              Fastest converter with 100% functionality. 
              Supports MP4, MP3, and more.
            </p>
          </motion.div>

          {/* MAIN INTERFACE CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-full max-w-3xl z-10"
          >
            <div className="relative group rounded-[2rem] p-1 bg-gradient-to-b from-white/10 to-transparent">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-red-500/20 blur-[80px] -z-10 group-hover:bg-red-500/30 transition-all duration-700" />
              
              <div className="bg-[#0A0A0A]/90 backdrop-blur-2xl rounded-[1.8rem] border border-white/5 overflow-hidden shadow-2xl">
                
                {/* IDLE / INPUT */}
                <AnimatePresence mode="wait">
                  {(status === "idle" || status === "error") && (
                    <motion.form 
                      key="input-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      onSubmit={handleProcess} 
                      className="p-3 md:p-4 flex flex-col md:flex-row gap-3 relative"
                    >
                      <div className="flex-1 relative group/input">
                         <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                            <Link2 className="w-5 h-5 text-neutral-500 group-focus-within/input:text-red-500 transition-colors" />
                         </div>
                         <input
                           type="text"
                           placeholder="Paste YouTube URL..."
                           value={url}
                           onChange={(e) => setUrl(e.target.value)}
                           className="w-full pl-14 pr-4 py-4 md:py-5 bg-white/[0.03] border border-white/5 rounded-2xl text-base md:text-lg text-white placeholder:text-neutral-600 focus:outline-none focus:bg-white/[0.05] focus:border-white/10 transition-all"
                         />
                      </div>
                      <button 
                        type="submit"
                        disabled={!url}
                        className="px-8 py-4 md:py-5 rounded-2xl bg-white text-black font-semibold text-base md:text-lg hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group/btn"
                      >
                         <span>Analyze</span>
                         <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>

                      {status === "error" && (
                         <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -bottom-12 left-4 right-4 md:right-auto md:w-auto flex items-center justify-center md:justify-start gap-2 text-red-400 text-sm font-medium bg-red-900/10 p-2 rounded-lg md:bg-transparent md:p-0"
                         >
                            <AlertCircle className="w-4 h-4 shrink-0" /> {errorMsg}
                         </motion.div>
                      )}
                    </motion.form>
                  )}

                  {/* FETCHING */}
                  {status === "fetching" && (
                     <motion.div
                       key="loader"
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       exit={{ opacity: 0 }}
                       className="h-[120px] flex flex-col items-center justify-center gap-4"
                     >
                        <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
                        <span className="text-neutral-500 text-sm animate-pulse">Contacting YouTube Servers...</span>
                     </motion.div>
                  )}

                  {/* RESULT */}
                  {(status === "ready" || status === "converting" || status === "finished") && videoData && (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-6 md:p-8"
                    >
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Thumbnail */}
                        <div className="relative group shrink-0 w-full md:w-64 aspect-video rounded-xl overflow-hidden shadow-lg border border-white/10">
                          <img 
                            src={videoData.thumbnails[0].url} 
                            alt="thumb" 
                            className="w-full h-full object-cover" 
                          />
                        </div>

                        {/* Info & Controls */}
                        <div className="flex-1 flex flex-col justify-between min-w-0 space-y-4">
                           <div>
                              <h3 className="text-xl font-bold text-white truncate leading-tight">{videoData.title}</h3>
                              <p className="text-neutral-500 text-sm mt-1 flex items-center gap-2">
                                {videoData.author} • {parseInt(videoData.viewCount).toLocaleString()} Views
                              </p>
                           </div>

                           {status === "ready" && (
                             <div className="flex gap-2">
                               {["mp4", "mp3"].map((fmt) => (
                                 <button
                                   key={fmt}
                                   onClick={() => setFormat(fmt as "mp4" | "mp3")}
                                   className={cn(
                                      "flex-1 py-3 px-4 rounded-xl text-sm font-medium border transition-all flex items-center justify-center gap-2",
                                      format === fmt 
                                        ? "bg-white text-black border-white shadow-lg shadow-white/10 scale-[1.02]" 
                                        : "bg-transparent text-neutral-400 border-white/10 hover:border-white/30 hover:text-white"
                                   )}
                                 >
                                    {fmt === "mp4" ? <Video className="w-4 h-4" /> : <Music className="w-4 h-4" />}
                                    {fmt.toUpperCase()}
                                 </button>
                               ))}
                             </div>
                           )}

                           {status === "converting" && (
                              <div className="space-y-2">
                                 <div className="flex justify-between text-xs font-medium text-neutral-400">
                                    <span>Processing...</span>
                                    <span>{Math.round(progress)}%</span>
                                 </div>
                                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                      className="h-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                                      initial={{ width: 0 }}
                                      animate={{ width: `${progress}%` }}
                                      transition={{ type: "spring", stiffness: 50 }}
                                    />
                                 </div>
                              </div>
                           )}

                           {status === "finished" && (
                              <motion.button 
                                onClick={handleDownloadFile}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="w-full py-4 rounded-xl bg-green-500 hover:bg-green-400 text-black font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-green-500/20"
                              >
                                 <Download className="w-5 h-5" /> Download {format.toUpperCase()}
                              </motion.button>
                           )}
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center">
                         <button onClick={handleReset} className="text-sm text-neutral-500 hover:text-white transition-colors">
                            Convert another
                         </button>
                         {status === "ready" && (
                           <button 
                             onClick={handleConvert}
                             className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-red-900/20"
                           >
                              Start Conversion
                           </button>
                         )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* EXTRA INFO */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-sm text-neutral-500"
          >
            By using this tool, you accept our Terms of Service.
          </motion.p>
        </div>

        {/* FEATURES */}
        <div id="features" className="max-w-7xl mx-auto mt-32 md:mt-40">
           <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Why use our downloader?</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((feature, i) => (
                 <motion.div
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                 >
                   <SpotlightCard className="p-6 md:p-8 h-full flex flex-col items-start hover:border-white/10 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/5">
                         <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                      <p className="text-neutral-400 leading-relaxed text-sm">
                        {feature.description}
                      </p>
                   </SpotlightCard>
                 </motion.div>
              ))}
           </div>
        </div>

        {/* FAQ SECTION */}
        <div id="faq" className="max-w-3xl mx-auto mt-32 md:mt-40">
           <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-white">Frequently Asked Questions</h2>
              <p className="text-neutral-500 mt-2 text-sm md:text-base">Everything you need to know about the service.</p>
           </div>
           
           <div className="space-y-4">
              {FAQ.map((item, i) => (
                <div key={i} className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-colors">
                   <h3 className="text-base md:text-lg font-semibold text-white mb-2 flex items-center gap-3">
                     <HelpCircle className="w-5 h-5 text-neutral-600 shrink-0" />
                     {item.q}
                   </h3>
                   <p className="text-neutral-400 text-sm leading-relaxed pl-8">
                     {item.a}
                   </p>
                </div>
              ))}
           </div>
        </div>

        {/* GUIDE / STEPS */}
        <div id="guide" className="max-w-7xl mx-auto mt-32 md:mt-40 mb-20">
            <div className="rounded-[2.5rem] bg-[#0A0A0A] border border-white/5 p-8 md:p-16 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 to-transparent pointer-events-none" />
                
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-12 relative z-10">Start Downloading Now</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10">
                   {[
                      { step: "01", title: "Copy & Paste", desc: "Get the link from YouTube" },
                      { step: "02", title: "Select Format", desc: "Choose MP3 or MP4" },
                      { step: "03", title: "Download", desc: "Enjoy your content" }
                   ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center">
                         <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-xl font-bold font-mono shadow-lg shadow-white/5">
                            {item.step}
                         </div>
                         <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                         <p className="text-neutral-500 text-sm">{item.desc}</p>
                      </div>
                   ))}
                </div>
            </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-white/5 bg-black py-8 relative overflow-hidden mt-auto">
         {/* Top Accent Line */}
         <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent opacity-50" />
         
         <div className="max-w-7xl mx-auto px-6 h-full">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 h-full">
               
               {/* Copyright */}
               <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
                  <div className="p-1.5 rounded-lg bg-white/5">
                     <Youtube className="w-4 h-4 text-red-500" />
                  </div>
                  <span className="text-sm font-medium text-neutral-400">
                    &copy; 2025 YTDownloader. All rights reserved.
                  </span>
               </div>

               {/* CTA */}
               <button 
                 onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                 className="group flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all"
               >
                  <span className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors">
                    Download Now
                  </span>
                  <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-red-400 group-hover:translate-x-0.5 transition-all" />
               </button>

            </div>
         </div>
         
         {/* Bottom Glow */}
         <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-[100px] bg-red-600/20 blur-[80px] pointer-events-none" />
      </footer>
    </div>
  );
}