import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, Instagram, Mail } from "lucide-react";
import confetti from "canvas-confetti";
import SectionTitle from "./SectionTitle.jsx";
import { EMAIL } from "./Hero.jsx";
import { PixelStar, CoinSprite } from "./Pixel.jsx";

// TODO: replace with your real profile links / email
const POWER_UPS = [
  {
    label: "GITHUB",
    href: "https://github.com/",
    Icon: Github,
    color: "#e8e8ff",
    delay: 0,
  },
  {
    label: "LINKEDIN",
    href: "https://linkedin.com/",
    Icon: Linkedin,
    color: "#00f0ff",
    delay: 0.3,
  },
  {
    label: "INSTAGRAM",
    href: "https://instagram.com/",
    Icon: Instagram,
    color: "#ff007f",
    delay: 0.6,
  },
  {
    label: "EMAIL",
    href: "mailto:jusuffathan1909@gmail.com",
    Icon: Mail,
    color: "#ffe600",
    delay: 0.9,
  },
];

export default function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const initials = (name || "AAA")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 3)
    .padEnd(3, "_");

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.7 },
      shapes: ["square"],
      colors: ["#ff007f", "#00f0ff", "#ffe600", "#39ff14"],
    });
    setSent(true);
    const subject = `Portfolio message from ${name.trim()}`;
    const body = `Hi! I'm ${name.trim()}.\n\n${message.trim()}\n\n(sent from your arcade portfolio)`;
    const url = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setTimeout(() => {
      window.location.href = url;
    }, 700);
  };

  const inputCls =
    "w-full bg-black border-4 border-arcade-cyan text-arcade-green font-retro text-2xl px-3 py-2 " +
    "focus:outline-none focus:border-arcade-yellow focus:shadow-[0_0_16px_#ffe600] placeholder:text-slate-600";

  return (
    <section
      id="contact"
      className="relative py-24 px-4 sm:px-8 overflow-hidden"
    >
      <div
        className="absolute inset-0 grid-bg opacity-25 pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-5xl">
        <SectionTitle
          kicker="— NEW CHALLENGER APPROACHING —"
          title="ENTER YOUR NAME FOR HIGH SCORE"
          sub="Got a project, an internship or a co-op quest? Drop your name and message. It lands straight in my Gmail inbox."
          color="yellow"
        />

        <div className="grid lg:grid-cols-5 gap-10">
          {/* form */}
          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 pixel-box pixel-box-yellow p-5 sm:p-8"
          >
            <div className="text-center mb-6">
              <p className="font-pixel text-[9px] text-arcade-magenta">
                YOUR INITIALS
              </p>
              <div
                className="mt-3 flex justify-center gap-3 font-pixel text-3xl sm:text-4xl neon-yellow"
                aria-live="polite"
              >
                {initials.split("").map((c, i) => (
                  <span
                    key={i}
                    className="w-10 sm:w-12 border-b-4 border-arcade-yellow"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <label
              htmlFor="name"
              className="block font-pixel text-[9px] text-arcade-cyan mb-2"
            >
              PLAYER NAME
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={30}
              placeholder="TYPE YOUR NAME..."
              className={inputCls}
              required
            />

            <label
              htmlFor="msg"
              className="block font-pixel text-[9px] text-arcade-cyan mt-5 mb-2"
            >
              MESSAGE
            </label>
            <textarea
              id="msg"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              maxLength={500}
              placeholder="TELL ME ABOUT YOUR QUEST..."
              className={`${inputCls} resize-none`}
              required
            />

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                className="arcade-btn arcade-btn-yellow flex-1 flex items-center justify-center gap-3 text-xs"
              >
                <Send size={14} /> {sent ? "SCORE SAVED!" : "SUBMIT SCORE"}
              </motion.button>
              <motion.a
                href="mailto:jusuffathan1909@gmail.com"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                className="arcade-btn arcade-btn-green flex-1 flex items-center justify-center gap-3 text-xs"
              >
                <Mail size={14} /> EMAIL
              </motion.a>
            </div>

            {sent && (
              <p className="mt-4 text-center font-pixel text-[9px] neon-green step-blink">
                ★ OPENING EMAIL... ★
              </p>
            )}
          </motion.form>

          {/* leaderboard + power-ups */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="pixel-box pixel-box-magenta p-5"
            >
              <h3 className="font-pixel text-[10px] neon-magenta text-center mb-4">
                HIGH SCORES
              </h3>
              <ol className="font-pixel text-[9px] space-y-3">
                {[
                  ["1ST", "YOU", "999999", "#ffe600"],
                  ["2ND", "CLIENT", "850000", "#00f0ff"],
                  ["3RD", "TEAM", "720000", "#39ff14"],
                  ["4TH", "???", "000000", "#888"],
                ].map(([rank, who, pts, c]) => (
                  <li
                    key={rank}
                    className="flex justify-between"
                    style={{ color: c }}
                  >
                    <span>{rank}</span>
                    <span>{who}</span>
                    <span className="tabular-nums">{pts}</span>
                  </li>
                ))}
              </ol>
            </motion.div>

            <div>
              <p className="font-pixel text-[9px] text-arcade-green text-center mb-5">
                COLLECT POWER-UPS
              </p>
              <div className="flex flex-wrap justify-center gap-5">
                {POWER_UPS.map(({ label, href, Icon, color, delay }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    animate={{ y: [0, -12, 0] }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: "linear",
                      delay,
                    }}
                    whileHover={{ scale: 1.25, rotate: [0, -8, 8, 0] }}
                    whileTap={{ scale: 0.85 }}
                    className="relative w-14 h-14 flex items-center justify-center bg-black border-4"
                    style={{
                      borderColor: color,
                      color,
                      boxShadow: `0 0 14px ${color}, 4px 4px 0 #000`,
                    }}
                    onClick={() =>
                      confetti({
                        particleCount: 24,
                        spread: 50,
                        shapes: ["square"],
                        colors: [color],
                        scalar: 0.8,
                      })
                    }
                  >
                    <Icon size={24} />
                    <PixelStar
                      size={2}
                      color={color}
                      className="absolute -top-3 -right-3 step-blink"
                    />
                  </motion.a>
                ))}
              </div>
              <div className="mt-6 flex justify-center items-center gap-2">
                <CoinSprite size={3} />
                <span className="font-pixel text-[8px] text-arcade-yellow">
                  x 04 POWER-UPS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
