// This script optimizes all images for maximum web performance
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const SOURCE_DIR = path.join(process.cwd(), 'public/images');
const DEST_DIR = path.join(process.cwd(), 'public/images/optimized');
const WEBP_QUALITY = 65; // Lower quality for maximum performance
const AVIF_QUALITY = 55; // AVIF can use even lower quality with good results
const FORMATS_TO_CONVERT = ['.jpg', '.jpeg', '.png', '.gif'];
const SKIP_EXISTING = false; // Force re-optimization of all images
const RESIZE_WIDTHS = [320, 640, 768, 1024, 1280]; // Responsive sizes
const MAX_WIDTH = 1920; // Cap all images at this width

// Make sure the destination directory exists
fs.mkdirSync(DEST_DIR, { recursive: true });

// Function to optimize an image
async function optimizeImage(sourceFilePath, filename) {
  const fileExt = path.extname(filename).toLowerCase();
  
  // Skip if not a supported format
  if (!FORMATS_TO_CONVERT.includes(fileExt)) {
    console.log(`Skipping ${filename} (unsupported format)`);
    return;
  }
  
  try {
    // Get image info
    const metadata = await sharp(sourceFilePath).metadata();
    
    // Base name for output files
    const baseName = path.basename(filename, fileExt);
    
    // Define output paths
    const webpPath = path.join(DEST_DIR, `${baseName}.webp`);
    const avifPath = path.join(DEST_DIR, `${baseName}.avif`);
    
    // Calculate target width - cap at MAX_WIDTH
    const targetWidth = Math.min(metadata.width, MAX_WIDTH);
    
    // Optimize the full-size image
    const resizeOptions = {
      width: targetWidth,
      withoutEnlargement: true,
      fit: 'inside',
    };
    
    // Extra optimization for JPEG and PNG
    let pipelineWebp = sharp(sourceFilePath)
      .resize(resizeOptions);
    
    // Apply additional optimizations based on format
    if (['.jpg', '.jpeg'].includes(fileExt)) {
      pipelineWebp = pipelineWebp.jpeg({ quality: 80, progressive: true });
    } else if (fileExt === '.png') {
      pipelineWebp = pipelineWebp.png({ compressionLevel: 9, palette: true });
    }
    
    // Generate WebP version
    await pipelineWebp
      .webp({ 
        quality: WEBP_QUALITY, 
        effort: 6,
        smartSubsample: true,
        reductionEffort: 6,
      })
      .toFile(webpPath);
    
    // Generate AVIF version with maximum compression
    await sharp(sourceFilePath)
      .resize(resizeOptions)
      .avif({ 
        quality: AVIF_QUALITY, 
        effort: 9,
        chromaSubsampling: '4:2:0',
      })
      .toFile(avifPath);
    
    // Create responsive versions if original is large enough
    if (metadata.width > 640) {
      for (const width of RESIZE_WIDTHS) {
        // Skip sizes larger than the original or larger than the max width we just created
        if (width >= metadata.width || width >= targetWidth) continue;
        
        const resizedWebpFilename = `${baseName}-${width}.webp`;
        const resizedWebpFilePath = path.join(DEST_DIR, resizedWebpFilename);
        
        const resizedAvifFilename = `${baseName}-${width}.avif`;
        const resizedAvifFilePath = path.join(DEST_DIR, resizedAvifFilename);
        
        await sharp(sourceFilePath)
          .resize({ width, withoutEnlargement: true })
          .webp({ 
            quality: WEBP_QUALITY, 
            effort: 6,
            smartSubsample: true,
          })
          .toFile(resizedWebpFilePath);
          
        await sharp(sourceFilePath)
          .resize({ width, withoutEnlargement: true })
          .avif({ 
            quality: AVIF_QUALITY, 
            effort: 9,
            chromaSubsampling: '4:2:0',
          })
          .toFile(resizedAvifFilePath);
      }
    }
      
    // Generate stats for logging
    const sourceStats = fs.statSync(sourceFilePath);
    const webpStats = fs.statSync(webpPath);
    const avifStats = fs.statSync(avifPath);
    
    const webpSavings = ((sourceStats.size - webpStats.size) / sourceStats.size * 100).toFixed(2);
    const avifSavings = ((sourceStats.size - avifStats.size) / sourceStats.size * 100).toFixed(2);
    
    console.log(`✅ Optimized ${filename}: WebP (${webpSavings}% reduction), AVIF (${avifSavings}% reduction)`);
    
    return {
      original: {
        size: sourceStats.size,
        path: sourceFilePath
      },
      webp: {
        size: webpStats.size,
        path: webpPath,
        savings: parseFloat(webpSavings)
      },
      avif: {
        size: avifStats.size,
        path: avifPath,
        savings: parseFloat(avifSavings)
      }
    };
    
  } catch (error) {
    console.error(`❌ Error processing ${filename}: ${error.message}`);
  }
}

// Process all files in the source directory (and subdirectories)
async function processDirectory() {
  try {
    // Get all files recursively
    const getAllFiles = (dir, fileList = []) => {
      const files = fs.readdirSync(dir);
      
      files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
          if (file !== 'optimized') { // Skip the optimized directory
            fileList = getAllFiles(filePath, fileList);
          }
        } else {
          fileList.push({
            path: filePath,
            name: file,
            relativePath: path.relative(SOURCE_DIR, filePath)
          });
        }
      });
      
      return fileList;
    };
    
    const allFiles = getAllFiles(SOURCE_DIR);
    console.log(`Found ${allFiles.length} files to process...`);
    
    // Process all files with progress tracking
    let processed = 0;
    let totalSavings = { webp: 0, avif: 0 };
    
    for (const file of allFiles) {
      // Create subdirectory in destination if needed
      const relativeDir = path.dirname(file.relativePath);
      const fullDestDir = path.join(DEST_DIR, relativeDir);
      
      if (relativeDir !== '.') {
        fs.mkdirSync(fullDestDir, { recursive: true });
      }
      
      // Optimize the image
      const result = await optimizeImage(file.path, file.name);
      
      // Track savings
      if (result) {
        totalSavings.webp += result.webp.savings;
        totalSavings.avif += result.avif.savings;
      }
      
      // Show progress
      processed++;
      if (processed % 5 === 0) {
        console.log(`Progress: ${processed}/${allFiles.length} (${Math.round(processed/allFiles.length*100)}%)`);
      }
    }
    
    // Calculate average savings
    const avgWebpSavings = (totalSavings.webp / processed).toFixed(2);
    const avgAvifSavings = (totalSavings.avif / processed).toFixed(2);
    
    console.log(`\n✅ All images processed successfully!`);
    console.log(`Average savings: WebP ${avgWebpSavings}%, AVIF ${avgAvifSavings}%`);
    console.log(`\nTo use these optimized images, update your code with Next.js Image component or update image references.`);
    
  } catch (error) {
    console.error(`❌ Error processing directory: ${error.message}`);
  }
}

// Run the optimization
processDirectory(); 