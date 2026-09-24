const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Brand Colors
const TEAL = '#31AAA9';
const TEAL_LIGHT = '#5DE2E0';
const TEAL_DARK = '#1C7574';
const GOLD = '#F8E0A4';
const GOLD_LIGHT = '#FFF7E6';
const GOLD_DARK = '#C9A65E';
const CRIMSON = '#A82020';
const CRIMSON_LIGHT = '#D83434';
const BURGUNDY = '#6C1A1A';
const BURGUNDY_DARK = '#3F0C0C';

// 1. Standalone Emblem SVG (512x512)
const emblemSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <!-- Gradients -->
    <linearGradient id="bgGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${BURGUNDY}" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="${BURGUNDY_DARK}" stop-opacity="0.95"/>
    </linearGradient>

    <linearGradient id="shieldRim" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${GOLD_LIGHT}"/>
      <stop offset="35%" stop-color="${GOLD}"/>
      <stop offset="70%" stop-color="${GOLD_DARK}"/>
      <stop offset="100%" stop-color="${BURGUNDY}"/>
    </linearGradient>

    <linearGradient id="visorGlass" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${TEAL_LIGHT}" stop-opacity="0.9"/>
      <stop offset="45%" stop-color="${TEAL}" stop-opacity="0.75"/>
      <stop offset="100%" stop-color="${TEAL_DARK}" stop-opacity="0.4"/>
    </linearGradient>

    <linearGradient id="maskPlateLeft" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${GOLD_LIGHT}"/>
      <stop offset="60%" stop-color="${GOLD}"/>
      <stop offset="100%" stop-color="${GOLD_DARK}"/>
    </linearGradient>

    <linearGradient id="maskPlateRight" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${GOLD}"/>
      <stop offset="70%" stop-color="${GOLD_DARK}"/>
      <stop offset="100%" stop-color="#9E7835"/>
    </linearGradient>

    <linearGradient id="crimsonBlade" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${CRIMSON_LIGHT}"/>
      <stop offset="70%" stop-color="${CRIMSON}"/>
      <stop offset="100%" stop-color="${BURGUNDY}"/>
    </linearGradient>

    <linearGradient id="burgundyBlade" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${BURGUNDY}"/>
      <stop offset="100%" stop-color="${BURGUNDY_DARK}"/>
    </linearGradient>

    <linearGradient id="playCore" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${TEAL_LIGHT}"/>
      <stop offset="60%" stop-color="${TEAL}"/>
      <stop offset="100%" stop-color="${TEAL_DARK}"/>
    </linearGradient>

    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>

    <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Outer Ambient Glow Backplate -->
  <path d="M 256 36 
           C 345 36, 420 80, 434 165
           L 446 270
           C 446 345, 380 415, 256 476
           C 132 415, 66 345, 66 270
           L 78 165
           C 92 80, 167 36, 256 36 Z" 
        fill="url(#bgGlow)" 
        filter="url(#dropShadow)"/>

  <!-- Outer Metallic Bevel Rim (Mask/Shield Crest) -->
  <path d="M 256 46 
           C 338 46, 408 86, 422 165
           L 434 266
           C 434 336, 372 400, 256 458
           C 140 400, 78 336, 78 266
           L 90 165
           C 104 86, 174 46, 256 46 Z" 
        fill="none" 
        stroke="url(#shieldRim)" 
        stroke-width="12" 
        stroke-linejoin="round"/>

  <!-- Inner Chamber Border -->
  <path d="M 256 62 
           C 328 62, 392 98, 406 168
           L 416 260
           C 416 322, 360 380, 256 438
           C 152 380, 96 322, 96 260
           L 106 168
           C 120 98, 184 62, 256 62 Z" 
        fill="#120404" 
        stroke="${BURGUNDY}" 
        stroke-width="4"/>

  <!-- Upper Visor Window (Teal HUD Screen) -->
  <path d="M 124 175 
           C 134 116, 190 84, 256 84
           C 322 84, 378 116, 388 175
           L 396 242
           C 348 265, 304 275, 256 275
           C 208 275, 164 265, 116 242 Z" 
        fill="url(#visorGlass)"/>

  <!-- Visor Tech Grid Highlights -->
  <path d="M 170 120 L 220 120 M 292 120 L 342 120" stroke="${GOLD}" stroke-width="2.5" stroke-linecap="round" opacity="0.7"/>
  <path d="M 148 150 L 195 150 M 317 150 L 364 150" stroke="${TEAL_LIGHT}" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
  <circle cx="256" cy="100" r="3" fill="${GOLD}"/>

  <!-- Central Camera Iris & Aperture Housing -->
  <g transform="translate(256, 224)">
    <!-- Outer Aperture Ring -->
    <circle r="106" fill="${BURGUNDY_DARK}" stroke="${GOLD}" stroke-width="4"/>
    <circle r="100" fill="#0A0202" stroke="${CRIMSON}" stroke-width="2"/>

    <!-- Shutter Blades (Alternating Crimson and Burgundy) -->
    <!-- Blade 1 -->
    <path d="M 0 -98 C 45 -98, 86 -70, 98 0 L 32 0 C 26 -28, 12 -54, -14 -68 Z" fill="url(#crimsonBlade)" stroke="${GOLD}" stroke-width="1.5"/>
    <!-- Blade 2 -->
    <path d="M 0 -98 C 45 -98, 86 -70, 98 0 L 32 0 C 26 -28, 12 -54, -14 -68 Z" transform="rotate(60)" fill="url(#burgundyBlade)" stroke="${GOLD}" stroke-width="1.5"/>
    <!-- Blade 3 -->
    <path d="M 0 -98 C 45 -98, 86 -70, 98 0 L 32 0 C 26 -28, 12 -54, -14 -68 Z" transform="rotate(120)" fill="url(#crimsonBlade)" stroke="${GOLD}" stroke-width="1.5"/>
    <!-- Blade 4 -->
    <path d="M 0 -98 C 45 -98, 86 -70, 98 0 L 32 0 C 26 -28, 12 -54, -14 -68 Z" transform="rotate(180)" fill="url(#burgundyBlade)" stroke="${GOLD}" stroke-width="1.5"/>
    <!-- Blade 5 -->
    <path d="M 0 -98 C 45 -98, 86 -70, 98 0 L 32 0 C 26 -28, 12 -54, -14 -68 Z" transform="rotate(240)" fill="url(#crimsonBlade)" stroke="${GOLD}" stroke-width="1.5"/>
    <!-- Blade 6 -->
    <path d="M 0 -98 C 45 -98, 86 -70, 98 0 L 32 0 C 26 -28, 12 -54, -14 -68 Z" transform="rotate(300)" fill="url(#burgundyBlade)" stroke="${GOLD}" stroke-width="1.5"/>

    <!-- Inner Core Aperture Glow -->
    <circle r="46" fill="#040D0D" stroke="${TEAL}" stroke-width="3"/>
    <circle r="44" fill="${BURGUNDY_DARK}" opacity="0.6"/>

    <!-- Central Glowing Play Triangle (The Video Core) -->
    <polygon points="-16,-28 -16,28 32,0" 
             fill="url(#playCore)" 
             stroke="${GOLD_LIGHT}" 
             stroke-width="3" 
             stroke-linejoin="round"
             filter="url(#softGlow)"/>

    <!-- Play Button Specular Glint -->
    <polygon points="-12,-20 -12,0 16,-8" 
             fill="${GOLD_LIGHT}" 
             opacity="0.75"/>
  </g>

  <!-- Lower Faceted Face Mask (The "Mask" & "V" Monogram) -->
  <g id="maskLowerGuard">
    <!-- Left Cheek/Wing Plate -->
    <polygon points="108,248 184,244 196,338 124,320" 
             fill="${BURGUNDY}" 
             stroke="${GOLD}" 
             stroke-width="2" 
             stroke-linejoin="round"/>
    
    <!-- Right Cheek/Wing Plate -->
    <polygon points="404,248 328,244 316,338 388,320" 
             fill="${BURGUNDY_DARK}" 
             stroke="${GOLD_DARK}" 
             stroke-width="2" 
             stroke-linejoin="round"/>

    <!-- Left Angular Bevel Flange -->
    <polygon points="184,244 256,276 256,360 196,338" 
             fill="url(#crimsonBlade)" 
             stroke="${GOLD}" 
             stroke-width="2" 
             stroke-linejoin="round"/>

    <!-- Right Angular Bevel Flange -->
    <polygon points="328,244 256,276 256,360 316,338" 
             fill="url(#burgundyBlade)" 
             stroke="${GOLD}" 
             stroke-width="2" 
             stroke-linejoin="round"/>

    <!-- Center Chin Guard - Left Facet (Gold Champagne Illuminated) -->
    <polygon points="256,276 172,328 190,410 256,450 256,360" 
             fill="url(#maskPlateLeft)" 
             stroke="${GOLD_LIGHT}" 
             stroke-width="3" 
             stroke-linejoin="round"/>

    <!-- Center Chin Guard - Right Facet (Gold Champagne Shaded) -->
    <polygon points="256,276 340,328 322,410 256,450 256,360" 
             fill="url(#maskPlateRight)" 
             stroke="${GOLD_DARK}" 
             stroke-width="3" 
             stroke-linejoin="round"/>

    <!-- Center Ridge Highlight Line (forming the sharp 'V') -->
    <line x1="256" y1="276" x2="256" y2="450" 
          stroke="${GOLD_LIGHT}" 
          stroke-width="3.5" 
          stroke-linecap="round"/>

    <!-- Subtle Stealth V-Cut Detail -->
    <polygon points="256,315 240,345 256,340 272,345" 
             fill="${BURGUNDY_DARK}" 
             stroke="${GOLD}" 
             stroke-width="1.5"/>
  </g>
