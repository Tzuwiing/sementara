import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Coins } from "lucide-react";
import confetti from "canvas-confetti";
import { PixelHeart } from "./Pixel.jsx";

const LINKS = [
  { id: "hero", label: "START" },
  { id: "about", label: "ITEMS" },
  { id: "workflow", label: "STAGES" },
  { id: "portfolio", label: "GAMES" },
  { id: "contact", label: "SCORE" },
];

function useStage() {
  const [stage, setStage] = useState(1);
  useEffect(() => {
    const onScroll = () => {
      const ids = LINKS.map((l) => l.id);
      let current = 1;
      ids.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4)
          current = i + 1;
      });
      setStage(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return stage;
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [score, setScore] = useState(0);
  const stage = useStage();

  const insertCoin = () => {
    const randomAdd = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
    setScore((s) => s + randomAdd);

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.1 },
      colors: ["#ffe600", "#ff007f", "#00f0ff"],
      shapes: ["square"],
      scalar: 0.9,
    });
    scrollToId("contact");
    setOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-black/90 backdrop-blur-sm border-b-4 border-arcade-magenta shadow-[0_4px_0_#000,0_0_24px_rgba(255,0,127,0.45)]">
      {/* HUD row */}
      <div className="flex items-center justify-between gap-2 px-3 sm:px-6 py-2 border-b-2 border-arcade-cyan/40 font-pixel text-[8px] sm:text-[10px] md:text-xs">
        <div className="neon-yellow whitespace-nowrap">
          SCORE:{" "}
          <span className="tabular-nums">{String(score).padStart(6, "0")}</span>
        </div>
        <div className="flex items-center gap-1.5 whitespace-nowrap neon-magenta">
          <span className="hidden sm:inline">LIVES:</span>
          <PixelHeart size={3} />
          <PixelHeart size={3} />
          <PixelHeart size={3} />
        </div>
        <div className="neon-cyan whitespace-nowrap">
          STAGE {String(stage).padStart(2, "0")}
        </div>
      </div>

      {/* Nav row */}
      <div className="flex items-center justify-between px-3 sm:px-6 py-2">
        <button
          onClick={() => scrollToId("hero")}
          className="font-pixel text-[10px] sm:text-xs text-arcade-green neon-green text-left leading-relaxed"
          aria-label="Go to top"
        >
          P1<span className="step-blink">_</span>
        </button>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-2" aria-label="Main">
          {LINKS.map((l, i) => (
            <motion.button
              key={l.id}
              onClick={() => scrollToId(l.id)}
              whileHover={{ y: -2 }}
              whileTap={{ y: 3 }}
              className="group font-pixel text-[10px] px-3 py-2 text-arcade-cyan hover:text-arcade-yellow transition-colors"
            >
              <span className="opacity-0 group-hover:opacity-100 step-blink mr-1 text-arcade-yellow">
                ▶
              </span>
              {String(i + 1).padStart(2, "0")}.{l.label}
            </motion.button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <motion.button
            onClick={insertCoin}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="arcade-btn arcade-btn-yellow !px-3 !py-2 text-[8px] sm:text-[10px] flex items-center gap-2"
          >
            <Coins size={14} strokeWidth={3} />
            <span className="step-blink">INSERT COIN</span>
          </motion.button>

          <button
            className="md:hidden text-arcade-cyan p-2 border-2 border-arcade-cyan"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "tween", ease: "linear", duration: 0.2 }}
            className="md:hidden overflow-hidden border-t-2 border-arcade-magenta bg-black"
            aria-label="Mobile"
          >
            <ul className="flex flex-col font-pixel text-[10px]">
              {LINKS.map((l, i) => (
                <li key={l.id}>
                  <button
                    onClick={() => {
                      scrollToId(l.id);
                      setOpen(false);
                    }}
                    className="w-full text-left px-5 py-3 text-arcade-cyan hover:bg-arcade-magenta/20 hover:text-arcade-yellow"
                  >
                    ▶ {String(i + 1).padStart(2, "0")}.{l.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
