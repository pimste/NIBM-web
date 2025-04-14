// This script scans source files and updates image references to use WebP versions
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const SRC_DIR = path.join(process.cwd(), 'src');
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif'];
const FILE_EXTENSIONS = ['.tsx', '.jsx', '.ts', '.js'];

// Function to update image references in a file
function updateImageReferences(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;

    // Match image paths like '/images/something.jpg', '/images/something.png'
    const imageRegex = /(['"])(\/images\/[^'"]+\.(jpg|jpeg|png|gif))(['"])/gi;
    
    // Replace with WebP versions
    content = content.replace(imageRegex, (match, quote1, imagePath, ext, quote2) => {
      // Skip if already pointing to /images/optimized/
      if (imagePath.includes('/images/optimized/')) {
        return match;
      }
      
      // Replace with WebP version
      const fileName = path.basename(imagePath, `.${ext}`);
      const dirName = path.dirname(imagePath);
      const newPath = `${quote1}${dirName}/optimized/${fileName}.webp${quote2}`;
      
      hasChanges = true;
      return newPath;
    });
    
    // Update Image components with better performance settings
    // Match next/image components
    const imageComponentRegex = /<Image\s+([^>]*)src=(['"])([^'"]+)(['"])([^>]*)>/gi;
    
    content = content.replace(imageComponentRegex, (match, beforeSrc, srcQuote, src, srcQuoteEnd, afterSrc) => {
      // Skip if already has good performance settings
      if (match.includes('placeholder="blur"') && match.includes('loading="lazy"') && match.includes('sizes=')) {
        return match;
      }
      
      // Adjust the Image component props for better performance
      let newMatch = match;
      
      // Add placeholder if missing
      if (!newMatch.includes('placeholder=')) {
        newMatch = newMatch.replace('>', ' placeholder="blur" blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJpgZXCLgAAAABJRU5ErkJggg==" >');
      }
      
      // Add proper loading attribute if missing or non-optimal
      if (!newMatch.includes('loading=')) {
        // Check if it's likely a top-level image that should be prioritized
        if (newMatch.includes('priority') || newMatch.includes('className="hero') || src.includes('logo')) {
          // This is likely a critical image - prioritize it
          if (!newMatch.includes('priority')) {
            newMatch = newMatch.replace('>', ' priority fetchPriority="high" loading="eager" >');
          }
        } else {
          // Non-critical image - lazy load it
          newMatch = newMatch.replace('>', ' loading="lazy" >');
        }
      }
      
      // Add proper sizes attribute if missing (helps browser select right image size)
      if (!newMatch.includes('sizes=')) {
        if (newMatch.includes('fill')) {
          // For fill mode, use viewport width
          newMatch = newMatch.replace('>', ' sizes="100vw" >');
        } else if (newMatch.includes('className="w-full"') || newMatch.includes('className="object-cover w-full"')) {
          // Full width image
          newMatch = newMatch.replace('>', ' sizes="100vw" >');
        } else {
          // Default responsive sizing
          newMatch = newMatch.replace('>', ' sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" >');
        }
      }
      
      // Optimize quality value
      if (!newMatch.includes('quality=')) {
        // For large hero/banner images, keep quality higher
        if (newMatch.includes('priority') || newMatch.includes('className="hero') || src.includes('banner')) {
          newMatch = newMatch.replace('>', ' quality={80} >');
        } else {
          // For other images, lower quality is usually fine
          newMatch = newMatch.replace('>', ' quality={70} >');
        }
      }
      
      hasChanges = true;
      return newMatch;
    });
    
    // Only write back if changes were made
    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated image references in ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}: ${error.message}`);
  }
}

// Find all source files and update them
async function updateAllFiles() {
  try {
    const filePattern = `${SRC_DIR}/**/*{${FILE_EXTENSIONS.join(',')}}`;
    const files = glob.sync(filePattern);
    
    console.log(`Found ${files.length} source files to scan...`);
    
    for (const file of files) {
      updateImageReferences(file);
    }
    
    console.log('✅ Finished updating image references!');
  } catch (error) {
    console.error(`❌ Error scanning files: ${error.message}`);
  }
}

// Run the update
updateAllFiles(); 