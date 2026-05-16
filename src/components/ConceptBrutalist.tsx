import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Star, Smile, AlertCircle, Github, Linkedin, Phone, GraduationCap, Briefcase, MapPin, Calendar } from 'lucide-react';
import { cn } from '@/src/lib/utils';

/* ─── Data ─── */
const photos = [
  { id: 1, src: "/emmanuel.jpg", caption: "THE FACE", rotation: -5 },
  { id: 2, src: "/photo2.jpg", caption: "AT WORK", rotation: 3 },
  { id: 3, src: "/photo3.jpg", caption: "VIBES", rotation: -2 },
  { id: 4, src: "/photo4.jpg", caption: "ADVENTURES", rotation: 6 },
];

/* ─── Win95 Easter Egg ─── */
const Win95Popup = ({ onClose }: { onClose: () => void }) => (
  <motion.div 
    initial={{ scale: 0.5, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.5, opacity: 0 }}
    transition={{ type: "spring", stiffness: 300, damping: 25 }}
    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
  >
    <motion.div 
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      className="bg-[#C0C0C0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-[#808080] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full max-w-md"
    >
      <div className="bg-[#000080] px-2 py-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-white" />
          <span className="text-white text-xs font-bold" style={{ fontFamily: 'var(--font-mono)' }}>SYSTEM WARNING</span>
        </div>
        <motion.button 
          onClick={onClose} 
          whileHover={{ backgroundColor: '#ef4444' }}
          whileTap={{ scale: 0.9 }}
          className="bg-[#C0C0C0] border border-black p-0.5"
        >
          <X className="w-3 h-3" />
        </motion.button>
      </div>
      <div className="p-6 flex gap-4 items-start">
        <motion.div 
          animate={{ rotate: [0, -5, 5, -5, 0] }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-yellow-400 p-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        >
          <Smile className="w-8 h-8 text-black" />
        </motion.div>
        <div>
          <p className="text-sm font-bold mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
            WARNING: Hiring me may result in shipping features too fast and excessive code quality.
          </p>
          <div className="flex justify-end gap-2">
            <motion.a 
              href="mailto:emmaokaka123@gmail.com"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-1.5 bg-[#C0C0C0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black text-xs font-bold"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              PROCEED
            </motion.a>
            <motion.button 
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-1.5 bg-[#C0C0C0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black text-xs font-bold"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              CANCEL
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

/* ─── Draggable Sticker ─── */
const DraggableSticker = ({ text, initialPos, color = '#FFFF00', delay = 0 }: { text: string, initialPos: { x: number, y: number }, color?: string, delay?: number }) => (
  <motion.div
    drag
    dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
    initial={{ ...initialPos, scale: 0, rotate: -20 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ delay, type: "spring", stiffness: 300, damping: 15 }}
    whileHover={{ scale: 1.15, rotate: 8 }}
    whileDrag={{ scale: 1.2, zIndex: 60 }}
    className="absolute cursor-grab active:cursor-grabbing border-4 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-30 uppercase select-none"
    style={{ backgroundColor: color, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '11px', letterSpacing: '0.05em' }}
  >
    {text}
  </motion.div>
);

/* ─── Main Component ─── */
export default function ConceptBrutalist() {
  const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div 
      className={cn(
        "min-h-screen transition-colors duration-200 p-4 md:p-12 selection:bg-[var(--text)] selection:text-[var(--bg)] relative",
        hoveredPhoto !== null ? "bg-[var(--border)]" : "bg-[var(--bg)]"
      )}
      style={{ 
        backgroundImage: `url("https://www.transparenttextures.com/patterns/paper-fibers.png")`,
        fontFamily: 'var(--font-mono)'
      }}
    >
      {/* Stickers — drop in with staggered delay */}
      <DraggableSticker text="Lagos, NG 🇳🇬" initialPos={{ x: 100, y: 200 }} color="#FF00FF" delay={0.5} />
      <DraggableSticker text="Drag Me!" initialPos={{ x: 800, y: 150 }} color="#00FFFF" delay={0.7} />
      <DraggableSticker text="BSc. CS" initialPos={{ x: 500, y: 600 }} color="#FFFF00" delay={0.9} />
      
      {/* Marquee — pauses on hover */}
      <div className="fixed top-0 left-0 w-full bg-black text-white py-2 z-50 overflow-hidden border-b-4 border-black group/marquee">
        <div className="flex whitespace-nowrap animate-marquee-fast group-hover/marquee:[animation-play-state:paused]">
          {Array(10).fill(0).map((_, i) => (
            <span key={i} className="text-xs font-bold tracking-tight mx-4" style={{ fontFamily: 'var(--font-display)' }}>
              LET'S CONNECT ✦ EMMANUEL OKAKA ✦ SOFTWARE ENGINEER ✦ LAGOS, NIGERIA ✦
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-16">
        {/* ─── Hero ─── */}
        <div className="relative flex flex-col md:flex-row items-center justify-between mb-32 gap-12">
          <div className="relative z-10 w-full md:w-auto">
            <motion.h1 
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              className="text-7xl md:text-[12vw] leading-[0.75] tracking-tighter text-[var(--text)] uppercase mb-8"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}
            >
              ABOUT<br />ME
            </motion.h1>
            <motion.div 
              initial={{ rotate: 15, opacity: 0, scale: 0.8 }}
              animate={{ rotate: -2, opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
              className="inline-block bg-[var(--accent)] border-4 border-[var(--text)] p-4 shadow-[8px_8px_0px_0px_var(--text)]"
            >
              <p className="text-xl md:text-3xl text-[var(--bg)] italic" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>EMMANUEL OKAKA</p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 80, damping: 20 }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-black rotate-3 group-hover:rotate-0 transition-transform duration-500" />
            <div className="relative w-64 h-80 md:w-96 md:h-[550px] border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-white">
              <img 
                src="/emmanuel.jpg" 
                alt="Emmanuel Okaka" 
                className="w-full h-full object-cover object-[center_40%] grayscale contrast-150 group-hover:grayscale-0 transition-[filter] duration-700"
              />
            </div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute -top-12 -right-12 w-36 h-36 bg-[#FFFF00] border-4 border-black rounded-full flex items-center justify-center p-5 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-20"
            >
              <span className="text-[10px] leading-none" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>SHIPS CODE FAST</span>
            </motion.div>
          </motion.div>
        </div>

        {/* ─── Bio ─── */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-32 text-[var(--text)]"
        >
          <h2 className="text-4xl md:text-6xl uppercase border-b-8 border-[var(--text)] pb-4 mb-12 inline-block" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>Who I Am</h2>
          <div className="bg-[var(--bg)] border-4 border-[var(--text)] p-8 md:p-12 shadow-[12px_12px_0px_0px_var(--text)] max-w-4xl hover:shadow-[16px_16px_0px_0px_var(--text)] transition-shadow duration-300">
            <p className="text-lg md:text-xl leading-relaxed font-bold">
              Junior Software Engineer with over two years of hands-on experience designing and developing scalable software solutions. 
              Strong focus on <span className="bg-[var(--accent)] text-[var(--bg)] px-2 py-0.5 inline-block -rotate-1">mobile</span> and <span className="bg-[var(--border)] px-2 py-0.5 inline-block rotate-1">backend-driven</span> systems.
            </p>
            <p className="text-lg md:text-xl leading-relaxed font-bold mt-6">
              Proficient in Flutter, Firebase, RESTful APIs, and object-oriented programming. 
              Passionate about solving real-world problems through clean, maintainable, and 
              <span className="bg-[var(--muted)] text-[var(--bg)] px-2 py-0.5 inline-block -rotate-1">performance-driven</span> software solutions.
            </p>
          </div>
        </motion.div>

        {/* ─── Photo Gallery ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative mb-32"
        >
          <div className="flex items-center gap-6 mb-16 text-[var(--text)]">
            <h2 className="text-5xl md:text-7xl uppercase border-b-8 border-[var(--text)] pb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>Gallery</h2>
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Star className="w-10 h-10 fill-[var(--text)] text-[var(--text)]" />
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mt-12">
            {photos.map((photo, idx) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 30, rotate: photo.rotation * 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: photo.rotation }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.12, type: "spring", stiffness: 150, damping: 20 }}
                onMouseEnter={() => setHoveredPhoto(photo.id)}
                onMouseLeave={() => setHoveredPhoto(null)}
                whileHover={{ 
                  scale: 1.08, 
                  rotate: 0, 
                  zIndex: 10,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className={cn(
                  "relative bg-[var(--bg)] border-4 border-[var(--text)] p-4 transition-shadow group cursor-pointer text-[var(--text)]",
                  hoveredPhoto === photo.id ? "shadow-[-10px_10px_0px_0px_var(--text)]" : "shadow-[8px_8px_0px_0px_var(--text)]"
                )}
              >
                <div className="absolute -top-5 -left-5 bg-[var(--text)] text-[var(--bg)] w-10 h-10 flex items-center justify-center text-lg border-4 border-[var(--text)]" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div className="aspect-square border-4 border-[var(--text)] overflow-hidden mb-4">
                  <img 
                    src={photo.src} 
                    alt={photo.caption} 
                    className="w-full h-full object-cover object-[center_40%] grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>{photo.caption}</h3>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-[10px] text-[var(--text)] text-center mt-8 opacity-40 font-bold uppercase tracking-wider">
            Add your photos: public/photo2.jpg, photo3.jpg, photo4.jpg
          </p>
        </motion.div>

        {/* ─── Education & Experience ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-32 text-[var(--text)]">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[var(--bg)] border-4 border-[var(--text)] p-8 shadow-[8px_8px_0px_0px_var(--text)] hover:shadow-[12px_12px_0px_0px_var(--text)] transition-shadow duration-300"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-[var(--accent)] border-4 border-[var(--text)] p-3">
                <GraduationCap className="w-7 h-7 text-[var(--bg)]" />
              </div>
              <h3 className="text-2xl uppercase" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>Education</h3>
            </div>
            <div>
              <h4 className="text-lg" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Computer Science — BSc.</h4>
              <p className="font-bold text-base mt-1">Covenant University</p>
              <p className="text-xs opacity-50 font-bold mt-1">Ogun State, Nigeria</p>
              <div className="flex items-center gap-2 mt-3">
                <Calendar className="w-3.5 h-3.5" />
                <span className="text-xs font-bold">Nov 2021 — Jul 2025</span>
              </div>
              <motion.div 
                whileHover={{ rotate: -1, scale: 1.02 }}
                className="mt-5 inline-block bg-[var(--muted)] text-[var(--bg)] border-4 border-[var(--text)] px-4 py-2 text-xs shadow-[3px_3px_0px_0px_var(--text)]"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}
              >
                SECOND CLASS UPPER HONOURS
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[var(--bg)] border-4 border-[var(--text)] p-8 shadow-[8px_8px_0px_0px_var(--text)] hover:shadow-[12px_12px_0px_0px_var(--text)] transition-shadow duration-300"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-[var(--accent)] border-4 border-[var(--text)] p-3">
                <Briefcase className="w-7 h-7 text-[var(--bg)]" />
              </div>
              <h3 className="text-2xl uppercase" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>Experience</h3>
            </div>
            <div className="space-y-5">
              {[
                { title: "Software Engineer (Contract)", sub: "Real-time dating app · Flutter", date: "Apr 2025 — Aug 2025" },
                { title: "Mobile Developer Intern", sub: "Inmotion Software Hub", date: "Mar 2024 — Sep 2024" },
                { title: "Personal Project", sub: "Inventory Management System", date: "Jun 2024 — Nov 2024" },
              ].map((exp, i) => (
                <div key={i} className={i < 2 ? "border-b-4 border-black pb-5" : ""}>
                  <h4 className="text-base" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>{exp.title}</h4>
                  <p className="text-xs font-bold opacity-60 mt-1">{exp.sub}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Calendar className="w-3 h-3 opacity-40" />
                    <span className="text-[11px] font-bold opacity-50">{exp.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ─── Contact ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-[var(--text)]"
        >
          <h2 className="text-5xl md:text-7xl uppercase border-b-8 border-[var(--text)] pb-4 mb-12 inline-block" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>Reach Me</h2>
        </motion.div>

        <div className="flex flex-wrap gap-4 mb-16 justify-center">
          {[
            { href: "https://github.com/iamxtraordinary", icon: Github, label: "GitHub", hoverBg: "#FF00FF", hoverText: "white" },
            { href: "https://www.linkedin.com/in/okaka-emmanuel", icon: Linkedin, label: "LinkedIn", hoverBg: "#00FFFF", hoverText: "black" },
            { href: "mailto:emmaokaka123@gmail.com", icon: Mail, label: "emmaokaka123@gmail.com", hoverBg: "#FFFF00", hoverText: "black" },
            { href: "https://wa.me/2349014771232", icon: Phone, label: "WhatsApp", hoverBg: "#FF3300", hoverText: "white" },
          ].map((link, i) => (
            <motion.a
              key={i}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : "_blank"}
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="bg-black text-white border-4 border-black px-6 py-3 text-sm uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '12px', letterSpacing: '0.05em' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = link.hoverBg; e.currentTarget.style.color = link.hoverText; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'black'; e.currentTarget.style.color = 'white'; }}
            >
              <span className="flex items-center gap-2"><link.icon className="w-4 h-4" /> {link.label}</span>
            </motion.a>
          ))}
        </div>

        {/* Location */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-16 text-center"
        >
          <MapPin className="w-5 h-5" />
          <p className="text-lg uppercase" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>Lagos, Nigeria · 6.5244° N</p>
        </motion.div>

        {/* Footer Easter Egg */}
        <div className="flex flex-col items-center justify-center py-24 border-t-4 border-[var(--text)] text-[var(--text)]">
          <motion.button 
            onClick={() => setShowPopup(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative"
          >
            <Smile className="w-28 h-28 md:w-40 md:h-40 text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-200" />
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <span className="bg-[var(--text)] text-[var(--bg)] px-4 py-2 text-lg whitespace-nowrap" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>CLICK ME</span>
            </motion.div>
          </motion.button>
          <p className="mt-8 text-xl uppercase" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>Let's build something together.</p>
        </div>
      </div>

      <AnimatePresence>
        {showPopup && <Win95Popup onClose={() => setShowPopup(false)} />}
      </AnimatePresence>

      <style>{`
        @keyframes marquee-fast {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-fast {
          animation: marquee-fast 5s linear infinite;
        }
      `}</style>
    </div>
  );
}
