import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play, Mail } from "lucide-react";
import confetti from "canvas-confetti";
import {
  Ghost,
  Invader,
  PixelStar,
  CoinSprite,
  HeroSprite,
  PacMan,
} from "./Pixel.jsx";

export const EMAIL = "jusuffathan1909@gmail.com";
export const EMAIL_URL = `mailto:${EMAIL}`;

function pixelConfetti(originEl) {
  const rect = originEl?.getBoundingClientRect?.();
  const origin = rect
    ? {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      }
    : { x: 0.5, y: 0.6 };
  const colors = ["#ff007f", "#00f0ff", "#ffe600", "#39ff14"];
  const fire = (ratio, opts) =>
    confetti({
      origin,
      colors,
      shapes: ["square"],
      scalar: 1.1,
      ticks: 220,
      gravity: 0.9,
      ...opts,
      particleCount: Math.floor(160 * ratio),
    });
  fire(0.3, { spread: 26, startVelocity: 55 });
  fire(0.25, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92 });
}

const FLOATERS = [
  {
    C: () => <Ghost color="#ff007f" size={5} />,
    pos: "top-2 -left-6 sm:-left-14",
    delay: 0,
  },
  {
    C: () => <Ghost color="#00f0ff" size={5} />,
    pos: "top-1/3 -right-6 sm:-right-14",
    delay: 0.4,
  },
  {
    C: () => <Invader color="#39ff14" size={5} />,
    pos: "-bottom-4 left-4 sm:-left-10",
    delay: 0.8,
  },
  { C: () => <PixelStar size={5} />, pos: "-top-6 right-10", delay: 0.2 },
  {
    C: () => <CoinSprite size={5} />,
    pos: "bottom-6 -right-4 sm:-right-12",
    delay: 0.6,
  },
  {
    C: () => <Ghost color="#ffb000" size={4} />,
    pos: "-bottom-6 right-1/3",
    delay: 1,
  },
];

