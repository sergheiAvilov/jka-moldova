import { useId } from 'react';

/**
 * JKA Moldova SVG logo — horizontal layout (emblem left, text right).
 * prop `dark` — use on dark backgrounds (white "JKA MOLDOVA" text)
 * prop `dark={false}` — use on light backgrounds (black text)
 */
export default function JKALogo({ className, style, dark = false }) {
  const uid = useId().replace(/:/g, 'x');
  const gradId = `jkaG${uid}`;
  const clipId = `jkaC${uid}`;

  const textMain = dark ? '#ffffff'               : '#111111';
  const textSub  = dark ? 'rgba(255,255,255,0.45)' : 'rgba(10,10,10,0.55)';

  /* ── Sphere ── */
  const R  = 52;
  const cx = 60;
  const cy = 58;
  const sr = 30;
  const sx = cx;
  const sy = cy - R + sr; /* 36 — top of sun flush with top of sphere */

  /* ── Text layout ── */
  const textX    = 126;
  const titleLen = 305;  /* locks "JKA MOLDOVA" width → precise gap to flag */
  const flagGap  = 16;   /* small gap between text end and flag */
  const flagX    = textX + titleLen + flagGap; /* = 447 */

  /* ── Flag dimensions (1:2 ratio — real Moldova flag image) ── */
  const fw = 50;   /* flag width  */
  const fh = 25;   /* flag height (fw / 2 = correct 1:2 ratio) */
  const fy = 24;   /* flag top y  */

  return (
    <svg
      viewBox="0 0 500 116"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      aria-label="JKA Moldova"
    >
      <defs>
        <radialGradient id={gradId} cx="36%" cy="28%" r="66%">
          <stop offset="0%"   stopColor="#f8f8f8"/>
          <stop offset="44%"  stopColor="#d2d2d2"/>
          <stop offset="100%" stopColor="#9a9a9a"/>
        </radialGradient>
        <clipPath id={clipId}>
          <circle cx={cx} cy={cy} r={R}/>
        </clipPath>
      </defs>

      {/* ── Gray sphere ── */}
      <circle cx={cx} cy={cy} r={R} fill={`url(#${gradId})`}/>

      {/* ── Red sun — centred at top of sphere ── */}
      <circle cx={sx} cy={sy} r={sr} fill="#C0392B" clipPath={`url(#${clipId})`}/>

      {/* ── JKA MOLDOVA — width locked so flag gap is exact ── */}
      <text
        x={textX} y="48"
        textAnchor="start"
        fontFamily="'Cinzel', 'Trajan Pro', Georgia, serif"
        fontWeight="900"
        fontSize="40"
        fill={textMain}
        letterSpacing="1"
        textLength={titleLen}
        lengthAdjust="spacing"
      >
        JKA MOLDOVA
      </text>

      {/* ── Moldova flag — real image (place flag-md.png in /public/) ── */}
      <image
        href="/flag-md.png"
        x={flagX}
        y={fy}
        width={fw}
        height={fh}
        preserveAspectRatio="xMidYMid meet"
      />

      {/* ── JAPAN KARATE ASSOCIATION ── */}
      <text
        x={textX} y="76"
        textAnchor="start"
        fontFamily="'Cinzel', 'Trajan Pro', Georgia, serif"
        fontWeight="700"
        fontSize="16"
        fill="#C0392B"
        letterSpacing="1.5"
      >
        JAPAN KARATE ASSOCIATION
      </text>

      {/* ── Japanese subtitle ── */}
      <text
        x={textX} y="99"
        textAnchor="start"
        fontFamily="'Noto Serif JP', 'Yu Mincho', serif"
        fontSize="14"
        fill={textSub}
        letterSpacing="1.5"
      >
        公益社団法人 日本空手協会
      </text>
    </svg>
  );
}
