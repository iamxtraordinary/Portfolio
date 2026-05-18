import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView, AnimatePresence, useMotionTemplate } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import AsciiCanvas from './AsciiCanvas';
import { EtheralShadow } from './ui/etheral-shadow';

const projects = [
  { id: 1, title: "Workvite", category: "Software Engineering", image: "/workvite.png", video: "/workvideo.MOV", link: "https://workvite.vercel.app" },
  { id: 2, title: "Dating App", category: "Mobile Development", image: "https://picsum.photos/seed/dat99/1200/800", video: undefined, link: "#" },
  { id: 3, title: "Ride-Hailing App", category: "Full Stack", image: "https://picsum.photos/seed/rid99/1200/800", video: undefined, link: "#" },
  { id: 4, title: "Inmotion Hub", category: "Internship Project", image: "https://picsum.photos/seed/inm99/1200/800", video: undefined, link: "#" },
];

/* ─── Custom Cursor ─── */
const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { damping: 20, stiffness: 200 });
  const springY = useSpring(cursorY, { damping: 20, stiffness: 200 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      setIsHovering(!!(e.target as HTMLElement).closest('a, button, .interactive'));
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
    >
      <motion.div
        animate={{ 
          width: isHovering ? 64 : 12,
          height: isHovering ? 64 : 12,
          borderWidth: isHovering ? 2 : 2,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="rounded-full border-[var(--accent)] flex items-center justify-center"
        style={{ borderStyle: 'solid', borderColor: 'var(--accent)' }}
      >
        {isHovering && (
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="text-[7px] font-bold text-[var(--accent)] uppercase tracking-wider"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            View
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
};

/* ─── Magnetic Button ─── */
const MagneticButton = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.3);
    y.set((e.clientY - cy) * 0.3);
  };

  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className="interactive mt-16 inline-flex items-center gap-4 text-xl md:text-2xl font-light border-b-2 border-current pb-3 hover:gap-8 transition-[gap] duration-300 group"
    >
      {children}
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </motion.button>
  );
};

/* ─── Peel Card ─── */
const PeelCard = ({ project, index, totalCards }: { project: typeof projects[0]; index: number; totalCards: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, -5]);
  const brightness = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <div
      ref={cardRef}
      className="h-screen"
      style={{ zIndex: totalCards - index }}
    >
      <motion.div
        style={{
          scale,
          opacity,
          rotateX,
          filter: useTransform(brightness, v => `brightness(${v})`),
          transformPerspective: 1200,
          transformOrigin: "center top",
        }}
        className="sticky top-0 h-screen w-full flex items-center justify-center px-6 md:px-16"
      >
        <div className="relative w-full max-w-7xl h-[75vh] group interactive">
          {/* Massive Number */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] md:text-[18rem] font-bold leading-none pointer-events-none select-none z-20 text-[var(--bg)] transition-opacity duration-500 group-hover:opacity-0"
            style={{ fontFamily: 'var(--font-display)', WebkitTextStroke: '2px var(--border)' }}
          >
            {String(index + 1).padStart(2, '0')}
          </div>

          {/* Card */}
          <div 
            className="relative h-full w-full overflow-hidden rounded-[2rem] md:rounded-[2.5rem] transition-shadow duration-500 group-hover:shadow-[0_25px_80px_-10px_rgba(0,0,0,0.5)] cursor-pointer"
            onClick={() => setIsExpanded(true)}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              referrerPolicy="no-referrer"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

            {/* Hover glow */}
            <div className="absolute inset-0 bg-[var(--accent)] opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 mix-blend-overlay" />

            {/* Info */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-3 group-hover:text-[var(--accent)] transition-colors duration-300" style={{ fontFamily: 'var(--font-mono)' }}>
                {project.category}
              </p>
              <h4 className="text-4xl md:text-6xl text-white font-bold uppercase tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                {project.title}
              </h4>
              <div className="flex items-center gap-2 mt-5 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                <span className="text-[10px] uppercase tracking-widest text-white/70" style={{ fontFamily: 'var(--font-mono)' }}>View Project</span>
                <ArrowRight className="w-4 h-4 text-[var(--accent)]" />
              </div>
            </div>
          </div>

          {/* Card index indicator */}
          <div className="absolute top-8 right-8 z-20 text-[10px] text-white/40 uppercase tracking-widest transition-opacity duration-500 group-hover:opacity-0" style={{ fontFamily: 'var(--font-mono)' }}>
            {String(index + 1).padStart(2, '0')} / {String(totalCards).padStart(2, '0')}
          </div>
        </div>

        {/* Expanded Modal */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[300] flex items-center justify-center p-6 md:p-12 bg-black/80 backdrop-blur-xl interactive"
              onClick={() => setIsExpanded(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-6xl h-[80vh] bg-[var(--bg)] rounded-[2rem] overflow-hidden flex flex-col shadow-[0_30px_100px_-20px_rgba(0,0,0,1)] cursor-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 md:p-8 border-b border-[var(--border)] z-10 bg-[var(--bg)]/80 backdrop-blur-md absolute top-0 left-0 right-0">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-[var(--muted)] mb-1" style={{ fontFamily: 'var(--font-mono)' }}>{project.category}</p>
                    <h3 className="text-2xl font-bold uppercase tracking-tight text-[var(--text)]" style={{ fontFamily: 'var(--font-display)' }}>{project.title}</h3>
                  </div>
                  <div className="flex items-center gap-4">
                    {project.link && project.link !== "#" && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-2 bg-[var(--accent)] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        Visit Site <ArrowRight className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border)] text-[var(--text)] hover:bg-[var(--accent)] hover:text-white transition-colors"
                    >
                      <span className="sr-only">Close</span>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                </div>

                {/* Media Content */}
                <div className="w-full h-full pt-[88px] bg-black">
                  {project.video ? (
                    <video
                      src={project.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

/* ─── Scramble Text ─── */
const ScrambleText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState("");
  const chars = "!<>-_\\\\/[]{}—=+*^?#________";
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;
    
    timeout = setTimeout(() => {
      let iteration = 0;
      interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) return text[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );
        
        if (iteration >= text.length) {
          clearInterval(interval);
        }
        iteration += 1 / 3;
      }, 30);
    }, delay);
    
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay]);

  return <span>{displayText || "\u00A0"}</span>;
};

/* ─── Removed ViewfinderHUD ─── */

/* ─── Main Component ─── */
export default function ConceptCinematic({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Scene transforms — cinematic parallax layers
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12, 0.25], [1, 1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.25], [1, 0.92]);
  const heroBlur = useTransform(scrollYProgress, [0.1, 0.25], [0, 12]);
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -120]);
  const taglineY = useTransform(scrollYProgress, [0, 0.25], [0, -60]);
  const taglineOpacity = useTransform(scrollYProgress, [0, 0.08, 0.2], [1, 1, 0]);
  const spotlightScale = useTransform(scrollYProgress, [0, 0.25], [1, 1.5]);
  const spotlightOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 0.7, 0]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  // Counter
  const scrollPercent = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const counterSpring = useSpring(scrollPercent, { stiffness: 100, damping: 30 });
  const formattedCounter = useTransform(counterSpring, (v) => `[ ${Math.round(v).toString().padStart(2, '0')}% ]`);

  const heroName = "Emmanuel\n Okaka";

  const [photosExpanded, setPhotosExpanded] = useState(false);

  return (
    <motion.div 
      ref={containerRef}
      className="relative cursor-none overflow-x-hidden bg-transparent text-[var(--text)]"
    >
      <CustomCursor />

      {/* Grain Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03]"
        style={{ filter: 'url(#grain)', width: '100%', height: '100%' }}
      />

      {/* Global Etheral Shadow Background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <EtheralShadow 
           color="var(--accent)" 
           animation={{ scale: 100, speed: 90 }}
           noise={{ opacity: 1, scale: 1.2 }}
           sizing="fill"
        />
      </div>

      {/* ─── Scene 1: Hero ─── */}
      <section className="h-screen flex flex-col items-center justify-center sticky top-0 overflow-hidden bg-transparent">
        
        {/* Radial spotlight — scales up on scroll for dramatic exit */}
        <motion.div 
          style={{ scale: spotlightScale, opacity: spotlightOpacity }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,var(--accent-glow),transparent_70%)] pointer-events-none z-0" 
        />
        
        {/* Telemetry Micro-copy */}
        <div className="absolute top-8 left-8 text-[10px] text-[#71717A] tracking-[0.3em] uppercase z-10" style={{ fontFamily: 'var(--font-mono)' }}>
          <ScrambleText text="SYSTEM ONLINE // V4.2" delay={500} />
        </div>
        <div className="absolute top-8 right-8 text-[10px] text-[#71717A] tracking-[0.3em] uppercase z-10 text-right hidden md:block" style={{ fontFamily: 'var(--font-mono)' }}>
          [01] CREATIVE_DEVELOPMENT<br />
          [02] INTERACTIVE_SYSTEMS
        </div>
        
        {/* Name block — parallax drift upward */}
        <motion.div 
          style={{ 
            opacity: heroOpacity, 
            scale: heroScale,
            y: heroY,
            filter: useTransform(heroBlur, v => `blur(${v}px)`)
          }}
          className="text-center px-4 relative z-10"
        >
          {/* Staggered letter reveal */}
          <div className="relative">
            <h1 className="text-[20vw] font-bold tracking-tighter uppercase leading-[0.8] text-[var(--text)] relative" style={{ fontFamily: 'var(--font-display)' }}>
              {heroName.split('').map((letter, i) => {
                if (letter === '\n') return <br key={i} />;
                return (
                  <span key={i} className="inline-flex overflow-hidden" style={{ verticalAlign: 'bottom' }}>
                    <motion.span
                      initial={{ y: "110%", rotate: 12, opacity: 0 }}
                      animate={{ y: "0%", rotate: 0, opacity: 1 }}
                      transition={{ 
                        delay: 0.1 + i * 0.035,
                        duration: 0.8,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      className="inline-block origin-bottom-left"
                    >
                      {letter === ' ' ? '\u00A0' : letter}
                    </motion.span>
                  </span>
                );
              })}
            </h1>
            
            {/* Floating Badge */}
            <motion.div 
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: -3 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 20 }}
              className="absolute -top-4 right-[5%] md:-top-8 md:right-[15%] z-20"
            >
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 4, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="bg-[var(--bg)]/80 backdrop-blur-md border border-[var(--border)] shadow-xl rounded-full px-4 py-2 flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] md:text-xs font-semibold tracking-widest uppercase text-[var(--text)]" style={{ fontFamily: 'var(--font-mono)' }}>Available for work</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Tagline — slower parallax for depth separation */}
        <motion.div
          style={{ y: taglineY, opacity: taglineOpacity }}
          className="relative z-10 text-center"
        >
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-8 text-xs md:text-sm uppercase tracking-[0.4em] text-[#71717A]"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <ScrambleText text="Mobile & Backend Engineer" delay={1200} />
          </motion.p>

          {/* Accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-[2px] bg-[var(--accent)] mx-auto mt-6 origin-center"
          />
        </motion.div>

        {/* Scroll Progress Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="fixed bottom-8 right-8 md:bottom-12 md:right-12 z-[100] mix-blend-difference pointer-events-none"
        >
          <motion.div 
            className="text-xs md:text-sm font-bold tracking-[0.3em] text-[var(--accent)]" 
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {formattedCounter}
          </motion.div>
        </motion.div>
      </section>

      {/* ─── About Me Section ─── */}
      <section className="relative z-10 bg-transparent py-24 md:py-32 px-8 md:px-16 lg:px-24 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-20">
          {/* Left column — Text & Stats */}
          <div className="flex-1 space-y-8">
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3"
            >
              <h2 className="text-5xl md:text-6xl font-bold uppercase tracking-tight text-[var(--text)]" style={{ fontFamily: 'var(--font-display)' }}>
                Hello there
              </h2>
              <div className="w-3 h-3 rounded-full bg-[var(--accent)] mt-2 animate-pulse" />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-80px" }}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-base md:text-lg leading-relaxed text-[var(--text)]/70 max-w-lg"
              style={{ fontFamily: 'var(--font-body, var(--font-mono))' }}
            >
              I'm Emmanuel, a software developer passionate about crafting meaningful and impactful services. Let's work together.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-80px" }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-10 md:gap-14 pt-4"
            >
              {[
                { value: "2+", label: "Years of Experience" },
                { value: "4", label: "Completed Projects" },
                { value: "5+", label: "Clients Worldwide" },
              ].map((stat, i) => (
                <div key={stat.label} className="space-y-1">
                  <span className="text-4xl md:text-5xl font-bold text-[var(--accent)]" style={{ fontFamily: 'var(--font-display)' }}>
                    {stat.value}
                  </span>
                  <p className="text-[10px] md:text-xs uppercase tracking-widest text-[var(--text)]/50" style={{ fontFamily: 'var(--font-mono)' }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* My Story button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-80px" }}
              transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="pt-4 interactive"
            >
              <button
                onClick={() => onNavigate?.('about')}
                className="border-2 border-[var(--accent)] text-[var(--accent)] px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[var(--accent)] hover:text-white hover:scale-105 transition-all duration-300"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                About Me
              </button>
            </motion.div>
          </div>

          {/* Right column — Interactive Photo Stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 4 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
            viewport={{ margin: "-80px" }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex-shrink-0 w-[280px] md:w-[340px] lg:w-[380px]"
          >
            {/* Main photo — click to expand */}
            <div
              onClick={() => setPhotosExpanded(!photosExpanded)}
              className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] shadow-2xl cursor-pointer transition-all duration-500 hover:shadow-[0_30px_80px_-10px_rgba(0,0,0,0.5)] group interactive"
            >
              <img
                src="/Me.JPG"
                alt="Emmanuel Okaka"
                className="w-full h-auto object-cover aspect-[3/4] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              {/* Tap hint */}
              <div
                className={`absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md rounded-full px-4 py-1.5 pointer-events-none transition-all duration-300 ${photosExpanded ? 'opacity-0 translate-y-2' : 'opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0'}`}
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/90" style={{ fontFamily: 'var(--font-mono)' }}>
                  Tap me
                </span>
              </div>
            </div>
            {/* Decorative border accent */}
            <div className="absolute -inset-3 rounded-[2rem] md:rounded-[2.5rem] border border-[var(--accent)]/20 pointer-events-none" />

            {/* Expanded photos overlay */}
            <AnimatePresence>
              {photosExpanded && (
                <>
                  {/* Backdrop — click to close */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setPhotosExpanded(false)}
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200] cursor-pointer"
                  />

                  {/* Draggable extra photos */}
                  {[
                    { src: "/dangote.jpg", alt: "Dangote", initX: -220, initY: -60, initRotate: -12 },
                    { src: "/car.jpg", alt: "Car", initX: 330, initY: 60, initRotate: 8 },
                  ].map((photo, i) => (
                    <motion.div
                      key={photo.src}
                      initial={{ opacity: 0, scale: 0.3, x: 0, y: 0, rotate: 0 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        x: photo.initX,
                        y: photo.initY,
                        rotate: photo.initRotate,
                      }}
                      exit={{ opacity: 0, scale: 0.3, x: 0, y: 0, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20, delay: i * 0.08 }}
                      drag
                      dragMomentum={true}
                      dragElastic={0.6}
                      whileDrag={{ scale: 1.08, rotate: 0, zIndex: 310 }}
                      whileHover={{ scale: 1.05 }}
                      className="absolute top-0 left-0 w-[200px] md:w-[240px] z-[205] cursor-grab active:cursor-grabbing interactive"
                      style={{ zIndex: 205 + i }}
                    >
                      <div className="overflow-hidden rounded-[1.2rem] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.6)] border-2 border-white/10">
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className="w-full h-auto object-cover aspect-[3/4] pointer-events-none"
                        />
                      </div>
                    </motion.div>
                  ))}

                  {/* Main photo elevated */}
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.05, rotate: 0 }}
                    exit={{ scale: 1, rotate: 0 }}
                    className="absolute inset-0 z-[210] cursor-pointer interactive"
                    onClick={() => setPhotosExpanded(false)}
                  >
                    <div className="overflow-hidden rounded-[1.5rem] md:rounded-[2rem] shadow-[0_30px_80px_-10px_rgba(0,0,0,0.6)] border-2 border-[var(--accent)]/30">
                      <img
                        src="/Me.JPG"
                        alt="Emmanuel Okaka"
                        className="w-full h-auto object-cover aspect-[3/4]"
                      />
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ─── Scene 2: Stacked Card Peel Gallery ─── */}
      <div className="relative z-10 bg-transparent">
        {/* Section header */}
        <div className="sticky top-0 z-50 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-8 left-8 md:left-12 flex items-center gap-3"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <span className="text-[10px] uppercase tracking-widest text-[var(--muted)]">Selected Work</span>
            <div className="w-8 h-[1px] bg-[var(--border)]" />
            <span className="text-xs text-[var(--accent)] font-bold">{String(projects.length).padStart(2, '0')}</span>
          </motion.div>
        </div>

        {/* Stacked cards */}
        {projects.map((project, idx) => (
          <PeelCard key={project.id} project={project} index={idx} totalCards={projects.length} />
        ))}

        {/* View All Projects button */}
        <div className="flex justify-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="interactive"
          >
            <button 
              onClick={() => onNavigate?.('projects')} 
              className="text-[var(--text)] border border-[var(--border)] px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] hover:scale-105 transition-all duration-300"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              View All Projects
            </button>
          </motion.div>
        </div>
      </div>

      {/* ─── Scene 3: CTA ─── */}
      <section className="h-screen flex items-center justify-center relative z-10 overflow-hidden">
        {/* Ambient glow behind CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,var(--accent-glow),transparent_70%)] pointer-events-none"
        />

        <motion.div 
          className="text-center px-4 max-w-4xl relative z-10"
        >
          <h2
            className="text-6xl md:text-[8vw] font-bold leading-[0.9] tracking-tight uppercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {/* Staggered word pop-in/out */}
            {["Let's", "build", "something"].map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 60, scale: 0.7, rotate: -4, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0, filter: 'blur(0px)' }}
                viewport={{ margin: "-100px" }}
                transition={{
                  delay: 0.15 * i,
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block mr-[0.25em]"
              >
                {word}
              </motion.span>
            ))}
            <br />
            {/* "extraordinary." — dramatic accent pop in/out */}
            <motion.span
              initial={{ opacity: 0, y: 80, scale: 0.5, rotate: 6, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0, filter: 'blur(0px)' }}
              viewport={{ margin: "-100px" }}
              transition={{
                delay: 0.55,
                duration: 1.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block text-[var(--accent)]"
            >
              extraordinary.
            </motion.span>
          </h2>

          {/* Accent underline sweep */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ margin: "-100px" }}
            transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-24 h-[2px] bg-[var(--accent)] mx-auto mt-8 origin-left"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-100px" }}
            transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticButton onClick={() => onNavigate?.('about')}>
              Get in touch
            </MagneticButton>
          </motion.div>
        </motion.div>
      </section>
    </motion.div>
  );
}
