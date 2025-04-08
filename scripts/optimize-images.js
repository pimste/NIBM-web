const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Paths
const publicDir = path.join(__dirname, '../public');
const imagesDir = path.join(publicDir, 'images');
const optimizedDir = path.join(publicDir, 'optimized');

// Ensure optimized directory exists
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir);
}

// Get all image files
const imageFiles = fs.readdirSync(imagesDir)
  .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

// Process each image
async function processImages() {
  console.log('Optimizing images...');
  
  for (const file of imageFiles) {
    const inputPath = path.join(imagesDir, file);
    const fileNameWithoutExt = path.parse(file).name;
    
    // Generate WebP version
    const webpOutputPath = path.join(optimizedDir, `${fileNameWithoutExt}.webp`);
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(webpOutputPath);
    
    // Generate AVIF version
    const avifOutputPath = path.join(optimizedDir, `${fileNameWithoutExt}.avif`);
    await sharp(inputPath)
      .avif({ quality: 65 })
      .toFile(avifOutputPath);
    
    // Create responsive versions for the original format
    const sizes = [640, 750, 828, 1080, 1200, 1920];
    for (const width of sizes) {
      const resizedOutputPath = path.join(optimizedDir, `${fileNameWithoutExt}-${width}${path.extname(file)}`);
      await sharp(inputPath)
        .resize(width)
        .toFile(resizedOutputPath);
    }
    
    console.log(`Processed: ${file}`);
  }
  
  console.log('Image optimization complete!');
}

processImages().catch(err => {
  console.error('Error optimizing images:', err);
  process.exit(1);
}); 