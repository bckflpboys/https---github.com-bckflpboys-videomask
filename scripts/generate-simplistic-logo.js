const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Colors
const TEAL = '#31AAA9';
const TEAL_LIGHT = '#5DE2E0';
const GOLD = '#F8E0A4';
const GOLD_LIGHT = '#FFF9EA';
const CRIMSON = '#A82020';
const CRIMSON_LIGHT = '#D83434';
const BURGUNDY = '#6C1A1A';
const BURGUNDY_DARK = '#240808';
const OBSIDIAN = '#140505';

// 1. The Simplistic Play-Mask Emblem (Stand-alone or with squircle badge)
function createPlayMaskSvg({ size = 512, withBadge = true, isDark = true }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="${size}" height="${size}">
  <defs>
    <!-- Teal Gradient -->
    <linearGradient id="vmTeal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${TEAL_LIGHT}"/>
      <stop offset="100%" stop-color="${TEAL}"/>
    </linearGradient>

    <!-- Crimson to Burgundy Gradient -->
    <linearGradient id="vmCrimson" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${CRIMSON_LIGHT}"/>
      <stop offset="60%" stop-color="${CRIMSON}"/>
      <stop offset="100%" stop-color="${BURGUNDY}"/>
    </linearGradient>

    <!-- Warm Champagne Gold Gradient -->
    <linearGradient id="vmGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${GOLD_LIGHT}"/>
      <stop offset="100%" stop-color="${GOLD}"/>
    </linearGradient>

    <!-- Badge Background Gradient -->
    <linearGradient id="vmBadgeBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#220909"/>
      <stop offset="100%" stop-color="#100303"/>
    </linearGradient>
  </defs>

  ${withBadge ? `
  <!-- Sleek Squircle Icon Badge -->
  <rect x="4" y="4" width="120" height="120" rx="30" fill="url(#vmBadgeBg)"/>
  <rect x="4" y="4" width="120" height="120" rx="30" fill="none" stroke="${BURGUNDY}" stroke-width="1.5" opacity="0.6"/>
  <rect x="4" y="4" width="120" height="120" rx="30" fill="none" stroke="${GOLD}" stroke-width="0.75" opacity="0.25"/>
  ` : ''}

  <!-- Upper Visor Wing (Teal #31AAA9) -->
  <!-- A dynamic aerodynamic visor wing forming the top half of the Play arrow -->
  <path d="M 34 26
           C 34 21, 39 18, 44 21
           L 99 53
           C 105 56.5, 105 62.5, 99 64
           L 50 64
           C 42 64, 34 57, 34 49
           Z"
        fill="url(#vmTeal)"/>

  <!-- Lower Mask Chin Plate (Crimson #A82020 -> Burgundy #6C1A1A) -->
  <!-- An angular stealth mask jaw forming the bottom half of the Play arrow -->
  <path d="M 34 72
           C 34 64, 42 57, 50 57
           L 99 57
           C 105 58.5, 105 64.5, 99 68
           L 44 100
           C 39 103, 34 100, 34 95
           Z"
        fill="url(#vmCrimson)"/>

  <!-- Center Mask Visor Slit Accent (Champagne Gold #F8E0A4) -->
  <!-- The glowing optical lens / camera aperture sensor nestled in the mask -->
  <circle cx="50" cy="60.5" r="5" fill="url(#vmGold)"/>
  <rect x="61" cy="59" y="59" width="30" height="3" rx="1.5" fill="url(#vmGold)"/>
</svg>`;
}

// 2. Full Horizontal Brand Lockup with Clean Typography
function createFullHorizontalSvg({ width = 480, height = 110, theme = 'dark' }) {
  const isDark = theme === 'dark';
  const textColor = isDark ? '#FFFFFF' : '#180606';
  const subBg = isDark ? '#260B0B' : '#FDF6E2';
  const subBorder = isDark ? 'rgba(248, 224, 164, 0.25)' : 'rgba(168, 32, 32, 0.2)';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 110" width="${width}" height="${height}">
  <defs>
    <linearGradient id="hTeal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${TEAL_LIGHT}"/>
      <stop offset="100%" stop-color="${TEAL}"/>
    </linearGradient>
    <linearGradient id="hCrimson" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${CRIMSON_LIGHT}"/>
      <stop offset="60%" stop-color="${CRIMSON}"/>
      <stop offset="100%" stop-color="${BURGUNDY}"/>
    </linearGradient>
    <linearGradient id="hGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${GOLD_LIGHT}"/>
      <stop offset="100%" stop-color="${GOLD}"/>
    </linearGradient>
    <linearGradient id="hBadge" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#240909"/>
      <stop offset="100%" stop-color="#120404"/>
    </linearGradient>
  </defs>

  <!-- Left Icon Emblem (Scale 0.72) -->
  <g transform="translate(10, 10) scale(0.70)">
    <rect x="4" y="4" width="120" height="120" rx="30" fill="url(#hBadge)"/>
    <rect x="4" y="4" width="120" height="120" rx="30" fill="none" stroke="${BURGUNDY}" stroke-width="1.5" opacity="0.6"/>
    <rect x="4" y="4" width="120" height="120" rx="30" fill="none" stroke="${GOLD}" stroke-width="0.75" opacity="0.25"/>

    <path d="M 34 26 C 34 21, 39 18, 44 21 L 99 53 C 105 56.5, 105 62.5, 99 64 L 50 64 C 42 64, 34 57, 34 49 Z" fill="url(#hTeal)"/>
    <path d="M 34 72 C 34 64, 42 57, 50 57 L 99 57 C 105 58.5, 105 64.5, 99 68 L 44 100 C 39 103, 34 100, 34 95 Z" fill="url(#hCrimson)"/>
    <circle cx="50" cy="60.5" r="5" fill="url(#hGold)"/>
    <rect x="61" y="59" width="30" height="3" rx="1.5" fill="url(#hGold)"/>
  </g>

  <!-- Brand Typography -->
  <g transform="translate(112, 60)">
    <text font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
          font-weight="800" 
          font-size="36" 
          letter-spacing="-0.5">
      <tspan fill="${textColor}">Video</tspan><tspan fill="${CRIMSON}">Mask</tspan>
    </text>
    <!-- Dot in Teal -->
    <circle cx="188" cy="-10" r="3.5" fill="${TEAL}"/>
  </g>

  <!-- Subtitle Tag: Metadata Shield -->
  <g transform="translate(114, 73)">
    <rect x="0" y="0" width="148" height="18" rx="4" fill="${subBg}" stroke="${subBorder}" stroke-width="1"/>
    <circle cx="8" cy="9" r="2.5" fill="${TEAL}"/>
    <text x="17" y="12.5" 
          font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
          font-size="8.5" 
          font-weight="700" 
          letter-spacing="1.5" 
          fill="${isDark ? GOLD : CRIMSON}">METADATA SHIELD</text>
  </g>
</svg>`;
}

async function render() {
  const publicDir = path.join(__dirname, '..', 'public');
  const appDir = path.join(__dirname, '..', 'src', 'app');

  const emblemSvg = createPlayMaskSvg({ size: 512, withBadge: true });
  const emblemCleanSvg = createPlayMaskSvg({ size: 512, withBadge: false });
  const faviconSvg = createPlayMaskSvg({ size: 64, withBadge: true });
  const fullLogoDarkSvg = createFullHorizontalSvg({ theme: 'dark' });
  const fullLogoLightSvg = createFullHorizontalSvg({ theme: 'light' });

  // Write SVGs
  fs.writeFileSync(path.join(publicDir, 'logo.svg'), emblemSvg);
  fs.writeFileSync(path.join(publicDir, 'logo-clean.svg'), emblemCleanSvg);
  fs.writeFileSync(path.join(publicDir, 'logo-full.svg'), fullLogoDarkSvg);
  fs.writeFileSync(path.join(publicDir, 'logo-full-light.svg'), fullLogoLightSvg);
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg);
  fs.writeFileSync(path.join(appDir, 'icon.svg'), faviconSvg);
  fs.writeFileSync(path.join(appDir, 'apple-icon.svg'), emblemSvg);

  // Render Crisp PNGs for favicon & app icons
  const favBuffer = Buffer.from(faviconSvg);
  const emblemBuffer = Buffer.from(emblemSvg);

  const png16 = await sharp(favBuffer).resize(16, 16).png().toBuffer();
  const png32 = await sharp(favBuffer).resize(32, 32).png().toBuffer();
  const png48 = await sharp(favBuffer).resize(48, 48).png().toBuffer();
  const png180 = await sharp(emblemBuffer).resize(180, 180).png().toBuffer();
  const png192 = await sharp(emblemBuffer).resize(192, 192).png().toBuffer();
  const png512 = await sharp(emblemBuffer).resize(512, 512).png().toBuffer();

  fs.writeFileSync(path.join(publicDir, 'favicon-16x16.png'), png16);
  fs.writeFileSync(path.join(publicDir, 'favicon-32x32.png'), png32);
  fs.writeFileSync(path.join(publicDir, 'favicon-48x48.png'), png48);
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), png180);
  fs.writeFileSync(path.join(publicDir, 'android-chrome-192x192.png'), png192);
  fs.writeFileSync(path.join(publicDir, 'android-chrome-512x512.png'), png512);

  // Generate multi-resolution ICO file
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0); // reserved
  icoHeader.writeUInt16LE(1, 2); // 1 = ICO
  icoHeader.writeUInt16LE(3, 4); // 3 images

  const images = [
    { width: 16, height: 16, buffer: png16 },
    { width: 32, height: 32, buffer: png32 },
    { width: 48, height: 48, buffer: png48 },
  ];

  let offset = 6 + images.length * 16;
  const entries = [];

  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(img.buffer.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += img.buffer.length;
  }

  const icoBuffer = Buffer.concat([
    icoHeader,
    ...entries,
    ...images.map(img => img.buffer)
  ]);

  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);

  console.log('Simplistic logo & favicon suite generated successfully!');
}

render();
