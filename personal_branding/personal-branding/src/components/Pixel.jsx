import React from "react";

/**
 * Renders a pixel-art sprite from an array of strings.
 * Each character maps to a color in `palette`; '.' (or space) is transparent.
 */
export function Sprite({ map, palette, size = 4, className = "", style = {} }) {
  const rows = map.length;
  const cols = Math.max(...map.map((r) => r.length));
  const rects = [];
  map.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const ch = row[x];
      if (ch === "." || ch === " " || !palette[ch]) continue;
      rects.push(
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width="1.02"
          height="1.02"
          fill={palette[ch]}
        />,
      );
    }
  });
  return (
    <svg
      viewBox={`0 0 ${cols} ${rows}`}
      width={cols * size}
      height={rows * size}
      className={`pixelated ${className}`}
      style={{ shapeRendering: "crispEdges", ...style }}
      aria-hidden="true"
    >
      {rects}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Sprite maps                                                         */
/* ------------------------------------------------------------------ */

// Ghost with eyes (W = white, B = pupil)
const GHOST_ROWS = [
  "...######...",
  "..########..",
  ".##########.",
  ".#WW####WW#.",
  "##WWB##WWB##",
  "##WWW##WWW##",
  "############",
  "############",
  "############",
  "##.##..##.##",
  "#...#..#...#",
];

export function Ghost({ color = "#ff007f", size = 5, className = "" }) {
  return (
    <Sprite
      map={GHOST_ROWS}
      palette={{ "#": color, W: "#ffffff", B: "#0033ff" }}
      size={size}
      className={className}
    />
  );
}

const INVADER = [
  "..#.....#..",
  "...#...#...",
  "..#######..",
  ".##.###.##.",
  "###########",
  "#.#######.#",
  "#.#.....#.#",
  "...##.##...",
];

export function Invader({ color = "#39ff14", size = 5, className = "" }) {
  return (
    <Sprite
      map={INVADER}
      palette={{ "#": color }}
      size={size}
      className={className}
    />
  );
}

const HEART = [
  ".##...##.",
  "####.####",
  "#########",
  "#########",
  ".#######.",
  "..#####..",
  "...###...",
  "....#....",
];

export function PixelHeart({
  color = "#ff0044",
  size = 3,
  empty = false,
  className = "",
}) {
  return (
    <Sprite
      map={HEART}
      palette={{ "#": empty ? "#3a0014" : color }}
      size={size}
      className={className}
    />
  );
}

const STAR = [
  "....#....",
  "....#....",
  "...###...",
  "#########",
  ".#######.",
  "..#####..",
  ".###.###.",
  ".##...##.",
];

export function PixelStar({ color = "#ffe600", size = 4, className = "" }) {
  return (
    <Sprite
      map={STAR}
      palette={{ "#": color }}
      size={size}
      className={className}
    />
  );
}

const COIN_FULL = [
  "..YYYY..",
  ".YYYYYY.",
  "YYYddYYY",
  "YYdYYdYY",
  "YYdYYdYY",
  "YYYddYYY",
  ".YYYYYY.",
  "..YYYY..",
];

export function CoinSprite({ size = 4, className = "" }) {
  return (
    <Sprite
      map={COIN_FULL}
      palette={{ Y: "#ffe600", d: "#b39b00" }}
      size={size}
      className={className}
    />
  );
}

const JOYSTICK = [
  "...RR...",
  "..RRRR..",
  "..RRRR..",
  "...RR...",
  "...GG...",
  "...GG...",
  "...GG...",
  "PPPPPPPP",
  "PBBBBBBP",
  "PPPPPPPP",
];

export function Joystick({ size = 4, className = "" }) {
  return (
    <Sprite
      map={JOYSTICK}
      palette={{ R: "#ff007f", G: "#bbbbbb", P: "#00f0ff", B: "#003a40" }}
      size={size}
      className={className}
    />
  );
}

const CARTRIDGE = [
  ".PPPPPPPPPP.",
  "PPPPPPPPPPPP",
  "PWWWWWWWWWWP",
  "PWMMMMMMMMWP",
  "PWMMMMMMMMWP",
  "PWMMMMMMMMWP",
  "PWWWWWWWWWWP",
  "PPPPPPPPPPPP",
  "PPPPPPPPPPPP",
  ".PP.PP.PP.PP",
];

export function Cartridge({
  body = "#4b4b6b",
  label = "#ff007f",
  size = 4,
  className = "",
}) {
  return (
    <Sprite
      map={CARTRIDGE}
      palette={{ P: body, W: "#dcdcff", M: label }}
      size={size}
      className={className}
    />
  );
}

const ROCKET = [
  "....##....",
  "...####...",
  "..##WW##..",
  "..##WW##..",
  "..######..",
  "..######..",
  ".########.",
  "##########",
  "##.####.##",
  "#..####..#",
  "...O..O...",
  "..OYOOYO..",
  "...Y..Y...",
];

export function Rocket({ size = 4, className = "" }) {
  return (
    <Sprite
      map={ROCKET}
      palette={{ "#": "#ff007f", W: "#00f0ff", O: "#ff9100", Y: "#ffe600" }}
      size={size}
      className={className}
    />
  );
}

const PACMAN_OPEN = [
  "...#####...",
  "..#######..",
  ".#####.....",
  "#####......",
  "####.......",
  "####.......",
  "#####......",
  ".#####.....",
  "..#######..",
  "...#####...",
];
const PACMAN_CLOSED = [
  "...#####...",
  "..#######..",
  ".#########.",
  "###########",
  "###########",
  "###########",
  "###########",
  ".#########.",
  "..#######..",
  "...#####...",
];

export function PacMan({ open = true, size = 5, className = "" }) {
  return (
    <Sprite
      map={open ? PACMAN_OPEN : PACMAN_CLOSED}
      palette={{ "#": "#ffe600" }}
      size={size}
      className={className}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Hero avatar: rambut cokelat tanpa topi + kacamata cyan/hitam         */
/* H = rambut, G = bingkai kacamata, K = lensa, S = kulit, M = mulut    */
/* B = baju, P = celana                                                 */
/* ------------------------------------------------------------------ */

const HERO_A = [
  "...HHHH...",
  "..HHHHHH..",
  ".HHHHHHHH.",
  ".HHSSSSHH.",
  ".GKKGGKKG.",
  "..SSMMSS..",
  "..BBBBBB..",
  ".BBBBBBBB.",
  "SBBBBBBBBS",
  "SBBBBBBBBS",
  "..BB..BB..",
  "..PP..PP..",
  ".PPP..PPP.",
];
const HERO_B = [
  "...HHHH...",
  "..HHHHHH..",
  ".HHHHHHHH.",
  ".HHSSSSHH.",
  ".GKKGGKKG.",
  "..SSMMSS..",
  "..BBBBBB..",
  ".BBBBBBBB.",
  "SBBBBBBBBS",
  "SBBBBBBBBS",
  "..BBBBBB..",
  "...PPPP...",
  "..PPPPPP..",
];

export function HeroSprite({ frame = 0, size = 5, className = "" }) {
  return (
    <Sprite
      map={frame % 2 === 0 ? HERO_A : HERO_B}
      palette={{
        H: "#2b1a12", // rambut cokelat tua
        G: "#00f0ff", // bingkai kacamata (cyan)
        K: "#000000", // lensa kacamata (hitam)
        S: "#ffcc99",
        M: "#cc3355",
        B: "#00f0ff",
        P: "#3a3aff",
      }}
      size={size}
      className={className}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Tech icons — hand-drawn 12x12 pixel emblems                          */
/* ------------------------------------------------------------------ */

const ICON_MAPS = {
  react: {
    map: [
      "....####....",
      "..##....##..",
      ".#..####..#.",
      "#..#.##.#..#",
      "#.#..##..#.#",
      "#.#.####.#.#",
      "#.#.####.#.#",
      "#.#..##..#.#",
      "#..#.##.#..#",
      ".#..####..#.",
      "..##....##..",
      "....####....",
    ],
    palette: { "#": "#00f0ff" },
  },
  tailwind: {
    map: [
      "............",
      "...####.....",
      "..######..##",
      ".###..#####.",
      ".###..##....",
      "..####......",
      "....####....",
      ".....#####..",
      "..##..##.##.",
      ".#####..###.",
      "..####.####.",
      "....####....",
    ],
    palette: { "#": "#38bdf8" },
  },
  flutter: {
    map: [
      "......####..",
      ".....####...",
      "....####....",
      "...####.....",
      "..####......",
      ".####.......",
      "..####......",
      "...####.##..",
      "....####.##.",
      ".....###.##.",
      "......##.##.",
      ".......####.",
    ],
    palette: { "#": "#54c5f8" },
  },
  js: {
    map: [
      "############",
      "############",
      "############",
      "#########.##",
      "#########.##",
      "#########.##",
      "#.#.######.#",
      "#.#.#.####.#",
      "#.#.#.#..###",
      "#...##..####",
      "###########.",
      "############",
    ],
    palette: { "#": "#ffe600", ".": "#111111" },
  },
  html: {
    map: [
      "############",
      "#..........#",
      "#.#..#.##..#",
      "#.#..#.#.#.#",
      "#.####.#.#.#",
      "#.#..#.#.#.#",
      "#.#..#.##..#",
      "#..........#",
      "#.########.#",
      "#..........#",
      "#..........#",
      "############",
    ],
    palette: { "#": "#ff6a2b", ".": "#2b0f00" },
  },
  figma: {
    map: [
      "..####.####.",
      ".######.####",
      ".######.####",
      "..####.####.",
      ".######.....",
      ".######.....",
      "..####.####.",
      ".######.####",
      ".######.####",
      "..####.####.",
      ".######.....",
      "..####......",
    ],
    palette: { "#": "#ff007f" },
  },
  github: {
    map: [
      "..########..",
      ".##########.",
      "############",
      "############",
      "############",
      "############",
      "############",
      ".##########.",
      "..###..###..",
      "..###..###..",
      "...##..##...",
      "...##..##...",
    ],
    palette: { "#": "#e8e8ff" },
  },
};

export function TechIcon({ name, size = 5, className = "" }) {
  const icon = ICON_MAPS[name];
  if (!icon) return null;
  return (
    <Sprite
      map={icon.map}
      palette={icon.palette}
      size={size}
      className={className}
    />
  );
}
