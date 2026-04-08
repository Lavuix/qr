// SVG mini-icons for QR shape types

const S = 28; // viewBox size

export const DotIcons = {
  square: (
    <svg width={S} height={S} viewBox="0 0 28 28" fill="currentColor">
      <rect x="3" y="3" width="8" height="8" />
      <rect x="13" y="3" width="8" height="8" />
      <rect x="3" y="13" width="8" height="8" />
      <rect x="13" y="13" width="8" height="8" />
    </svg>
  ),
  dots: (
    <svg width={S} height={S} viewBox="0 0 28 28" fill="currentColor">
      <circle cx="7" cy="7" r="4" />
      <circle cx="17" cy="7" r="4" />
      <circle cx="7" cy="17" r="4" />
      <circle cx="17" cy="17" r="4" />
    </svg>
  ),
  rounded: (
    <svg width={S} height={S} viewBox="0 0 28 28" fill="currentColor">
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="3" width="8" height="8" rx="2" />
      <rect x="3" y="13" width="8" height="8" rx="2" />
      <rect x="13" y="13" width="8" height="8" rx="2" />
    </svg>
  ),
  classy: (
    <svg width={S} height={S} viewBox="0 0 28 28" fill="currentColor">
      <path d="M3 7 Q3 3 7 3 H11 V11 H3 Z" />
      <path d="M13 7 Q13 3 17 3 H21 V11 H13 Z" />
      <path d="M3 17 Q3 13 7 13 H11 V21 H3 Z" />
      <path d="M13 17 Q13 13 17 13 H21 V21 H13 Z" />
    </svg>
  ),
  "classy-rounded": (
    <svg width={S} height={S} viewBox="0 0 28 28" fill="currentColor">
      <path d="M3 7 Q3 3 7 3 H11 Q11 7 11 11 Q7 11 3 11 Z" />
      <path d="M13 7 Q13 3 17 3 H21 Q21 7 21 11 Q17 11 13 11 Z" />
      <path d="M3 17 Q3 13 7 13 H11 Q11 17 11 21 Q7 21 3 21 Z" />
      <path d="M13 17 Q13 13 17 13 H21 Q21 17 21 21 Q17 21 13 21 Z" />
    </svg>
  ),
  "extra-rounded": (
    <svg width={S} height={S} viewBox="0 0 28 28" fill="currentColor">
      <rect x="3" y="3" width="8" height="8" rx="4" />
      <rect x="13" y="3" width="8" height="8" rx="4" />
      <rect x="3" y="13" width="8" height="8" rx="4" />
      <rect x="13" y="13" width="8" height="8" rx="4" />
    </svg>
  ),
} as const;

export const CornerSquareIcons = {
  square: (
    <svg width={S} height={S} viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.5">
      <rect x="4" y="4" width="20" height="20" />
    </svg>
  ),
  dot: (
    <svg width={S} height={S} viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.5">
      <circle cx="14" cy="14" r="10" />
    </svg>
  ),
  "extra-rounded": (
    <svg width={S} height={S} viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.5">
      <rect x="4" y="4" width="20" height="20" rx="7" />
    </svg>
  ),
} as const;

export const CornerDotIcons = {
  square: (
    <svg width={S} height={S} viewBox="0 0 28 28" fill="currentColor">
      <rect x="7" y="7" width="14" height="14" />
    </svg>
  ),
  dot: (
    <svg width={S} height={S} viewBox="0 0 28 28" fill="currentColor">
      <circle cx="14" cy="14" r="7" />
    </svg>
  ),
} as const;
