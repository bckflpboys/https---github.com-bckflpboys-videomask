const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Design A: The Dual-Facet Visor Play (Two sleek sweeping wings forming a Play Triangle with a golden visor slit)
const designA = (size = 512, bg = 'transparent') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="${size}" height="${size}">
  ${bg !== 'transparent' ? `<rect width="120" height="120" rx="28" fill="${bg}"/>` : ''}
  <defs>
    <linearGradient id="gTealA" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4AD6D4"/>
      <stop offset="100%" stop-color="#31AAA9"/>
    </linearGradient>
    <linearGradient id="gCrimsonA" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D63333"/>
      <stop offset="50%" stop-color="#A82020"/>
      <stop offset="100%" stop-color="#6C1A1A"/>
    </linearGradient>
    <linearGradient id="gGoldA" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF5DB"/>
      <stop offset="100%" stop-color="#F8E0A4"/>
    </linearGradient>
  </defs>

  <!-- Upper Teal Visor Wing -->
  <path d="M 32 24
           C 32 19, 37 16, 42 19
           L 93 52
           C 98 55, 98 60, 93 62
           L 44 62
           C 37 62, 32 57, 32 50
           Z" 
        fill="url(#gTealA)"/>

  <!-- Lower Crimson/Burgundy Mask Wing -->
  <path d="M 32 70
           C 32 63, 37 58, 44 58
           L 93 58
           C 98 60, 98 65, 93 68
           L 42 101
           C 37 104, 32 101, 32 96
           Z" 
        fill="url(#gCrimsonA)"/>

  <!-- Sleek Champagne Gold Focus Accent -->
  <circle cx="48" cy="60" r="5" fill="url(#gGoldA)"/>
  <rect x="58" y="58.5" width="26" height="3" rx="1.5" fill="url(#gGoldA)"/>
</svg>`;

// Design B: The Minimalist Shield-Mask with Negative Space Play
// A clean modern rounded shield with dual mask eye slits that seamlessly form a play button
const designB = (size = 512, bg = 'transparent') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="${size}" height="${size}">
  <defs>
    <linearGradient id="gTealB" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#55DCDA"/>
      <stop offset="100%" stop-color="#31AAA9"/>
    </linearGradient>
    <linearGradient id="gRedB" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D32F2F"/>
      <stop offset="60%" stop-color="#A82020"/>
      <stop offset="100%" stop-color="#6C1A1A"/>
    </linearGradient>
    <linearGradient id="gGoldB" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF9E8"/>
      <stop offset="100%" stop-color="#F8E0A4"/>
    </linearGradient>
  </defs>

  <!-- Rounded Squircle Badge Base in Deep Dark Burgundy -->
  <rect x="8" y="8" width="104" height="104" rx="28" fill="#1A0707"/>
  <rect x="8" y="8" width="104" height="104" rx="28" fill="none" stroke="#6C1A1A" stroke-width="2"/>

  <!-- Top Mask Visor Arc (Teal) -->
  <path d="M 28 42 C 28 32, 42 26, 60 26 C 78 26, 92 32, 92 42 C 92 48, 86 52, 78 52 C 68 52, 60 46, 60 46 C 60 46, 52 52, 42 52 C 34 52, 28 48, 28 42 Z" 
        fill="url(#gTealB)"/>

  <!-- Forward Play Triangle (Negative space transformed into radiant Play Arrow in Center) -->
  <path d="M 48 44 C 48 40, 52 38, 56 40 L 78 56 C 81 58, 81 62, 78 64 L 56 80 C 52 82, 48 80, 48 76 Z" 
        fill="url(#gGoldB)"/>

  <!-- Lower Mask Chevron / Chin (Crimson & Burgundy) -->
  <path d="M 32 66 L 44 66 L 60 84 L 76 66 L 88 66 L 64 94 C 62 96, 58 96, 56 94 Z" 
        fill="url(#gRedB)"/>
</svg>`;