export default function Hero() {
  const [frame, setFrame] = useState(0);
  const [typed, setTyped] = useState("");

  // Opsi 3: Minimalis Retro 3 Baris dengan format \n
  const full = "JUSUF FATHAN\nNURADLY\nJUNIOR DEV";

  useEffect(() => {
    const t = setInterval(() => setFrame((f) => f + 1), 350);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setTyped(full.slice(0, i));
      if (i >= full.length) clearInterval(t);
    }, 70);
    return () => clearInterval(t);
  }, []);

  const start = (e) => {
    pixelConfetti(e.currentTarget);
    setTimeout(
      () =>
        document
          .getElementById("about")
          ?.scrollIntoView({ behavior: "smooth" }),
      900,
    );
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-32 sm:pt-36 pb-24 px-4 sm:px-8 overflow-hidden grid-bg"
    >
      {/* neon floor grid */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 overflow-hidden opacity-40"
        aria-hidden="true"
      >
        <div className="grid-floor h-[140%] w-full" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* ---------- Left: copy ---------- */}
        <div className="order-2 lg:order-1 text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="font-pixel text-[10px] sm:text-xs neon-green mb-6 step-blink"
          >
            ★ PLAYER 1 READY ★
          </motion.p>

          {/* Heading 3 baris terpisah dengan whitespace-pre-line */}
          <h1
            className="font-pixel text-xl sm:text-3xl xl:text-4xl leading-[1.4] sm:leading-[1.5] neon-magenta glitch-text whitespace-pre-line min-h-[7rem] sm:min-h-[9.5rem] tracking-wider"
            aria-label="JUSUF FATHAN NURADLY JUNIOR DEV"
          >
            {typed}
            <span className="step-blink text-arcade-cyan">█</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="mt-6 font-silk text-sm sm:text-base text-arcade-cyan leading-relaxed"
          >
            Specializing in <span className="neon-yellow">React JS</span>,{" "}
            <span className="neon-cyan">Tailwind CSS</span>, and{" "}
            <span className="neon-green">Flutter</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.1 }}
            className="mt-4 text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-silk"
          >
            I turn pixel-perfect designs into fast, responsive web &amp; mobile
            apps. Pick your controller, press start, and let's build the next
            level together.
          </motion.p>

          <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
            <motion.button
              onClick={start}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="arcade-btn arcade-btn-green flex items-center justify-center gap-3 text-xs"
            >
              <Play size={16} fill="currentColor" />
              START GAME
            </motion.button>
            <motion.a
              href="mailto:jusuffathan1909@gmail.com"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="arcade-btn arcade-btn-cyan flex items-center justify-center gap-3 text-xs"
            >
              <Mail size={16} />
              CONTACT VIA EMAIL
            </motion.a>
          </div>

          <p className="mt-10 font-pixel text-[9px] text-arcade-yellow step-blink">
            PRESS START TO CONTINUE
          </p>
        </div>

        {/* ---------- Right: cabinet screen ---------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
          className="order-1 lg:order-2 relative mx-auto w-full max-w-md"
        >
          {FLOATERS.map(({ C, pos, delay }, i) => (
            <motion.div
              key={i}
              className={`absolute z-20 ${pos}`}
              animate={{ y: [0, -16, 0], x: [0, i % 2 ? 6 : -6, 0] }}
              transition={{
                duration: 3 + i * 0.3,
                repeat: Infinity,
                ease: "linear",
                delay,
              }}
            >
              <C />
            </motion.div>
          ))}

          {/* cabinet body */}
          <div className="relative bg-gradient-to-b from-[#2a0050] to-[#12002a] p-4 sm:p-5 pixel-box pixel-box-magenta">
            <div className="flex justify-between font-pixel text-[8px] mb-3 text-arcade-yellow">
              <span>1UP</span>
              <span className="step-blink">HI-SCORE 999999</span>
              <span>2UP</span>
            </div>

            {/* CRT screen */}
            <div className="relative scanlines crt-roll overflow-hidden bg-black border-4 border-black outline outline-4 outline-arcade-cyan aspect-square">
              <div className="absolute inset-0 grid-bg opacity-60" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.18),transparent_70%)]" />

              {/* avatar */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="flex flex-col items-center"
                >
                  <HeroSprite frame={frame} size={12} />
                  <div className="mt-3 h-2 w-24 bg-black/70 rounded-full blur-[2px]" />
                </motion.div>
              </div>

              {/* pac-man chasing ghosts along bottom */}
              <motion.div
                className="absolute bottom-3 flex items-center gap-2"
                animate={{ x: ["-30%", "110%"] }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              >
                <PacMan open={frame % 2 === 0} size={3} />
                <span className="font-pixel text-arcade-yellow text-[8px]">
                  • • •
                </span>
                <Ghost color="#ff007f" size={3} />
                <Ghost color="#00f0ff" size={3} />
              </motion.div>

              <div className="absolute top-2 left-2 font-pixel text-[8px] text-arcade-green">
                LV 01
              </div>
              <div className="absolute top-2 right-2 font-pixel text-[8px] text-arcade-yellow">
                HP ▮▮▮▮▮
              </div>
            </div>

            {/* HP bar */}
            <div className="mt-4">
              <div className="flex justify-between font-pixel text-[8px] text-arcade-green mb-1">
                <span>XP</span>
                <span>78%</span>
              </div>
              <div className="hp-bar">
                <motion.div
                  className="hp-fill"
                  initial={{ width: 0 }}
                  animate={{ width: "78%" }}
                  transition={{ duration: 1.6, delay: 0.6, ease: "linear" }}
                />
              </div>
            </div>

            {/* control panel */}
            <div className="mt-5 flex items-center justify-between px-2">
              <div className="relative w-12 h-12">
                <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-3 h-8 bg-slate-400 border-2 border-black" />
                <div className="absolute left-1/2 -translate-x-1/2 top-0 w-8 h-8 rounded-full bg-arcade-magenta border-4 border-black shadow-[inset_-4px_-4px_0_rgba(0,0,0,.35),inset_4px_4px_0_rgba(255,255,255,.4)]" />
              </div>
              <div className="flex gap-3">
                <button
                  className="round-btn bg-arcade-yellow text-xs"
                  aria-label="A button"
                >
                  A
                </button>
                <button
                  className="round-btn bg-arcade-cyan text-xs"
                  aria-label="B button"
                >
                  B
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
