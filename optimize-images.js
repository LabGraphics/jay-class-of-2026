const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

try {
    require.resolve('sharp');
} catch (e) {
    console.log('Installing sharp for image compression...');
    execSync('npm install sharp', { stdio: 'inherit' });
}
const sharp = require('sharp');

const IMAGE_DIR = path.join(__dirname, 'images');

async function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            await processDirectory(fullPath);
        } else {
            const ext = path.extname(file).toLowerCase();
            if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
                const basename = path.basename(file, ext);
                const webpPath = path.join(dir, `${basename}.webp`);
                const mobilePath = path.join(dir, `${basename}-mobile.webp`);
                
                // Skip if already optimized
                if (fs.existsSync(webpPath)) continue;

                try {
                    console.log(`Optimizing: ${fullPath}`);
                    
                    // Generate full size WebP
                    await sharp(fullPath)
                        .webp({ quality: 80, effort: 4 })
                        .toFile(webpPath);
                    
                    // Generate mobile size WebP (max width 600px)
                    await sharp(fullPath)
                        .resize({ width: 600, withoutEnlargement: true })
                        .webp({ quality: 75, effort: 4 })
                        .toFile(mobilePath);
                        
                    console.log(`✅ Compressed to WebP: ${basename}.webp & ${basename}-mobile.webp`);
                } catch (err) {
                    console.error(`❌ Failed to process ${file}:`, err.message);
                }
            }
        }
    }
}

async function run() {
    console.log('Starting image compression pass...');
    console.log('This will generate optimized .webp versions next to the original files.');
    await processDirectory(IMAGE_DIR);
    console.log('\nDone! You can now update your HTML files to point to .webp images to fully realize the optimization benefits.');
}

run();