// Design C: The Ultra-Clean "V-Mask Play" (Monogram + Mask + Play)
// Pure iconic geometry: A bold 'V' where the right arm extends forward into a play triangle ▶
const designC = (size = 512, bg = 'transparent') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="${size}" height="${size}">
  <defs>
    <linearGradient id="gTealC" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#5FE3E1"/>
      <stop offset="100%" stop-color="#31AAA9"/>
    </linearGradient>
    <linearGradient id="gCrimsonC" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E53935"/>
      <stop offset="60%" stop-color="#A82020"/>
      <stop offset="100%" stop-color="#6C1A1A"/>
    </linearGradient>
    <linearGradient id="gGoldC" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF8E7"/>
      <stop offset="100%" stop-color="#F8E0A4"/>
    </linearGradient>
    <linearGradient id="gDarkC" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6C1A1A"/>
      <stop offset="100%" stop-color="#2D0A0A"/>
    </linearGradient>
  </defs>

  ${bg !== 'transparent' ? `<rect width="120" height="120" rx="28" fill="${bg}"/>` : ''}

  <!-- Left Mask Wing / Left stroke of V (Teal #31AAA9) -->
  <path d="M 22 28
           C 22 22, 28 18, 34 22
           L 58 66
           C 60 70, 58 76, 52 76
           L 38 76
           C 34 76, 30 73, 28 69
           L 18 36
           C 16 31, 18 28, 22 28 Z" 
        fill="url(#gTealC)"/>

  <!-- Right Play Arrow Mask / Main Body (Crimson #A82020 -> Burgundy #6C1A1A) -->
  <path d="M 44 26
           C 44 20, 51 17, 56 20
           L 102 54
           C 107 58, 107 64, 102 68
           L 56 100
           C 51 103, 44 100, 44 94
           L 44 76
           L 68 60
           L 44 44
           Z" 
        fill="url(#gCrimsonC)"/>

  <!-- Inner Golden Visor Shutter (Warm Champagne #F8E0A4) -->
  <polygon points="48,46 66,59 66,61 48,74" fill="url(#gGoldC)"/>
  
  <!-- Subtle Burgundy Shadow under Left Wing -->
  <path d="M 44 64 L 54 64 L 46 80 L 40 80 Z" fill="url(#gDarkC)" opacity="0.6"/>
</svg>`;

// Design D: The Modern Pure Geometric Mask-Play (The absolute pinnacle of simplicity & elegance)
// A sleek rounded horizontal visor mask where the two eye/lens apertures frame a sharp play button
const designD = (size = 512, bg = 'transparent') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="${size}" height="${size}">
  <defs>
    <linearGradient id="dTeal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#55E2E0"/>
      <stop offset="100%" stop-color="#31AAA9"/>
    </linearGradient>
    <linearGradient id="dGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFF9E6"/>
      <stop offset="50%" stop-color="#F8E0A4"/>
      <stop offset="100%" stop-color="#E0C074"/>
    </linearGradient>
    <linearGradient id="dCrimson" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E53935"/>
      <stop offset="60%" stop-color="#A82020"/>
      <stop offset="100%" stop-color="#6C1A1A"/>
    </linearGradient>
    <linearGradient id="dBurgundy" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6C1A1A"/>
      <stop offset="100%" stop-color="#240707"/>
    </linearGradient>
    <linearGradient id="dBadgeBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E0808"/>
      <stop offset="100%" stop-color="#0E0303"/>
    </linearGradient>
  </defs>

  ${bg !== 'transparent' ? `<rect width="120" height="120" rx="28" fill="${bg}"/>` : ''}

  <!-- Outer Mask Shield (Minimalist, sleek, modern rounded silhouette) -->
  <!-- Left Visor Sweep (Teal #31AAA9) -->
  <path d="M 20 40
           C 20 28, 38 22, 60 22
           C 66 22, 70 23, 72 25
           C 74 27, 72 31, 68 33
           C 56 38, 38 46, 32 60
           C 28 69, 28 80, 36 86
           C 40 89, 38 94, 33 93
           C 22 90, 20 74, 20 60
           Z" 
        fill="url(#dTeal)"/>

  <!-- Right Mask Wing (Crimson #A82020 -> Burgundy #6C1A1A) -->
  <path d="M 100 40
           C 100 28, 82 22, 60 22
           C 54 22, 50 23, 48 25
           C 46 27, 48 31, 52 33
           C 64 38, 82 46, 88 60
           C 92 69, 92 80, 84 86
           C 80 89, 82 94, 87 93
           C 98 90, 100 74, 100 60
           Z" 
        fill="url(#dCrimson)"/>

  <!-- Center Floating Play Symbol (Champagne Gold #F8E0A4) -->
  <path d="M 50 42
           C 50 38, 54 36, 58 38
           L 78 56
           C 81 58, 81 62, 78 64
           L 58 82
           C 54 84, 50 82, 50 78
           Z" 
        fill="url(#dGold)"/>

  <!-- Sleek Visor Bridge Dot (Teal) -->
  <circle cx="60" cy="28" r="3" fill="url(#dTeal)"/>
</svg>`;

async function run() {
  const scratchDir = path.join(__dirname, '..', 'public', 'test-logos');
  if (!fs.existsSync(scratchDir)) fs.mkdirSync(scratchDir, { recursive: true });

  await sharp(Buffer.from(designA(512, '#110404'))).png().toFile(path.join(scratchDir, 'design-a-dark.png'));
  await sharp(Buffer.from(designA(512, '#FFFFFF'))).png().toFile(path.join(scratchDir, 'design-a-light.png'));
  await sharp(Buffer.from(designB(512))).png().toFile(path.join(scratchDir, 'design-b.png'));
  await sharp(Buffer.from(designC(512, '#110404'))).png().toFile(path.join(scratchDir, 'design-c-dark.png'));
  await sharp(Buffer.from(designD(512, '#120505'))).png().toFile(path.join(scratchDir, 'design-d-dark.png'));
  await sharp(Buffer.from(designD(512, '#FFFFFF'))).png().toFile(path.join(scratchDir, 'design-d-light.png'));
  
  console.log('Test logos rendered!');
}

run();
