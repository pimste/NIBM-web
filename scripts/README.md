# Image Optimization Scripts

This directory contains scripts to help optimize images for web performance.

## Available Scripts

### 1. Convert Images to WebP (`convert-to-webp.js`)

This script automatically converts all images in the `public/images` directory to optimized WebP format and saves them in `public/images/optimized/`.

**Usage:**
```bash
npm run convert-to-webp
```

**Features:**
- Converts JPG, JPEG, PNG, and GIF files to WebP
- Preserves directory structure
- Optimizes image quality (configurable)
- Skips already converted images
- Reports compression savings

### 2. Update Image References (`update-image-references.js`)

This script scans your source files and updates image references to use the optimized WebP versions.

**Usage:**
```bash
npm run update-image-refs
```

**Features:**
- Automatically updates image paths in your code
- Updates only non-optimized image references
- Works with .tsx, .jsx, .ts, and .js files

## Automated Pre-build Process

These scripts are configured to run automatically before each build with the `prebuild` script in package.json:

```bash
npm run build  # This will automatically run the image optimization scripts first
```

## Configuration

You can customize the scripts by editing their configuration variables at the top of each file:

### `convert-to-webp.js`:
- `WEBP_QUALITY`: WebP compression quality (0-100)
- `FORMATS_TO_CONVERT`: File extensions to convert
- `SKIP_EXISTING`: Whether to skip already converted images

### `update-image-references.js`:
- `SRC_DIR`: Source directory to scan for image references
- `FILE_EXTENSIONS`: File extensions to scan
- `IMAGE_EXTENSIONS`: Image extensions to replace 