// This script converts all images in the public/images directory to optimized WebP format
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const SOURCE_DIR = path.join(process.cwd(), 'public/images');
const DEST_DIR = path.join(process.cwd(), 'public/images/optimized');
const WEBP_QUALITY = 75; // Reduced quality for better performance
const AVIF_QUALITY = 65; // AVIF can use lower quality with good results
const FORMATS_TO_CONVERT = ['.jpg', '.jpeg', '.png', '.gif'];
const SKIP_EXISTING = true; // Skip if WebP version already exists
const RESIZE_WIDTHS = [320, 640, 768, 1024, 1280, 1920]; // Responsive sizes

// Make sure the destination directory exists
fs.mkdirSync(DEST_DIR, { recursive: true });

// Function to convert an image to WebP
async function convertImageToWebP(sourceFilePath, filename) {
  const fileExt = path.extname(filename).toLowerCase();
  
  // Skip if not a supported format
  if (!FORMATS_TO_CONVERT.includes(fileExt)) {
    console.log(`Skipping ${filename} (unsupported format)`);
    return;
  }
  
  // Create destination path with .webp extension
  const destFilename = path.basename(filename, fileExt) + '.webp';
  const destFilePath = path.join(DEST_DIR, destFilename);
  
  // Create destination path with .avif extension
  const avifDestFilename = path.basename(filename, fileExt) + '.avif';
  const avifDestFilePath = path.join(DEST_DIR, avifDestFilename);
  
  // Skip if file already exists and SKIP_EXISTING is true
  if (SKIP_EXISTING && fs.existsSync(destFilePath) && fs.existsSync(avifDestFilePath)) {
    console.log(`Skipping ${filename} (already exists)`);
    return;
  }
  
  try {
    // Get image info to determine if resizing is needed
    const metadata = await sharp(sourceFilePath).metadata();
    
    // Process the image with sharp for WebP
    await sharp(sourceFilePath)
      .webp({ quality: WEBP_QUALITY, effort: 6 }) // Higher effort = better compression
      .toFile(destFilePath);
      
    // Process the image with sharp for AVIF
    await sharp(sourceFilePath)
      .avif({ quality: AVIF_QUALITY, effort: 7 }) // Higher effort = better compression
      .toFile(avifDestFilePath);
    
    // Create responsive variants if the source image is large enough
    if (metadata.width > 640) {
      for (const width of RESIZE_WIDTHS) {
        // Skip sizes larger than the original
        if (width >= metadata.width) continue;
        
        const resizedWebpFilename = `${path.basename(filename, fileExt)}-${width}.webp`;
        const resizedWebpFilePath = path.join(DEST_DIR, resizedWebpFilename);
        
        const resizedAvifFilename = `${path.basename(filename, fileExt)}-${width}.avif`;
        const resizedAvifFilePath = path.join(DEST_DIR, resizedAvifFilename);
        
        // Skip if already exists
        if (SKIP_EXISTING && fs.existsSync(resizedWebpFilePath) && fs.existsSync(resizedAvifFilePath)) continue;
        
        await sharp(sourceFilePath)
          .resize(width)
          .webp({ quality: WEBP_QUALITY, effort: 6 })
          .toFile(resizedWebpFilePath);
          
        await sharp(sourceFilePath)
          .resize(width)
          .avif({ quality: AVIF_QUALITY, effort: 7 })
          .toFile(resizedAvifFilePath);
      }
    }
      
    const sourceStats = fs.statSync(sourceFilePath);
    const destStats = fs.statSync(destFilePath);
    const avifStats = fs.statSync(avifDestFilePath);
    const compressionRatio = ((sourceStats.size - destStats.size) / sourceStats.size * 100).toFixed(2);
    const avifCompressionRatio = ((sourceStats.size - avifStats.size) / sourceStats.size * 100).toFixed(2);
    
    console.log(`✅ Converted ${filename} to WebP (Saved ${compressionRatio}%) and AVIF (Saved ${avifCompressionRatio}%)`);
  } catch (error) {
    console.error(`❌ Error converting ${filename}: ${error.message}`);
  }
}

// Process all files in the source directory (non-recursive)
async function processDirectory() {
  try {
    const files = fs.readdirSync(SOURCE_DIR);
    
    // Filter out subdirectories
    const filesOnly = files.filter(file => {
      const filePath = path.join(SOURCE_DIR, file);
      return fs.statSync(filePath).isFile();
    });
    
    console.log(`Found ${filesOnly.length} files to process...`);
    
    // Process all files
    for (const file of filesOnly) {
      const filePath = path.join(SOURCE_DIR, file);
      await convertImageToWebP(filePath, file);
    }
    
    // Process subdirectories recursively
    const subdirs = files.filter(file => {
      const filePath = path.join(SOURCE_DIR, file);
      return fs.statSync(filePath).isDirectory() && file !== 'optimized';
    });
    
    for (const subdir of subdirs) {
      const subdirPath = path.join(SOURCE_DIR, subdir);
      const subdirDestPath = path.join(DEST_DIR, subdir);
      
      // Create subdirectory in destination if it doesn't exist
      if (!fs.existsSync(subdirDestPath)) {
        fs.mkdirSync(subdirDestPath, { recursive: true });
      }
      
      const subdirFiles = fs.readdirSync(subdirPath);
      for (const file of subdirFiles) {
        const filePath = path.join(subdirPath, file);
        if (fs.statSync(filePath).isFile()) {
          // Calculate relative path for destination
          const relativePath = path.relative(SOURCE_DIR, filePath);
          const destFilePath = path.join(DEST_DIR, path.dirname(relativePath));
          
          // Ensure dest directory exists
          fs.mkdirSync(destFilePath, { recursive: true });
          
          // Convert file
          await convertImageToWebP(filePath, file);
        }
      }
    }
    
    console.log('✅ All images processed successfully!');
    
  } catch (error) {
    console.error(`❌ Error processing directory: ${error.message}`);
  }
}

// Run the conversion
processDirectory(); 