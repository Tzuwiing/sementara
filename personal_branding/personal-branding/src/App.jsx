import React from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Workflow from './components/Workflow.jsx'
import Portfolio from './components/Portfolio.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="relative min-h-screen bg-arcade-black text-slate-100 crt-flicker">
      {/* Global CRT effects */}
      <div className="crt-overlay" aria-hidden="true" />
      <div className="crt-vignette" aria-hidden="true" />

      <Navbar />
      <main>
        <Hero />
        <About />
        <Workflow />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