</svg>`;

// 2. Optimized Favicon SVG (Bold, high-contrast at 16x16 - 64x64)
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" height="100%">
  <defs>
    <linearGradient id="favGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${GOLD_LIGHT}"/>
      <stop offset="100%" stop-color="${GOLD}"/>
    </linearGradient>
    <linearGradient id="favTeal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${TEAL_LIGHT}"/>
      <stop offset="100%" stop-color="${TEAL}"/>
    </linearGradient>
  </defs>

  <!-- Mask Shield Body -->
  <path d="M 32 3 
           C 46 3, 56 10, 58 22
           L 59 34
           C 59 45, 49 54, 32 61
           C 15 54, 5 45, 5 34
           L 6 22
           C 8 10, 18 3, 32 3 Z" 
        fill="${BURGUNDY_DARK}" 
        stroke="${GOLD}" 
        stroke-width="2.5" 
        stroke-linejoin="round"/>

  <!-- Upper Visor Window (Teal) -->
  <path d="M 12 22 
           C 16 12, 23 8, 32 8
           C 41 8, 48 12, 52 22
           L 53 30
           C 44 33, 38 34, 32 34
           C 26 34, 20 33, 11 30 Z" 
        fill="url(#favTeal)"/>

  <!-- Aperture Outer Ring (Crimson) -->
  <circle cx="32" cy="28" r="14" fill="${BURGUNDY}" stroke="${CRIMSON}" stroke-width="2"/>

  <!-- Center Play Button (High Contrast White/Gold with Teal Core) -->
  <polygon points="28,21 28,35 41,28" 
           fill="url(#favTeal)" 
           stroke="${GOLD_LIGHT}" 
           stroke-width="1.8" 
           stroke-linejoin="round"/>

  <!-- Lower Chin Mask Plate (V-Shape in Gold) -->
  <polygon points="32,35 19,41 21,52 32,58 32,35" 
           fill="url(#favGold)" 
           stroke="${GOLD_LIGHT}" 
           stroke-width="1.2"/>
  <polygon points="32,35 45,41 43,52 32,58 32,35" 
           fill="${GOLD_DARK}" 
           stroke="${GOLD}" 
           stroke-width="1.2"/>
  <line x1="32" y1="35" x2="32" y2="58" stroke="${GOLD_LIGHT}" stroke-width="1.5"/>
</svg>`;

