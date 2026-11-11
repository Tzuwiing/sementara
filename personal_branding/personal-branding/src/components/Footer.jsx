import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Rocket, PixelHeart, Ghost } from './Pixel.jsx'

export default function Footer() {
  const [count, setCount] = useState(9)
  const [launching, setLaunching] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setCount((c) => (c <= 0 ? 9 : c - 1)), 1000)
    return () => clearInterval(t)
  }, [])

  const warp = () => {
    if (launching) return
    setLaunching(true)
    confetti({ particleCount: 70, spread: 40, origin: { y: 0.95 }, shapes: ['square'], colors: ['#ff9100', '#ffe600', '#ff007f'], gravity: 1.4 })
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => setLaunching(false), 1400)
  }

  return (
    <footer className="relative pt-20 pb-10 px-4 sm:px-8 bg-gradient-to-b from-black to-[#14002a] border-t-4 border-arcade-magenta overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" aria-hidden="true" />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-pixel text-lg sm:text-2xl neon-magenta glitch-text"
        >
          THANKS FOR PLAYING!
        </motion.p>

        <div className="mt-10">
          <p className="font-pixel text-[10px] sm:text-xs text-arcade-yellow step-blink">CONTINUE?</p>
          <div className="mt-4 font-pixel text-5xl sm:text-7xl neon-cyan tabular-nums" aria-live="off">
            {count}
          </div>
          <p className="mt-3 font-pixel text-[8px] sm:text-[10px] text-slate-400 leading-relaxed">
            CONTINUE 9... 8... 7... INSERT COIN TO KEEP BUILDING
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Ghost color="#ff007f" size={3} />
          <PixelHeart size={4} />
          <PixelHeart size={4} />
          <PixelHeart size={4} />
          <Ghost color="#00f0ff" size={3} />
        </div>

        <div className="mt-12 flex justify-center">
          <motion.button
            onClick={warp}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="arcade-btn arcade-btn-cyan flex flex-col items-center gap-3 text-[10px] !px-8"
            aria-label="Warp to top"
          >
            <motion.div
              animate={launching ? { y: [0, -300], opacity: [1, 0] } : { y: [0, -6, 0] }}
              transition={launching ? { duration: 1.2, ease: 'easeIn' } : { duration: 0.8, repeat: Infinity, ease: 'linear' }}
            >
              <Rocket size={4} />
            </motion.div>
            WARP TO TOP
          </motion.button>
        </div>

        <div className="mt-14 pt-6 border-t-2 border-arcade-cyan/30 font-pixel text-[8px] sm:text-[9px] text-slate-400 leading-loose">
          <p>© {new Date().getFullYear()} PLAYER 1 · ALL RIGHTS RESERVED</p>
          <p className="mt-1">BUILT WITH REACT · TAILWIND · FRAMER MOTION · ♥</p>
          <p className="mt-1 text-arcade-green">GAME OVER? NEVER. PRESS START AGAIN.</p>
        </div>
      </div>
    </footer>
  )
}
