import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import confetti from "canvas-confetti";
import SectionTitle from "./SectionTitle.jsx";
import {
  Cartridge,
  Ghost,
  Invader,
  PixelStar,
  PixelHeart,
  PacMan,
  Joystick,
} from "./Pixel.jsx";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/*  - Setiap proyek punya judul, sub-judul, deskripsi, dan warna       */
/*    sendiri (tidak ada lagi deskripsi yang "nyasar" ke proyek lain). */
/*  - `demo` boleh dikosongkan / dihapus / null: tombol Demo otomatis  */
/*    hilang dari kartu.                                               */
/* ------------------------------------------------------------------ */
const PROJECTS = [
  {
    id: "P1",
    title: "ISLAMIC MOBILE APP",
    sub: "Jadwal Shalat & Doa",
    desc: "Prayer times, daily doa collection and offline-first data with a clean, calming mobile UI.",
    tech: ["FLUTTER", "REST API", "LOCAL DB"],
    color: "#39ff14",
    demo: null,
    repo: "https://github.com/Tzuwiing/AmalinApp",
    art: "moon",
  },
  {
    id: "P2",
    title: "TASK MANAGEMENT WEB",
    sub: "Quest Log Tracker",
    desc: "Create, prioritize and complete tasks with smooth animations and persistent storage.",
    tech: ["REACT JS", "TAILWIND", "VITE"],
    color: "#00f0ff",
    demo: "https://todobyjusuf.vercel.app/",
    repo: "https://github.com/Tzuwiing/Todoapp",
    art: "list",
    lines: ["[X] SLICE UI", "[X] BUILD API", "[ ] SHIP IT"],
  },
  {
    id: "P3",
    title: "BMI CALCULATOR WEB",
    sub: "Health Stat Checker",
    desc: "Enter height and weight to get your Body Mass Index instantly, with a clear health category and a responsive layout.",
    tech: ["REACT JS", "TAILWIND", "VITE"],
    color: "#ff007f",
    demo: "https://bmicalcbyjusuf.vercel.app/",
    repo: "https://github.com/Tzuwiing/BMI-Calc",
    art: "list",
    lines: ["HEIGHT 170 CM", "WEIGHT 65 KG", "BMI 22.5 = OK"],
  },
  {
    id: "P4",
    title: "FINANCE TRACKER WEB",
    sub: "Coin Counter Ledger",
    desc: "Record income and expenses, watch your balance update in real time and keep every transaction saved locally.",
    tech: ["REACT JS", "TAILWIND", "VITE"],
    color: "#ffb000",
    demo: "https://financetrackerbyjusuf.vercel.app/",
    repo: "https://github.com/Tzuwiing/Finance-Tracker",
    art: "list",
    lines: ["+ INCOME", "- EXPENSE", "= BALANCE"],
  },
  {
    id: "P5",
    title: "BOOKSHELF WEB",
    sub: "Library Quest Shelf",
    desc: "Add books, mark them as read or still reading, search your collection and keep the shelf saved between visits.",
    tech: ["REACT JS", "TAILWIND", "VITE"],
    color: "#b36bff",
    demo: "https://bookshelfbyjusuf.vercel.app/",
    repo: "https://github.com/Tzuwiing/Bookshelf",
    art: "list",
    lines: ["[X] FINISHED", "[ ] READING", "[ ] WISHLIST"],
  },
  {
    id: "P6",
    title: "MYSISWA STUDENT APP (MOCKUP)",
    sub: "Student App Remake",
    desc: "A Flutter remake of a student portal mockup: onboarding, dashboard, profile and schedule screens.",
    tech: ["FLUTTER", "FIGMA", "UI/UX"],
    color: "#ffe600",
    demo: "",
    repo: "https://github.com/Tzuwiing/MySiswaFlutter-remake",
    art: "vault",
  },
  {
    id: "P7",
    title: "FLUTTER SLICING VAULT",
    sub: "Mobile UI Collection",
    desc: "Pixel-perfect Figma-to-Flutter screens: onboarding, dashboards, profiles and more.",
    tech: ["FLUTTER", "FIGMA", "UI/UX"],
    color: "#ff6a00",
    // demo: tidak ada -> tombol Demo tidak ditampilkan
    repo: "https://github.com/",
    art: "react",
  },
];

