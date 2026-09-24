import React from 'react';
import Link from 'next/link';

export interface LogoProps {
  variant?: 'icon' | 'horizontal' | 'stacked';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withLink?: boolean;
  href?: string;
  withSubtitle?: boolean;
  className?: string;
  glow?: boolean;
  theme?: 'light' | 'dark' | 'auto';
  withBadge?: boolean;
}

export const LogoEmblem: React.FC<{ 
  size?: number; 
  className?: string; 
  glow?: boolean;
  withBadge?: boolean;
}> = ({ 
  size = 40, 
  className = '', 
  glow = false,
  withBadge = true,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block select-none transition-transform duration-300 ${glow ? 'drop-shadow-[0_0_14px_rgba(49,170,169,0.5)]' : ''} ${className}`}
      aria-label="VideoMask Logo"
    >
      <defs>
        <linearGradient id="emTeal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5DE2E0" />
          <stop offset="100%" stopColor="#31AAA9" />
        </linearGradient>

        <linearGradient id="emCrimson" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D83434" />
          <stop offset="55%" stopColor="#A82020" />
          <stop offset="100%" stopColor="#6C1A1A" />
        </linearGradient>

        <linearGradient id="emGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF9EA" />
          <stop offset="100%" stopColor="#F8E0A4" />
        </linearGradient>

        <linearGradient id="emBadge" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#220909" />
          <stop offset="100%" stopColor="#100303" />
        </linearGradient>
      </defs>

      {withBadge && (
        <g id="badgeContainer">
          <rect x="4" y="4" width="120" height="120" rx="30" fill="url(#emBadge)" />
          <rect x="4" y="4" width="120" height="120" rx="30" fill="none" stroke="#6C1A1A" strokeWidth="1.5" strokeOpacity="0.6" />
          <rect x="4" y="4" width="120" height="120" rx="30" fill="none" stroke="#F8E0A4" strokeWidth="0.75" strokeOpacity="0.3" />
        </g>
      )}

      {/* Upper Visor Wing (Teal #31AAA9) */}
      <path
        d="M 34 26
           C 34 21, 39 18, 44 21
           L 99 53
           C 105 56.5, 105 62.5, 99 64
           L 50 64
           C 42 64, 34 57, 34 49
           Z"
        fill="url(#emTeal)"
      />

      {/* Lower Mask Chin Plate (Crimson #A82020 -> Burgundy #6C1A1A) */}
      <path
        d="M 34 72
           C 34 64, 42 57, 50 57
           L 99 57
           C 105 58.5, 105 64.5, 99 68
           L 44 100
           C 39 103, 34 100, 34 95
           Z"
        fill="url(#emCrimson)"
      />

      {/* Center Optical Visor Accent (Champagne Gold #F8E0A4) */}
      <circle cx="50" cy="60.5" r="5" fill="url(#emGold)" />
      <rect x="61" y="59" width="30" height="3" rx="1.5" fill="url(#emGold)" />
    </svg>
  );
};

export default function Logo({
  variant = 'horizontal',
  size = 'md',
  withLink = false,
  href = '/',
  withSubtitle = true,
  className = '',
  glow = false,
  theme = 'light',
  withBadge = true,
}: LogoProps) {
  const iconSizes = {
    sm: 30,
    md: 40,
    lg: 52,
    xl: 68,
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  const iconPx = iconSizes[size];

  const content = (
    <div
      className={`inline-flex items-center group select-none transition-all duration-200 ${
        variant === 'stacked' ? 'flex-col text-center space-y-2.5' : 'space-x-3'
      } ${className}`}
    >
      <LogoEmblem size={iconPx} glow={glow} withBadge={withBadge} className="group-hover:scale-105 transition-transform" />

      {variant !== 'icon' && (
        <div className={`flex flex-col ${variant === 'stacked' ? 'items-center' : 'items-start'}`}>
          <div className="flex items-center tracking-tight leading-none">
            <span
              className={`font-black ${textSizes[size]}`}
              style={{
                color: theme === 'dark' ? '#FFFFFF' : '#180606',
                letterSpacing: '-0.025em',
              }}
            >
              Video
            </span>
            <span
              className={`font-black ${textSizes[size]}`}
              style={{
                color: '#A82020',
                letterSpacing: '-0.025em',
                textShadow: theme === 'dark' ? '0 0 12px rgba(168, 32, 32, 0.4)' : 'none',
              }}
            >
              Mask
            </span>
            <span
              className="inline-block w-2 h-2 rounded-full ml-1"
              style={{ backgroundColor: '#31AAA9' }}
            />
          </div>

          {withSubtitle && (
            <div className="mt-1 flex items-center">
              <span
                className="text-[9px] font-bold tracking-widest uppercase rounded px-2 py-0.5 shadow-sm flex items-center gap-1.5"
                style={{
                  backgroundColor: '#260B0B',
                  color: '#F8E0A4',
                  border: '1px solid rgba(248, 224, 164, 0.35)',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full inline-block animate-pulse"
                  style={{ backgroundColor: '#31AAA9' }}
                />
                METADATA SHIELD
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (withLink) {
    return (
      <Link href={href} className="inline-block focus:outline-none focus:ring-2 focus:ring-[#31AAA9] rounded-xl">
        {content}
      </Link>
    );
  }

  return content;
}
