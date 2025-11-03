interface SvgIconProps {
  id: string;
  className?: string;
}

const icons: Record<string, React.ReactNode> = {
  "icon-dive-tables": (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none">
      <defs>
        <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f2b400" />
          <stop offset="1" stopColor="#0b2a4a" />
        </linearGradient>
      </defs>
      <rect x="10" y="16" width="30" height="22" rx="3" stroke="url(#g1)" strokeWidth="2.5" />
      <rect x="14" y="20" width="30" height="22" rx="3" stroke="#0b2a4a" strokeWidth="2.5" />
      <path d="M18 25h18M18 31h18M18 37h12" stroke="#0b2a4a" strokeWidth="2.5" />
      <circle cx="47" cy="39" r="12" stroke="url(#g1)" strokeWidth="2.5" />
      <path d="M47 39l6-6" stroke="#0b2a4a" strokeWidth="2.5" />
    </svg>
  ),
  "icon-selection-logic": (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none">
      <defs>
        <linearGradient id="g2" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f2b400" />
          <stop offset="1" stopColor="#0b2a4a" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="26" stroke="#0b2a4a" strokeWidth="2.5" />
      <circle cx="32" cy="18" r="4" stroke="#0b2a4a" strokeWidth="2" />
      <path d="M32 22v5M28 27h8" stroke="#0b2a4a" strokeWidth="2" />
      <circle cx="20" cy="42" r="3.5" stroke="#0b2a4a" strokeWidth="2" />
      <circle cx="44" cy="42" r="3.5" stroke="#0b2a4a" strokeWidth="2" />
      <path d="M29 30l-6 10M35 30l6 10" stroke="#0b2a4a" strokeWidth="2.5" />
    </svg>
  ),
  "icon-safety-limits": (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none">
      <defs>
        <linearGradient id="g3" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f2b400" />
          <stop offset="1" stopColor="#0b2a4a" />
        </linearGradient>
      </defs>
      <path d="M16 22c0-4 6-8 16-8s16 4 16 8v14c0 8-8 12-16 16-8-4-16-8-16-16V22Z" stroke="url(#g3)" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M28 34l4 4 8-10" stroke="#0b2a4a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "icon-treatment": (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none">
      <defs>
        <linearGradient id="g4" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f2b400" />
          <stop offset="1" stopColor="#0b2a4a" />
        </linearGradient>
      </defs>
      <rect x="20" y="10" width="24" height="44" rx="2" stroke="url(#g4)" strokeWidth="2.5" />
      <rect x="24" y="14" width="16" height="36" rx="1" stroke="#0b2a4a" strokeWidth="2" />
      <path d="M26 20h12M26 27h12M26 34h12M26 41h10" stroke="#0b2a4a" strokeWidth="2" />
    </svg>
  ),
  "icon-emergency": (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none">
      <defs>
        <linearGradient id="g5" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f44" />
          <stop offset="1" stopColor="#f2b400" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="26" stroke="url(#g5)" strokeWidth="2.5" />
      <path d="M32 20v24M20 32h24" stroke="url(#g5)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  "icon-nitrox": (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" fill="none">
      <defs>
        <linearGradient id="g6" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f2b400" />
          <stop offset="1" stopColor="#0b2a4a" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="10" stroke="url(#g6)" strokeWidth="2.5" />
      <circle cx="42" cy="24" r="10" stroke="#0b2a4a" strokeWidth="2.5" />
      <circle cx="33" cy="40" r="10" stroke="#0b2a4a" strokeWidth="2.5" />
      <path d="M28 28l8 8M36 28l8 8M28 46l8-8" stroke="#0b2a4a" strokeWidth="1.5" />
    </svg>
  ),
};

export default function SvgIcon({ id, className = "w-6 h-6" }: SvgIconProps) {
  const icon = icons[id];
  
  if (!icon) {
    return null;
  }

  return (
    <div className={className}>
      {icon}
    </div>
  );
}
