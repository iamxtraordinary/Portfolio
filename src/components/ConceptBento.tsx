import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { Smartphone, Code, Layers, GitBranch, Flame, Globe } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import AsciiCanvas from './AsciiCanvas';

/* ─── 3D Tilt Tile ─── */
const BentoTile = ({ 
  children, 
  className, 
  title, 
  colSpan = 1,
  rowSpan = 1,
  delay = 0,
}: { 
  children?: React.ReactNode; 
  className?: string; 
  title?: string;
  colSpan?: number;
  rowSpan?: number;
  delay?: number;
}) => {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [4, -4]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-4, 4]), { stiffness: 200, damping: 20 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - left) / width);
    mouseY.set((clientY - top) / height);
  }

  function onMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={cn(
        "relative group overflow-hidden rounded-[2.5rem] border border-[var(--border)] bg-white/50 p-6 transition-colors hover:bg-white/80 hover:border-[var(--accent)] shadow-sm",
        colSpan === 2 ? "md:col-span-2" : colSpan === 3 ? "md:col-span-3" : colSpan === 4 ? "md:col-span-4" : "col-span-1",
        rowSpan === 2 ? "md:row-span-2" : "row-span-1",
        className
      )}
    >
      {/* Amber glare */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(500px circle at ${(x as number) * 100}% ${(y as number) * 100}%, var(--accent-glow), transparent 50%)`
          ),
        }}
      />
      
      <div className="relative z-10 h-full flex flex-col">
        {title && (
          <div className="flex items-center gap-2 mb-5">
            <div className="w-1 h-1 bg-[var(--accent)] rounded-full" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]" style={{ fontFamily: 'var(--font-display)' }}>{title}</span>
          </div>
        )}
        <div className="flex-1">{children}</div>
      </div>
    </motion.div>
  );
};

/* ─── Data ─── */
const projects = [
  { 
    title: "Inventory Management System", 
    desc: "A lightweight inventory management system for small businesses with role-based access control. Modular architecture following separation-of-concerns principles.",
    tech: ["Flutter", "Firebase", "REST API"],
    icon: "📦",
    period: "Jun — Nov 2024"
  },
  { 
    title: "Real-Time Dating App", 
    desc: "A real-time dating application prototype with user matching, authentication, and in-app messaging. Implemented secure auth and role-based access control.",
    tech: ["Flutter", "Firebase", "REST API"],
    icon: "💬",
    period: "Apr — Aug 2025"
  },
  { 
    title: "Campus Ride-Hailing App", 
    desc: "A real-time ride-hailing mobile application connecting riders and drivers through live geolocation tracking within a university campus.",
    tech: ["Flutter", "Firebase", "Google Maps"],
    icon: "🚗",
    period: "Final Year Project"
  },
  { 
    title: "Inmotion Software Hub", 
    desc: "Streamlined the software development lifecycle at Inmotion. Integrated third-party APIs for booking and payment processing.",
    tech: ["Flutter", "REST API", "Agile"],
    icon: "🏢",
    period: "Mar — Sep 2024"
  },
];

const skills = [
  { name: "Flutter & Dart", icon: Smartphone, level: "Primary" },
  { name: "Firebase", icon: Flame, level: "Advanced" },
  { name: "REST APIs", icon: Globe, level: "Advanced" },
  { name: "React & TS", icon: Code, level: "Intermediate" },
  { name: "Git & VCS", icon: GitBranch, level: "Advanced" },
  { name: "Architecture", icon: Layers, level: "Growing" },
];

/* ─── Main Component ─── */
export default function ConceptBento() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] p-4 md:p-10 selection:bg-[var(--accent)]/20 relative overflow-hidden">
      {/* Ascii Background */}
      <div className="fixed inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
        <AsciiCanvas />
      </div>

      {/* Grain overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[100] opacity-[0.025]"
        style={{ filter: 'url(#grain)', width: '100%', height: '100%' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-between items-center mb-12 pb-5 border-b border-white/[0.06]"
        >
          <div className="font-light text-lg tracking-tight flex items-center gap-4" style={{ fontFamily: 'var(--font-serif)' }}>
            <span className="italic">Projects & Skills</span>
            <span className="text-[10px] text-[var(--accent)] uppercase tracking-[0.3em] font-normal not-italic" style={{ fontFamily: 'var(--font-mono)' }}>[DB_ACCESS_GRANTED]</span>
          </div>
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]" style={{ fontFamily: 'var(--font-mono)' }}>
            <div className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full shadow-[0_0_8px_rgba(84,119,146,0.5)] animate-pulse" />
            {projects.length} Projects Live
          </div>
        </motion.div>

        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] leading-none text-[var(--text)] mb-5" style={{ fontFamily: 'var(--font-display)' }}>
            What I've <span className="text-[var(--accent)]">Built</span>
          </h1>
          <p className="text-base text-[var(--muted)] max-w-xl leading-relaxed">
            Real-world applications solving real problems — from campus transportation to inventory management.
          </p>
        </motion.div>

        {/* Manifesto Video Split */}
        <div className="mb-12">
          <BentoTile colSpan={4} delay={0.3} className="md:col-span-2 md:row-span-1 p-0 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full min-h-[400px]">
              {/* Video Section */}
              <div className="relative bg-[var(--text)] min-h-[300px] lg:min-h-full overflow-hidden">
                <div className="absolute inset-0 bg-[var(--accent)]/10" />
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover mix-blend-lighten opacity-80"
                  poster="https://picsum.photos/seed/manifesto/800/600"
                >
                  <source src="/videos/manifesto.mp4" type="video/mp4" />
                </video>
                <div className="absolute top-6 left-6 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] text-white tracking-[0.2em] uppercase" style={{ fontFamily: 'var(--font-mono)' }}>REC</span>
                </div>
              </div>
              
              {/* Manifesto Text */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-6" style={{ fontFamily: 'var(--font-mono)' }}>
                  [01] SYSTEM_MANIFESTO
                </p>
                <p className="text-sm md:text-base leading-[1.8] text-[var(--text)]" style={{ fontFamily: 'var(--font-mono)' }}>
                  By translating complex requirements into robust architecture, I visualize the invisible forces of backend logic and frontend aesthetics. Every pixel is a decision. Every interaction is an orbit. This is not just development — it is telemetry. I build systems that process, render, and elevate user experience.
                </p>
              </div>
            </div>
          </BentoTile>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
          {projects.map((project, i) => (
            <BentoTile key={i} delay={i * 0.1}>
              <div className="h-full flex flex-col relative">
                {/* Ghost number */}
                <div className="absolute -top-2 -right-2 text-[7rem] font-extrabold text-[var(--border)]/[0.2] leading-none select-none pointer-events-none" style={{ fontFamily: 'var(--font-display)' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div className="flex items-start justify-between mb-5">
                  <span className="text-3xl">{project.icon}</span>
                  <span className="text-[10px] text-[var(--muted)]" style={{ fontFamily: 'var(--font-mono)' }}>{project.period}</span>
                </div>
                <h3 className="text-2xl font-bold text-[var(--text)] mb-3 group-hover:text-[var(--accent)] transition-colors duration-200 uppercase" style={{ fontFamily: 'var(--font-display)' }}>
                  {project.title}
                </h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed flex-1">{project.desc}</p>
                <div className="flex gap-2 mt-5 flex-wrap">
                  {project.tech.map((t, j) => (
                    <span key={j} className="px-3 py-1 bg-[var(--accent)]/[0.06] border border-[var(--accent)]/[0.12] rounded-full text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--accent)]" style={{ fontFamily: 'var(--font-mono)' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </BentoTile>
          ))}
        </div>

        {/* Skills Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--text)] uppercase" style={{ fontFamily: 'var(--font-display)' }}>
            Technical <span className="text-[var(--accent)]">Stack</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 auto-rows-[170px] mb-16">
          {/* Core Stack */}
          <BentoTile colSpan={2} delay={0} className="bg-gradient-to-br from-[var(--text)] to-[var(--muted)] text-[var(--bg)] border-none">
            <div className="h-full flex flex-col justify-between">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--bg)]/60" style={{ fontFamily: 'var(--font-display)' }}>Core Stack</div>
              <div className="text-2xl md:text-3xl font-light leading-snug italic" style={{ fontFamily: 'var(--font-serif)' }}>
                Flutter &middot; Dart<br />
                Firebase &middot; REST<br />
                React &middot; TypeScript
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--bg)]/40 text-right" style={{ fontFamily: 'var(--font-mono)' }}>2025</div>
            </div>
          </BentoTile>

          {/* Skill tiles */}
          {skills.slice(0, 2).map((skill, i) => (
            <BentoTile key={i} delay={0.1 + i * 0.1}>
              <div className="h-full flex flex-col items-center justify-center gap-4">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="w-12 h-12 rounded-2xl border border-[var(--accent)]/20 flex items-center justify-center bg-[var(--accent)]/[0.05]"
                >
                  <skill.icon className="w-5 h-5 text-[var(--accent)]" />
                </motion.div>
                <h4 className="text-xl font-bold text-center uppercase tracking-tight text-[var(--text)]" style={{ fontFamily: 'var(--font-display)' }}>{skill.name}</h4>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]" style={{ fontFamily: 'var(--font-mono)' }}>{skill.level}</span>
              </div>
            </BentoTile>
          ))}

          {skills.slice(2).map((skill, i) => (
            <BentoTile key={i + 2} delay={0.2 + i * 0.1}>
              <div className="h-full flex flex-col items-center justify-center gap-4">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className="w-12 h-12 rounded-2xl border border-[var(--accent)]/20 flex items-center justify-center bg-[var(--accent)]/[0.05]"
                >
                  <skill.icon className="w-5 h-5 text-[var(--accent)]" />
                </motion.div>
                <h4 className="text-xl font-bold text-center uppercase tracking-tight text-[var(--text)]" style={{ fontFamily: 'var(--font-display)' }}>{skill.name}</h4>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]" style={{ fontFamily: 'var(--font-mono)' }}>{skill.level}</span>
              </div>
            </BentoTile>
          ))}
        </div>
      </div>
    </div>
  );
}
