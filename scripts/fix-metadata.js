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

// Process all language-specific pages
languages.forEach(lang => {
  sections.forEach(section => {
    // Path to the language-specific section page
    const pagePath = path.join(appDir, lang, section, 'page.tsx');
    
    if (fs.existsSync(pagePath)) {
      // Read the content of the page file
      let content = fs.readFileSync(pagePath, 'utf8');
      
      // Fix metadata import placement
      if (content.includes('import { Metadata }') && content.includes('const baseMetadata: Metadata =')) {
        // Remove the wrong metadata import and definition
        content = content.replace(/import { Metadata } from ['"]next['"][\s\S]*?const baseMetadata: Metadata =[\s\S]*?};/, '');
        
        // Add the correct metadata import after other imports if it doesn't exist
        if (!content.includes('import { generatePageMetadata }')) {
          // Find the last import statement
          const lastImportIndex = content.lastIndexOf('import');
          const lastImportEndIndex = content.indexOf('\n', lastImportIndex);
          
          // Add metadata imports after the last import
          content = content.slice(0, lastImportEndIndex + 1) + 
                    'import { Metadata } from \'next\'\n' +
                    `import { generatePageMetadata } from '../../page-metadata'\n` +
                    content.slice(lastImportEndIndex + 1);
        }
      }
      
      // Fix or add generateMetadata function
      if (content.includes('export const generateMetadata = async ({')) {
        // Fix the incorrect function signature
        content = content.replace(
          /export const generateMetadata = async \(\{[\s\S]*?\}\): Promise<Metadata> \{/,
          'export const generateMetadata = async (): Promise<Metadata> => {'
        );
      } else if (content.includes('export const generateMetadata = async () =>')) {
        // Already has the correct format, just ensure it has the right path
        content = content.replace(
          /\/[a-z]{2}\/[a-z-]+/g,
          `/${lang}/${section}`
        );
      } else if (content.includes('export const generateMetadata = async ()')) {
        // Fix format without arrow function
        content = content.replace(
          /export const generateMetadata = async \(\)/,
          'export const generateMetadata = async (): Promise<Metadata> =>'
        );
      } else {
        // No metadata function found, add it
        // Find the position before the default export
        const defaultExportIndex = content.indexOf('export default');
        if (defaultExportIndex !== -1) {
          // Create the metadata function and add it before the default export
          const metadataFunction = `
// Generate metadata for this page
export const generateMetadata = async (): Promise<Metadata> => {
  // Define base metadata for ${section} page
  const baseMetadata: Metadata = {
    title: 'NIBM Tower Cranes | ${section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, ' ')}',
    description: '${section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, ' ')} page for NIBM Tower Cranes',
  }

  // Use the utility to generate metadata with canonical URLs
  return generatePageMetadata(
    baseMetadata,
    '/${lang}/${section}',
    'https://www.nibmvb.eu',
    ['en', 'nl', 'de']
  )
}

`;
          content = content.slice(0, defaultExportIndex) + metadataFunction + content.slice(defaultExportIndex);
        }
      }
      
      // Update the file
      fs.writeFileSync(pagePath, content);
      console.log(`Fixed metadata in ${pagePath}`);
    } else {
      console.log(`File not found: ${pagePath}`);
    }
  });
});

console.log('Metadata fixed in all language-specific pages.'); 