/** true hanya jika `url` adalah string non-kosong (bukan null/undefined/"#") */
const hasLink = (url) =>
  typeof url === "string" && url.trim() !== "" && url.trim() !== "#";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
function useMediaQuery(query) {
  const get = () =>
    typeof window !== "undefined" && window.matchMedia(query).matches;
  const [matches, setMatches] = useState(get);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/** selisih sirkular terpendek antara slide i dan slide aktif */
const circularOffset = (i, active, n) => {
  let d = i - active;
  if (d > n / 2) d -= n;
  if (d < -n / 2) d += n;
  return d;
};

/* tiny attract-mode screens drawn with sprites */
function ScreenArt({ kind, color, lines = [] }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      {kind === "moon" && (
        <>
          <div className="absolute top-4 right-6 w-12 h-12 rounded-full bg-arcade-yellow shadow-[0_0_24px_#ffe600]" />
          <div className="absolute top-4 right-3 w-12 h-12 rounded-full bg-black" />
          {[...Array(6)].map((_, i) => (
            <PixelStar
              key={i}
              size={2}
              color="#fff"
              className="absolute"
              style={{ top: `${10 + i * 12}%`, left: `${8 + i * 14}%` }}
            />
          ))}
          <div className="relative font-pixel text-[10px] text-arcade-green neon-green text-center leading-loose">
            ☪ 05:12
            <br />
            FAJR
          </div>
        </>
      )}
      {kind === "list" && (
        <div className="relative flex flex-col gap-2 w-3/4 font-pixel text-[8px]">
          {lines.map((t, i) => (
            <motion.div
              key={t}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              className="bg-black/70 border-2 px-2 py-1"
              style={{ borderColor: color, color }}
            >
              {t}
            </motion.div>
          ))}
        </div>
      )}
      {kind === "react" && (
        <motion.div
          animate={{ x: [-60, 60, -60] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-3"
        >
          <Invader color="#ff007f" size={4} />
          <Invader color="#00f0ff" size={4} />
          <Invader color="#ffe600" size={4} />
        </motion.div>
      )}
      {kind === "vault" && (
        <div className="relative flex flex-col items-center gap-3">
          <PacMan size={4} />
          <div className="flex gap-2">
            <Ghost color="#ff007f" size={3} />
            <Ghost color="#00f0ff" size={3} />
            <Ghost color="#ffb000" size={3} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Cabinet (satu kartu proyek)                                        */
/* ------------------------------------------------------------------ */
function Cabinet({ p, isActive, onOpenDemo, onOpenRepo }) {
  const showDemo = hasLink(p.demo);
  const showRepo = hasLink(p.repo);

  return (
    <article className="relative select-none">
      {/* cabinet marquee */}
      <div
        className="relative px-4 py-3 text-center font-pixel text-[10px] sm:text-xs text-black border-4 border-black"
        style={{ background: p.color, boxShadow: `0 0 22px ${p.color}` }}
      >
        <span className="step-blink">★</span> {p.title}{" "}
        <span className="step-blink">★</span>
      </div>

      {/* cabinet body */}
      <div
        className="relative bg-gradient-to-b from-[#24003f] to-[#0e0020] p-4 border-x-4 border-black"
        style={{ boxShadow: `inset 0 0 0 3px ${p.color}55` }}
      >
        <div
          className="flex justify-between font-pixel text-[8px] mb-2"
          style={{ color: p.color }}
        >
          <span>{p.id}</span>
          <span>CREDITS 01</span>
        </div>

        {/* screen */}
        <div
          className="relative scanlines aspect-[4/3] bg-black border-4 border-black outline outline-4 overflow-hidden"
          style={{ outlineColor: p.color }}
        >
          <ScreenArt kind={p.art} color={p.color} lines={p.lines} />
          <div className="absolute bottom-2 inset-x-0 text-center font-pixel text-[8px] text-white step-blink z-10">
            INSERT COIN
          </div>
        </div>

        <p
          className="mt-4 font-silk text-xs sm:text-sm"
          style={{ color: p.color }}
        >
          {p.sub}
        </p>
        <p className="mt-2 text-xl text-slate-300 min-h-[7.5rem] sm:min-h-[6.5rem]">
          {p.desc}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <span
              key={t}
              className="font-pixel text-[8px] px-2 py-1 bg-black border-2"
              style={{ borderColor: p.color, color: p.color }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* control panel — tombol hanya dirender jika link tersedia */}
        {(showDemo || showRepo) && (
          <div className="mt-5 pt-4 border-t-4 border-black flex flex-col sm:flex-row gap-3">
            {showDemo && (
              <motion.button
                type="button"
                disabled={!isActive}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.94 }}
                onClick={onOpenDemo}
                className="flex-1 flex items-center gap-3 text-left bg-black/60 border-2 border-white/20 p-2 hover:border-arcade-yellow"
              >
                <span className="round-btn bg-arcade-yellow flex items-center justify-center text-xs">
                  A
                </span>
                <span className="font-pixel text-[8px] leading-relaxed text-arcade-yellow">
                  PRESS A TO
                  <br />
                  VIEW DEMO <ExternalLink size={10} className="inline" />
                </span>
              </motion.button>
            )}
            {showRepo && (
              <motion.button
                type="button"
                disabled={!isActive}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.94 }}
                onClick={onOpenRepo}
                className="flex-1 flex items-center gap-3 text-left bg-black/60 border-2 border-white/20 p-2 hover:border-arcade-cyan"
              >
                <span className="round-btn bg-arcade-cyan flex items-center justify-center text-xs">
                  B
                </span>
                <span className="font-pixel text-[8px] leading-relaxed text-arcade-cyan">
                  PRESS B FOR
                  <br />
                  GITHUB REPO <Github size={10} className="inline" />
                </span>
              </motion.button>
            )}
          </div>
        )}
      </div>

      {/* cabinet base */}
      <div
        className="flex items-center justify-between px-4 py-2 bg-black border-4 border-black"
        style={{ boxShadow: `0 0 0 3px ${p.color}55` }}
      >
        <Cartridge label={p.color} size={3} />
        <div className="flex gap-1">
          <PixelHeart size={2} />
          <PixelHeart size={2} />
          <PixelHeart size={2} />
        </div>
        <Joystick size={3} />
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Carousel                                                           */
/* ------------------------------------------------------------------ */
const AUTOPLAY_MS = 6000;
const SWIPE_DISTANCE = 60;
const SWIPE_VELOCITY = 400;

export default function Portfolio() {
  const n = PROJECTS.length;
  const [index, setIndex] = useState(0);
  const [engaged, setEngaged] = useState(false); // hover / focus di dalam carousel
  const [autoplay, setAutoplay] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const goTo = useCallback((i) => setIndex(((i % n) + n) % n), [n]);
  const next = useCallback(() => setIndex((i) => (i + 1) % n), [n]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + n) % n), [n]);

  const current = PROJECTS[index];

  const openDemo = useCallback(() => {
    if (!hasLink(current.demo)) return;
    confetti({
      particleCount: 40,
      spread: 60,
      shapes: ["square"],
      colors: [current.color, "#fff"],
      scalar: 0.9,
      origin: { y: 0.7 },
    });
    window.open(current.demo, "_blank", "noopener,noreferrer");
  }, [current]);

  const openRepo = useCallback(() => {
    if (hasLink(current.repo))
      window.open(current.repo, "_blank", "noopener,noreferrer");
  }, [current]);

  // autoplay (berhenti saat hover/fokus, atau jika user minta reduced-motion)
  useEffect(() => {
    if (!autoplay || engaged || reduceMotion) return;
    const t = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [autoplay, engaged, reduceMotion, next, index]);

  // keyboard: ← → pindah slide, A = demo, B = repo (saat carousel di-hover / fokus)
  useEffect(() => {
    if (!engaged) return;
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const tag = e.target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || e.target?.isContentEditable)
        return;
      const k = e.key.toLowerCase();
      if (k === "arrowleft") prev();
      else if (k === "arrowright") next();
      else if (k === "a") openDemo();
      else if (k === "b") openRepo();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [engaged, prev, next, openDemo, openRepo]);

  const onDragEnd = (_, info) => {
    if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY)
      next();
    else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY)
      prev();
  };

  const ctrlBtn =
    "w-12 h-12 flex items-center justify-center bg-black border-4 transition-transform " +
    "hover:scale-110 active:scale-90 focus-visible:outline focus-visible:outline-4 focus-visible:outline-white";

  return (
    <section
      id="portfolio"
      className="relative py-24 px-4 sm:px-8 bg-gradient-to-b from-black via-[#12002a] to-black"
    >
      <div
        className="absolute inset-0 grid-bg opacity-25 pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl">
        <SectionTitle
          kicker="— ARCADE CABINET SELECT —"
          title="CHOOSE YOUR GAME"
          sub={`${n} cartridges loaded. Swipe or use the arrows to switch cabinet, then press A for the demo or B for the code.`}
          color="magenta"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          role="region"
          aria-roledescription="carousel"
          aria-label="Portfolio projects"
          onMouseEnter={() => setEngaged(true)}
          onMouseLeave={() => setEngaged(false)}
          onFocus={() => setEngaged(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setEngaged(false);
          }}
        >
          {/* slides: semua ditumpuk di satu sel grid, diposisikan lewat offset */}
          <div
            className="grid overflow-x-clip px-2 py-6"
            style={{ perspective: 1200 }}
          >
            {PROJECTS.map((p, i) => {
              const d = circularOffset(i, index, n);
              const isActive = d === 0;
              const visible = isActive || (isDesktop && Math.abs(d) === 1);
              const clamped = Math.max(-2, Math.min(2, d));

              return (
                <motion.div
                  key={p.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${n}`}
                  aria-hidden={!isActive}
                  className="col-start-1 row-start-1 mx-auto w-full max-w-sm sm:max-w-md"
                  style={{
                    zIndex: 10 - Math.abs(d),
                    pointerEvents: visible ? "auto" : "none",
                    cursor: isActive ? "grab" : visible ? "pointer" : "default",
                  }}
                  initial={false}
                  animate={{
                    x: `${clamped * 108}%`,
                    scale: isActive ? 1 : 0.82,
                    rotateY: isDesktop ? -clamped * 14 : 0,
                    opacity: isActive ? 1 : visible ? 0.4 : 0,
                    filter: isActive ? "blur(0px)" : "blur(1.5px)",
                  }}
                  whileHover={isActive ? { y: -8 } : undefined}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 220, damping: 26 }
                  }
                  drag={isActive ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  dragMomentum={false}
                  onDragEnd={onDragEnd}
                  onClick={() => !isActive && visible && goTo(i)}
                >
                  <div className={isActive ? "" : "pointer-events-none"}>
                    <Cabinet
                      p={p}
                      isActive={isActive}
                      onOpenDemo={openDemo}
                      onOpenRepo={openRepo}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* controls */}
          <div className="mt-4 flex items-center justify-center gap-3 sm:gap-6">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous project"
              className={ctrlBtn}
              style={{ borderColor: current.color, color: current.color }}
            >
              <ChevronLeft size={22} />
            </button>

            <div className="flex flex-col items-center gap-3 min-w-0">
              <div
                className="flex flex-wrap justify-center items-center gap-2"
                role="tablist"
                aria-label="Select project"
              >
                {PROJECTS.map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Go to ${p.title}`}
                    onClick={() => goTo(i)}
                    className="h-3 border-2 border-black transition-all duration-300 hover:scale-125"
                    style={{
                      width: i === index ? 28 : 12,
                      background: i === index ? p.color : "#3b2a5a",
                      boxShadow: i === index ? `0 0 10px ${p.color}` : "none",
                    }}
                  />
                ))}
              </div>
              <p className="font-pixel text-[9px] text-white/80">
                <span style={{ color: current.color }}>
                  {String(index + 1).padStart(2, "0")}
                </span>{" "}
                / {String(n).padStart(2, "0")}
              </p>
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Next project"
              className={ctrlBtn}
              style={{ borderColor: current.color, color: current.color }}
            >
              <ChevronRight size={22} />
            </button>
          </div>

          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={() => setAutoplay((a) => !a)}
              aria-pressed={autoplay}
              className="font-pixel text-[8px] px-3 py-2 bg-black border-2 border-white/30 text-white/70 hover:text-white hover:border-white"
            >
              AUTO-PLAY: {autoplay ? "ON" : "OFF"}
            </button>
          </div>

          {/* announce slide changes to screen readers */}
          <p className="sr-only" aria-live="polite">
            {current.title}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
