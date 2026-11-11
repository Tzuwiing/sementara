import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Coins } from 'lucide-react'
import SectionTitle from './SectionTitle.jsx'
import { TechIcon, PixelStar } from './Pixel.jsx'

const RARITY = {
  LEGENDARY: { color: '#ffe600', cls: 'pixel-box-yellow', text: 'neon-yellow', stars: 5 },
  EPIC: { color: '#ff007f', cls: 'pixel-box-magenta', text: 'neon-magenta', stars: 4 },
  RARE: { color: '#00f0ff', cls: '', text: 'neon-cyan', stars: 3 },
  UNCOMMON: { color: '#39ff14', cls: 'pixel-box-green', text: 'neon-green', stars: 2 },
}

const ITEMS = [
  { name: 'REACT JS', icon: 'react', rarity: 'LEGENDARY', level: 85, desc: 'Hooks, components & state. My main weapon.', price: 900 },
  { name: 'TAILWIND CSS', icon: 'tailwind', rarity: 'LEGENDARY', level: 90, desc: 'Utility-first styling at warp speed.', price: 850 },
  { name: 'FLUTTER', icon: 'flutter', rarity: 'EPIC', level: 75, desc: 'One codebase, two platforms. Mobile magic.', price: 700 },
  { name: 'JAVASCRIPT', icon: 'js', rarity: 'EPIC', level: 80, desc: 'ES6+, async/await, the language of the realm.', price: 650 },
  { name: 'HTML / CSS', icon: 'html', rarity: 'RARE', level: 92, desc: 'Semantic markup and responsive layouts.', price: 400 },
  { name: 'FIGMA', icon: 'figma', rarity: 'RARE', level: 78, desc: 'Design handoff, slicing & pixel-perfect specs.', price: 450 },
  { name: 'GITHUB', icon: 'github', rarity: 'UNCOMMON', level: 82, desc: 'Version control, branches & pull requests.', price: 300 },
]

function ItemCard({ item, index }) {
  const [hover, setHover] = useState(false)
  const r = RARITY[item.rarity]

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.08 }}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.97 }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      className={`relative pixel-box ${r.cls} p-5 cursor-pointer group`}
      style={{ '--c': r.color }}
    >
      {/* animated glow border */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-2 border-4"
        style={{ borderColor: r.color }}
        animate={{ opacity: hover ? [1, 0.2, 1] : 0 }}
        transition={{ duration: 0.6, repeat: hover ? Infinity : 0, ease: 'linear' }}
      />

      <div className="flex items-start justify-between gap-2">
        <span className="font-pixel text-[8px] text-slate-400">SLOT {String(index + 1).padStart(2, '0')}</span>
        <span className={`font-pixel text-[8px] ${r.text}`}>{item.rarity} ITEM</span>
      </div>

      <div className="my-6 flex justify-center">
        <motion.div
          animate={hover ? { y: [0, -10, 0], rotate: [0, -4, 4, 0] } : { y: 0 }}
          transition={{ duration: 0.6, repeat: hover ? Infinity : 0, ease: 'linear' }}
          className="p-4 bg-black border-4 border-black outline outline-2"
          style={{ outlineColor: r.color }}
        >
          <TechIcon name={item.icon} size={7} />
        </motion.div>
      </div>

      <h3 className={`font-pixel text-xs sm:text-sm text-center ${r.text}`}>{item.name}</h3>

      <div className="flex justify-center gap-1 mt-3" aria-label={`${r.stars} of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <PixelStar key={i} size={2} color={i < r.stars ? r.color : '#2a2a3a'} />
        ))}
      </div>

      <p className="mt-4 text-xl text-slate-300 text-center min-h-[3.5rem]">{item.desc}</p>

      <div className="mt-4">
        <div className="flex justify-between font-pixel text-[8px] mb-1" style={{ color: r.color }}>
          <span>PWR</span>
          <span>{item.level}/100</span>
        </div>
        <div className="hp-bar" style={{ borderColor: r.color }}>
          <motion.div
            className="h-full"
            style={{
              background: `repeating-linear-gradient(90deg, ${r.color} 0, ${r.color} 8px, #000 8px, #000 10px)`,
            }}
            initial={{ width: 0 }}
            whileInView={{ width: `${item.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: 'linear' }}
          />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between font-pixel text-[8px] text-arcade-yellow">
        <span className="flex items-center gap-1">
          <Coins size={12} /> {item.price}G
        </span>
        <span className={hover ? 'step-blink' : 'opacity-60'}>{hover ? '★ EQUIPPED' : 'IN BAG'}</span>
      </div>
    </motion.article>
  )
}

export default function About() {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-8 bg-gradient-to-b from-black via-[#0b0020] to-black">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl">
        <SectionTitle
          kicker="— ITEM SHOP —"
          title="TECH STACK INVENTORY"
          sub="Welcome, traveler! Browse my loadout. Every item is battle-tested in real projects."
          color="yellow"
        />

        <div className="mb-10 pixel-box pixel-box-green p-4 flex flex-wrap items-center justify-between gap-3 font-pixel text-[9px] sm:text-[10px]">
          <span className="neon-green">SHOPKEEPER:</span>
          <span className="text-slate-200 leading-relaxed">"HOVER AN ITEM TO EQUIP IT!"</span>
          <span className="neon-yellow step-blink">GOLD: 9999G</span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {ITEMS.map((item, i) => (
            <ItemCard key={item.name} item={item} index={i} />
          ))}

          {/* locked slot */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pixel-box p-5 flex flex-col items-center justify-center text-center opacity-60 min-h-[18rem]"
            style={{ '--c': '#555' }}
          >
            <span className="font-pixel text-3xl text-slate-500 step-blink">?</span>
            <p className="mt-4 font-pixel text-[9px] text-slate-400 leading-relaxed">
              LOCKED SLOT<br />NEW SKILLS<br />LOADING...
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
