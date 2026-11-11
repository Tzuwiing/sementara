import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion'
import { Lock, Check } from 'lucide-react'
import SectionTitle from './SectionTitle.jsx'
import { HeroSprite, Ghost, PixelStar } from './Pixel.jsx'

const LEVELS = [
  {
    world: 'WORLD 1-1',
    title: 'UI/UX SLICING',
    sub: 'Pixel-Perfect Figma Conversion',
    desc: 'I dissect every frame in Figma and rebuild it to the pixel: spacing, type scale, colors and assets.',
    color: '#00f0ff',
    tag: 'TUTORIAL',
  },
  {
    world: 'WORLD 1-2',
    title: 'ARCHITECTURE CRAFTING',
    sub: 'Modular React & Flutter Code',
    desc: 'Reusable components, clean folder structure and state that scales, so features snap together like blocks.',
    color: '#39ff14',
    tag: 'BUILD PHASE',
  },
  {
    world: 'WORLD 1-3',
    title: 'BOSS BATTLE: API INTEGRATION',
    sub: 'REST API & Local DB',
    desc: 'Fetching, caching and persisting data. Loading states, error handling and offline storage defeated.',
    color: '#ff007f',
    tag: 'BOSS',
    boss: true,
  },
  {
    world: 'WORLD 1-4',
    title: 'GAME CLEAR: POLISH',
    sub: 'Mobile Responsive & Optimization',
    desc: 'Every breakpoint tested, performance tuned and edge cases squashed before the final flag.',
    color: '#ffe600',
    tag: 'FINAL STAGE',
  },
]

function LevelNode({ level, index, reached }) {
  const left = index % 2 === 0
  return (
    <motion.div
      initial={{ opacity: 0, x: left ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, ease: 'linear' }}
      className={`relative md:w-1/2 pl-16 md:pl-0 ${left ? 'md:pr-16 md:mr-auto' : 'md:pl-16 md:ml-auto'}`}
    >
      {/* map pin on the path */}
      <div
        className={`absolute top-8 left-3 md:left-auto ${
          left ? 'md:-right-[1.35rem]' : 'md:-left-[1.35rem]'
        } w-9 h-9 flex items-center justify-center border-4 border-black z-10 font-pixel text-[10px] text-black`}
        style={{
          background: reached ? level.color : '#333',
          boxShadow: reached ? `0 0 16px ${level.color}` : 'none',
        }}
      >
        {reached ? <Check size={16} strokeWidth={4} /> : <Lock size={14} />}
      </div>

      <div className="pixel-box p-5 sm:p-6" style={{ '--c': level.color }}>
        <div className="flex flex-wrap items-center justify-between gap-2 font-pixel text-[8px] sm:text-[9px]">
          <span style={{ color: level.color }}>{level.world}</span>
          <span className="px-2 py-1 bg-black border-2" style={{ borderColor: level.color, color: level.color }}>
            {level.tag}
          </span>
        </div>

        <h3 className="mt-4 font-pixel text-xs sm:text-sm leading-relaxed text-white pixel-text-shadow">
          {String(index + 1).padStart(2, '0')}. {level.title}
        </h3>
        <p className="mt-2 font-silk text-xs sm:text-sm" style={{ color: level.color }}>
          {level.sub}
        </p>
        <p className="mt-3 text-xl text-slate-300">{level.desc}</p>

        {level.boss && (
          <div className="mt-4 flex items-center gap-3">
            <Ghost color="#ff007f" size={4} />
            <div className="flex-1">
              <div className="font-pixel text-[8px] text-arcade-magenta mb-1">BOSS HP</div>
              <div className="hp-bar" style={{ borderColor: '#ff007f' }}>
                <motion.div
                  className="h-full bg-arcade-magenta"
                  initial={{ width: '100%' }}
                  whileInView={{ width: '8%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.2, delay: 0.4, ease: 'linear' }}
                />
              </div>
            </div>
          </div>
        )}

        {index === LEVELS.length - 1 && (
          <div className="mt-4 flex gap-1">
            {[0, 1, 2].map((i) => (
              <PixelStar key={i} size={4} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function Workflow() {
  const trackRef = useRef(null)
  const [frame, setFrame] = useState(0)
  const [progress, setProgress] = useState(0)

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.65', 'end 0.55'],
  })
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })
  const topPct = useTransform(smooth, [0, 1], ['0%', '100%'])
  const fillH = useTransform(smooth, [0, 1], ['0%', '100%'])

  useMotionValueEvent(smooth, 'change', (v) => setProgress(v))

  // walking animation: swap sprite frame
  useEffect(() => {
    const t = setInterval(() => setFrame((f) => f + 1), 220)
    return () => clearInterval(t)
  }, [])

  // a level is "reached" once the avatar passes its position
  const reachedAt = (i) => progress >= (i + 0.35) / LEVELS.length

  return (
    <section id="workflow" className="relative py-24 px-4 sm:px-8 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-25 pointer-events-none" aria-hidden="true" />
      <div className="relative mx-auto max-w-5xl">
        <SectionTitle
          kicker="— STAGE SELECT —"
          title="MY WORKFLOW QUEST MAP"
          sub="Scroll to walk the map. Four stages from design file to shipped product."
          color="green"
        />

        <div ref={trackRef} className="relative">
          {/* path rail */}
          <div className="absolute top-0 bottom-0 left-[1.65rem] md:left-1/2 md:-translate-x-1/2 w-2 bg-[repeating-linear-gradient(to_bottom,#333_0,#333_12px,transparent_12px,transparent_20px)]" aria-hidden="true" />
          <motion.div
            className="absolute top-0 left-[1.65rem] md:left-1/2 md:-translate-x-1/2 w-2 bg-arcade-green shadow-[0_0_14px_#39ff14]"
            style={{ height: fillH }}
            aria-hidden="true"
          />

          {/* walking avatar */}
          <motion.div
            className="absolute left-[1.65rem] md:left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ top: topPct }}
            aria-hidden="true"
          >
            <div className="relative">
              <HeroSprite frame={frame} size={4} />
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-2 bg-black/70 rounded-full blur-[2px]" />
            </div>
          </motion.div>

          <div className="flex flex-col gap-16 md:gap-20 py-6">
            {LEVELS.map((level, i) => (
              <LevelNode key={level.world} level={level} index={i} reached={reachedAt(i)} />
            ))}
          </div>

          {/* goal flag */}
          <div className="relative mt-6 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="pixel-box pixel-box-yellow px-6 py-4 font-pixel text-[10px] sm:text-xs neon-yellow text-center step-blink"
            >
              ★ STAGE CLEAR ★
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
