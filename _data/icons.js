// Icon system - properly imports Tabler icons
import fs from 'fs';
import path from 'path';

const iconsDir = 'node_modules/@tabler/icons/icons/outline';

function getIcon(iconName, size = 16) {
  try {
    const iconPath = path.join(iconsDir, `${iconName}.svg`);
    let svgContent = fs.readFileSync(iconPath, 'utf8');
    
    // Clean up the SVG - remove default classes and set proper size
    svgContent = svgContent
      .replace(/class="[^"]*"/g, '')  // Remove default classes
      .replace(/width="24"/, `width="${size}"`)
      .replace(/height="24"/, `height="${size}"`)
      .replace(/>/,` class="w-4 h-4" aria-hidden="true">`); // Add our classes
    
    return svgContent;
  } catch (error) {
    console.error(`Icon ${iconName} not found:`, error);
    return '';
  }
}

function getCursorIcon(iconName, size = 32) {
  try {
    const iconPath = path.join(iconsDir, `${iconName}.svg`);
    let svgContent = fs.readFileSync(iconPath, 'utf8');
    
    // Create cursor-optimized SVG with filled circle and proper sizing
    svgContent = svgContent
      .replace(/class="[^"]*"/g, '')  // Remove default classes
      .replace(/width="24"/, `width="${size}"`)
      .replace(/height="24"/, `height="${size}"`)
      .replace(/viewBox="0 0 24 24"/, `viewBox="0 0 24 24"`)
      .replace(/stroke="currentColor"/, 'stroke="white"')
      .replace(/fill="none"/, 'fill="black"')
      .replace(/stroke-width="2"/, 'stroke-width="1"');
    
    return svgContent;
  } catch (error) {
    console.error(`Cursor icon ${iconName} not found:`, error);
    return '';
  }
}

// Generate cursor SVG files
function generateCursorFiles() {
  const cursors = {
    'arrow-left': getCursorIcon('circle-arrow-left'),
    'arrow-right': getCursorIcon('circle-arrow-right')
  };
  
  const iconsOutputDir = 'public/icons';
  if (!fs.existsSync(iconsOutputDir)) {
    fs.mkdirSync(iconsOutputDir, { recursive: true });
  }
  
  for (const [name, content] of Object.entries(cursors)) {
    fs.writeFileSync(path.join(iconsOutputDir, `${name}.svg`), content);
  }
}

// Generate cursor files when this module is loaded
generateCursorFiles();

export default {
  externalLink: getIcon('external-link'),
  linkedin: getIcon('brand-linkedin'), 
  instagram: getIcon('brand-instagram'),
  // Cursor icons are generated as files, not embedded
};