import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.join(__dirname, 'attached_assets');

async function optimizeImages() {
  try {
    const files = await fs.readdir(assetsDir);
    const imageFiles = files.filter(file => 
      /\.(png|jpg|jpeg)$/i.test(file) && !file.includes('.webp')
    );

    console.log(`📸 Found ${imageFiles.length} images to optimize\n`);

    for (const file of imageFiles) {
      const inputPath = path.join(assetsDir, file);
      const outputPath = path.join(assetsDir, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
      
      try {
        const stats = await fs.stat(inputPath);
        const originalSize = (stats.size / 1024 / 1024).toFixed(2);
        
        // Convert to WebP with high quality (90%) to preserve visual fidelity
        await sharp(inputPath)
          .webp({ 
            quality: 90,  // High quality - no visual degradation
            effort: 6     // Maximum compression effort
          })
          .toFile(outputPath);
        
        const newStats = await fs.stat(outputPath);
        const newSize = (newStats.size / 1024 / 1024).toFixed(2);
        const reduction = (((stats.size - newStats.size) / stats.size) * 100).toFixed(1);
        
        console.log(`✓ ${file}`);
        console.log(`  Original: ${originalSize} MB → WebP: ${newSize} MB (${reduction}% smaller)\n`);
      } catch (error) {
        console.error(`✗ Error processing ${file}:`, error.message);
      }
    }
    
    console.log('🎉 Image optimization complete!');
  } catch (error) {
    console.error('Error:', error);
  }
}

optimizeImages();
