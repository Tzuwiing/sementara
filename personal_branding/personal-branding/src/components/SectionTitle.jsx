import React from 'react'
import { motion } from 'framer-motion'

const COLORS = {
  cyan: 'neon-cyan',
  magenta: 'neon-magenta',
  yellow: 'neon-yellow',
  green: 'neon-green',
}

export default function SectionTitle({ kicker, title, sub, color = 'cyan' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="text-center mb-14"
    >
      <p className="font-pixel text-[9px] sm:text-[10px] text-arcade-yellow step-blink mb-4">{kicker}</p>
      <h2 className={`font-pixel text-xl sm:text-3xl leading-relaxed ${COLORS[color]}`}>{title}</h2>
      {sub && <p className="mt-4 text-2xl text-slate-300 max-w-2xl mx-auto">{sub}</p>}
      <div className="mt-6 mx-auto flex items-center justify-center gap-1" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, i) => (
          <span
            key={i}
            className="block w-3 h-3"
            style={{ background: ['#ff007f', '#00f0ff', '#ffe600'][i % 3] }}
          />
        ))}
      </div>
    </motion.div>
  )
}
