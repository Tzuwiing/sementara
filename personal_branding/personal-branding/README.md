# 90s Arcade Portfolio

React + Vite + Tailwind CSS (v3) + Framer Motion + Lucide React + canvas-confetti.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Make it yours (search for `TODO`)

| File | What to change |
| --- | --- |
| `src/components/Hero.jsx` | `EMAIL` (alamat Gmail untuk semua tombol kontak) |
| `src/components/Portfolio.jsx` | `demo` and `repo` URLs for each of the 4 projects |
| `src/components/Contact.jsx` | GitHub / LinkedIn / Instagram / email links in `POWER_UPS` |
| `src/components/Hero.jsx` | Headline text in `full` if you want a different title |

## Structure

```
src/
  App.jsx                 page assembly + global CRT overlay
  index.css               scanlines, CRT flicker, pixel borders, neon text, arcade buttons
  components/
    Pixel.jsx             pixel-art sprites (ghost, invader, heart, star, coin, rocket, tech icons)
    SectionTitle.jsx      shared section heading
    Navbar.jsx            HUD: score / lives / live stage counter + INSERT COIN
    Hero.jsx              "Player 1 Ready" CRT cabinet screen
    About.jsx             Item Shop / tech stack inventory
    Workflow.jsx          Quest map, avatar walks as you scroll
    Portfolio.jsx         4 arcade cabinets (hover + press A / B keys)
    Contact.jsx           High-score form -> email (mailto), power-up social links
    Footer.jsx            Continue countdown + rocket "WARP TO TOP"
```

## Notes

- Fonts load from Google Fonts (Press Start 2P, Silkscreen, VT323).
- Animations respect `prefers-reduced-motion` for the CRT flicker and bobbing.
- The contact form has no backend: it opens your email app with the message pre-filled.
