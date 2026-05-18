import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Code, User } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import ConceptBento from './components/ConceptBento';
import ConceptCinematic from './components/ConceptCinematic';
import ConceptBrutalist from './components/ConceptBrutalist';
import { cn } from './lib/utils';

type Page = 'intro' | 'projects' | 'about';

const pages: { id: Page; name: string; icon: LucideIcon }[] = [
  { id: 'intro', name: 'Intro', icon: Sparkles },
  { id: 'projects', name: 'Projects', icon: Code },
  { id: 'about', name: 'About', icon: User },
];

export default function App() {
  const [activePage, setActivePage] = useState<Page>('intro');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activePage]);

  return (
    <div className="relative">
      {/* SVG Noise Filter — reusable across pages */}
      <svg className="fixed w-0 h-0" aria-hidden="true">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      {/* Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1000]">
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 25 }}
          className="flex items-center gap-1.5 p-1.5 bg-[#08080A]/90 backdrop-blur-xl border border-white/[0.08] rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.03)]"
        >
          {pages.map((page) => (
            <motion.button
              key={page.id}
              onClick={() => setActivePage(page.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "relative px-5 py-2.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors flex items-center gap-2",
                activePage === page.id 
                  ? "text-[var(--text)]" 
                  : "text-[var(--border)] hover:text-[var(--text)]"
              )}
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {activePage === page.id && (
                <motion.div 
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-[var(--bg)] rounded-full shadow-[0_0_20px_var(--accent-glow)]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <page.icon className="w-3.5 h-3.5 relative z-10" />
              <span className="relative z-10 hidden md:inline">{page.name}</span>
            </motion.button>
          ))}
        </motion.div>
      </nav>

      {/* Page Content */}
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 24, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 1.01 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {activePage === 'intro' && <ConceptCinematic onNavigate={setActivePage} />}
            {activePage === 'projects' && <ConceptBento />}
            {activePage === 'about' && <ConceptBrutalist />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Design System Styles */}
      <style>{`
        :root {
          --bg: #0D1B2A;
          --text: #E0E1DD;
          --muted: #778DA9;
          --accent: #778DA9;
          --accent-glow: rgba(119, 141, 169, 0.15); /* #778DA9 in rgb */
          --border: #415A77;
          
          --font-display: 'Oswald', sans-serif;
          --font-body: 'DM Sans', sans-serif;
          --font-serif: 'Cormorant Garamond', Georgia, serif;
          --font-mono: 'JetBrains Mono', monospace;
          
          --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
          --ease-in: cubic-bezier(0.55, 0, 1, 0.45);
          --spring: cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        * {
          box-sizing: border-box;
        }

        body {
          font-family: var(--font-body);
          background: var(--bg);
          color: var(--text);
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .font-display {
          font-family: var(--font-display);
        }

        .font-serif {
          font-family: var(--font-serif);
        }

        .font-mono {
          font-family: var(--font-mono);
        }

        /* Scrollbar */
        ::-webkit-scrollbar {
          width: 5px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: var(--border);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: var(--accent);
        }

        ::selection {
          background: var(--border);
          color: #fff;
        }

        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
