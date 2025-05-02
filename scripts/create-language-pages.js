const fs = require('fs');
const path = require('path');

// Configuration
const appDir = path.join(__dirname, '../src/app');
const languages = ['en', 'nl', 'de'];
const sections = [
  'about',
  'towercranes',
  'services',
  'technical-info',
  'contact',
  'cookies',
  'terms-of-service',
  'privacy-policy'
];

// Ensure language root directories exist
languages.forEach(lang => {
  const langDir = path.join(appDir, lang);
  if (!fs.existsSync(langDir)) {
    fs.mkdirSync(langDir, { recursive: true });
    console.log(`Created language directory: ${langDir}`);
  }
});

// Create language-specific section directories
languages.forEach(lang => {
  sections.forEach(section => {
    // First, check if the original section exists
    const originalSectionDir = path.join(appDir, section);
    if (!fs.existsSync(originalSectionDir)) {
      console.log(`Warning: Original section directory not found: ${originalSectionDir}`);
      return;
    }

    // Create language-specific section directory
    const langSectionDir = path.join(appDir, lang, section);
    if (!fs.existsSync(langSectionDir)) {
      fs.mkdirSync(langSectionDir, { recursive: true });
      console.log(`Created directory: ${langSectionDir}`);
    }

    // Copy page.tsx file (if it exists)
    const originalPageFile = path.join(originalSectionDir, 'page.tsx');
    if (fs.existsSync(originalPageFile)) {
      // Read original file content
      let content = fs.readFileSync(originalPageFile, 'utf8');
      
      // Add language-specific metadata
      const metadataContent = `
// Generate metadata for this page
export const generateMetadata = async () => {
  // Use the utility to generate metadata with canonical URLs
  return generatePageMetadata(
    baseMetadata,
    '/${lang}/${section}',
    'https://www.nibmvb.eu',
    ['en', 'nl', 'de']
  )
}`;

      // Check if we need to add imports
      if (!content.includes('import { generatePageMetadata }')) {
        // Add import statement for metadata
        content = content.replace(
          /(import .* from .*\n)/,
          `$1import { Metadata } from 'next'\nimport { generatePageMetadata } from '../../page-metadata'\n\n// Base metadata for ${section} page in ${lang} language\nconst baseMetadata: Metadata = {\n  title: 'NIBM Tower Cranes | ${section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, ' ')}',\n  description: '${section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, ' ')} page for NIBM Tower Cranes',\n}\n`
        );

        // Look for the default export and add metadata export before it
        content = content.replace(
          /(export default function|export default)/,
          `${metadataContent}\n\n$1`
        );
      }

      // Write to the language-specific page file
      const langPageFile = path.join(langSectionDir, 'page.tsx');
      fs.writeFileSync(langPageFile, content);
      console.log(`Created page file: ${langPageFile}`);
      
      // Handle dynamic routes with [slug] if they exist
      const slugDir = path.join(originalSectionDir, '[slug]');
      if (fs.existsSync(slugDir)) {
        const langSlugDir = path.join(langSectionDir, '[slug]');
        if (!fs.existsSync(langSlugDir)) {
          fs.mkdirSync(langSlugDir, { recursive: true });
          console.log(`Created dynamic route directory: ${langSlugDir}`);
        }
        
        // Copy slug page file
        const slugPageFile = path.join(slugDir, 'page.tsx');
        if (fs.existsSync(slugPageFile)) {
          const slugContent = fs.readFileSync(slugPageFile, 'utf8');
          
          // Adjust import paths if necessary for the language subfolder
          let adjustedSlugContent = slugContent.replace(
            /from ['"]\.\.\/([^'"]+)['"]/g, 
            `from '../../../$1'`
          );
          
          // Write to the language-specific slug page file
          const langSlugPageFile = path.join(langSlugDir, 'page.tsx');
          fs.writeFileSync(langSlugPageFile, adjustedSlugContent);
          console.log(`Created dynamic route page file: ${langSlugPageFile}`);
        }
        
        // Copy any metadata or other helper files
        const slugFiles = fs.readdirSync(slugDir);
        slugFiles.forEach(file => {
          if (file !== 'page.tsx') {
            const originalFile = path.join(slugDir, file);
            const langFile = path.join(langSlugDir, file);
            
            if (fs.statSync(originalFile).isFile()) {
              fs.copyFileSync(originalFile, langFile);
              console.log(`Copied helper file: ${langFile}`);
            }
          }
        });
      }
    }
  });
});

console.log('Language pages creation completed!'); 