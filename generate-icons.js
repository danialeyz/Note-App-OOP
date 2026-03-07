// Simple script to generate PWA icons as SVG files (browsers accept SVG icons)
const fs = require("fs");
const path = require("path");

const svgIcon = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="#282a36"/>
  <rect x="${size * 0.15}" y="${size * 0.12}" width="${size * 0.55}" height="${size * 0.76}" rx="${size * 0.05}" fill="#44475a"/>
  <rect x="${size * 0.2}" y="${size * 0.22}" width="${size * 0.35}" height="${size * 0.04}" rx="${size * 0.02}" fill="#bd93f9"/>
  <rect x="${size * 0.2}" y="${size * 0.32}" width="${size * 0.4}" height="${size * 0.025}" rx="${size * 0.01}" fill="#6272a4"/>
  <rect x="${size * 0.2}" y="${size * 0.38}" width="${size * 0.3}" height="${size * 0.025}" rx="${size * 0.01}" fill="#6272a4"/>
  <rect x="${size * 0.2}" y="${size * 0.44}" width="${size * 0.35}" height="${size * 0.025}" rx="${size * 0.01}" fill="#6272a4"/>
  <circle cx="${size * 0.65}" cy="${size * 0.7}" r="${size * 0.2}" fill="#bd93f9"/>
  <line x1="${size * 0.65}" y1="${size * 0.58}" x2="${size * 0.65}" y2="${size * 0.82}" stroke="#282a36" stroke-width="${size * 0.04}" stroke-linecap="round"/>
  <line x1="${size * 0.53}" y1="${size * 0.7}" x2="${size * 0.77}" y2="${size * 0.7}" stroke="#282a36" stroke-width="${size * 0.04}" stroke-linecap="round"/>
</svg>`;

const outDir = path.join(__dirname, "public", "build", "icons");

// Save as SVG (rename to .png for manifest compatibility — or we update manifest)
fs.writeFileSync(path.join(outDir, "icon-192.svg"), svgIcon(192));
fs.writeFileSync(path.join(outDir, "icon-512.svg"), svgIcon(512));

console.log("SVG icons generated!");