// 3. Full Horizontal Brand Logo with Typography
const fullLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 120" width="100%" height="100%">
  <defs>
    <linearGradient id="textGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${GOLD_LIGHT}"/>
      <stop offset="60%" stop-color="${GOLD}"/>
      <stop offset="100%" stop-color="${GOLD_DARK}"/>
    </linearGradient>
    <linearGradient id="textTeal" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${TEAL_LIGHT}"/>
      <stop offset="100%" stop-color="${TEAL}"/>
    </linearGradient>
    <linearGradient id="badgeCrimson" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${CRIMSON}"/>
      <stop offset="100%" stop-color="${BURGUNDY}"/>
    </linearGradient>
  </defs>

  <!-- Left Emblem Scaled Down -->
  <g transform="translate(10, 8) scale(0.20)">
    ${emblemSvg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '')}
  </g>

  <!-- Typography: VideoMask -->
  <g transform="translate(135, 68)">
    <text font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
          font-weight="800" 
          font-size="44" 
          letter-spacing="-0.5">
      <tspan fill="#FFFFFF">Video</tspan><tspan fill="url(#textGold)">Mask</tspan>
    </text>
  </g>

  <!-- Subtitle Tagline Badge: METADATA SHIELD -->
  <g transform="translate(136, 82)">
    <rect x="0" y="0" width="176" height="20" rx="4" fill="url(#badgeCrimson)" opacity="0.9"/>
    <circle cx="10" cy="10" r="3.5" fill="${TEAL_LIGHT}"/>
    <text x="22" y="14" 
          font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
          font-size="9.5" 
          font-weight="700" 
          letter-spacing="2" 
          fill="${GOLD_LIGHT}">METADATA SHIELD</text>
  </g>
</svg>`;

async function buildAssets() {
  const publicDir = path.join(__dirname, '..', 'public');
  const appDir = path.join(__dirname, '..', 'src', 'app');

  // Write SVGs
  fs.writeFileSync(path.join(publicDir, 'logo.svg'), emblemSvg);
  fs.writeFileSync(path.join(publicDir, 'logo-full.svg'), fullLogoSvg);
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg);
  fs.writeFileSync(path.join(appDir, 'icon.svg'), faviconSvg);
  fs.writeFileSync(path.join(appDir, 'apple-icon.svg'), emblemSvg);

  console.log('SVG files generated successfully.');

  // Render PNGs with sharp
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

  // Generate multi-image ICO file containing 16x16, 32x32, and 48x48 PNGs
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0); // reserved
  icoHeader.writeUInt16LE(1, 2); // image type: 1 = ICO
  icoHeader.writeUInt16LE(3, 4); // count: 3 images

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
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // image size
    entry.writeUInt32LE(offset, 12); // image offset
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

  console.log('All PNGs and ICO files successfully created!');
}

buildAssets().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
