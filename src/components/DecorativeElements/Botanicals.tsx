/** Dried and pressed flowers. Purely decorative. */

interface BotanicalProps {
  className?: string;
}

const svgProps = { 'aria-hidden': true, focusable: false } as const;

const STEMS = [
  'M62 218 C60 170 61 118 52 34',
  'M60 160 C70 130 84 108 96 76',
  'M59 128 C46 104 34 88 20 66',
  'M56 86 C64 66 72 50 82 32',
  'M55 66 C48 50 42 40 32 26',
];

const LEAVES = [
  'M60 184 C47 176 43 167 45 158 C54 162 59 171 60 184Z',
  'M61 150 C74 145 79 136 78 127 C69 131 63 139 61 150Z',
  'M57 108 C46 104 41 97 41 89 C50 92 55 99 57 108Z',
];

const TIPS: [number, number][] = [
  [52, 30],
  [97, 72],
  [19, 62],
  [83, 28],
  [31, 22],
];

// [dx, dy, radius] of the little blossoms around each stem tip
const CLUSTER: [number, number, number][] = [
  [0, 0, 5],
  [-8, 7, 4],
  [8, 6, 4.2],
  [-4, -8, 3.6],
  [7, -7, 3.4],
  [0, 12, 3],
];

function Blossom({ x, y, r, petalClass, centerClass }: { x: number; y: number; r: number; petalClass: string; centerClass: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse
          key={angle}
          cy={-r * 0.85}
          rx={r * 0.6}
          ry={r * 0.88}
          strokeWidth={0.5}
          className={petalClass}
          transform={`rotate(${angle})`}
        />
      ))}
      <circle r={r * 0.34} className={centerClass} />
    </g>
  );
}

const SPRIG_COLOURS = {
  cream: { petal: 'fill-petal-cream stroke-ink-faint/40', center: 'fill-pistil', stem: 'stroke-stem' },
  pink: { petal: 'fill-petal-pink/90 stroke-dusty/40', center: 'fill-dusty-deep/80', stem: 'stroke-stem' },
  /** dark rose, for sitting on top of photos */
  deep: { petal: 'fill-dusty stroke-dusty-deep/60', center: 'fill-burgundy', stem: 'stroke-dusty-deep/70' },
} as const;

/** Dried sprig — cream baby's breath, small pink blossoms, or dark rose. */
export function FlowerSprig({ variant = 'cream', className = '' }: BotanicalProps & { variant?: keyof typeof SPRIG_COLOURS }) {
  const pink = variant === 'pink';
  const { petal: petalClass, center: centerClass, stem: stemClass } = SPRIG_COLOURS[variant];
  const spread = pink ? 1.4 : 1;

  return (
    <svg viewBox="0 0 120 220" className={className} {...svgProps}>
      <g fill="none" className={stemClass} strokeWidth={1.3} strokeLinecap="round">
        {STEMS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g className="fill-leaf/70">
        {LEAVES.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      {TIPS.map(([tx, ty], t) =>
        CLUSTER.slice(0, pink ? 3 : CLUSTER.length).map(([dx, dy, r], c) => (
          <Blossom
            key={`${t}-${c}`}
            x={tx + dx * spread}
            y={ty + dy * spread}
            r={pink ? r * 1.45 : r}
            petalClass={petalClass}
            centerClass={centerClass}
          />
        )),
      )}
    </svg>
  );
}

/** A single flattened, translucent cosmos — like one kept between book pages. */
export function PressedFlower({ className = '' }: BotanicalProps) {
  const petals = [0, 60, 120, 180, 240, 300];
  return (
    <svg viewBox="0 0 80 104" className={className} {...svgProps}>
      <path d="M40 46c2 18-3 34 4 56" fill="none" className="stroke-stem/80" strokeWidth={1.2} strokeLinecap="round" />
      <path d="M42 72c10-6 18-4 22-10-8-2-18 2-22 10Z" className="fill-leaf/60" />
      <path d="M41 86c-9-4-15-2-20-7 7-3 16 0 20 7Z" className="fill-leaf/50" />
      {petals.map((angle) => (
        <g key={angle} transform={`rotate(${angle + 8} 40 34)`}>
          <ellipse cx="40" cy="17" rx="8.5" ry="15" className="fill-petal-pink/65 stroke-dusty/30" strokeWidth={0.6} />
          <path d="M40 31V6" className="stroke-dusty-deep/25" strokeWidth={0.6} fill="none" />
        </g>
      ))}
      <circle cx="40" cy="34" r="5" className="fill-pistil" />
      <circle cx="38.5" cy="32.5" r="1" className="fill-stem/50" />
      <circle cx="41.8" cy="35.2" r="0.9" className="fill-stem/50" />
    </svg>
  );
}
