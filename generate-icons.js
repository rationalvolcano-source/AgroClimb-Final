const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const inputImage = path.join(__dirname, 'attached_assets', 'image_1761115104637.png');
const outputDir = path.join(__dirname, 'public', 'icons');

async function generateIcons() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const size of sizes) {
    const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);
    await sharp(inputImage)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 2, g: 6, b: 23, alpha: 1 }
      })
      .png()
      .toFile(outputPath);
    console.log(`Generated: icon-${size}x${size}.png`);
  }
  console.log('All icons generated successfully!');
}

generateIcons().catch(console.error);
