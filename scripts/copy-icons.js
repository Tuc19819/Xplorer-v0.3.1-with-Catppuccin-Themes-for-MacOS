const fs = require('fs');
const path = require('path');

// Source paths
const CANDY_ICONS_PLACES = path.join(__dirname, '../src/candy-icons-master/places/48');
const CANDY_ICONS_DEVICES = path.join(__dirname, '../src/candy-icons-master/devices/scalable');

// Destination paths
const ICON_FOLDER = path.join(__dirname, '../src/Icon');

// List of icons to copy
const iconsToMove = {
    // Folder icons
    'folder.svg': 'folder/folder.svg',
    'folder-blue.svg': 'folder/folder-blue.svg',
    'folder-cyan.svg': 'folder/folder-cyan.svg',
    'folder-documents.svg': 'folder/folder-documents.svg',
    'folder-download.svg': 'folder/folder-download.svg',
    'folder-downloads.svg': 'folder/folder-downloads.svg',
    'folder-favorites.svg': 'folder/folder-favorites.svg',
    'folder-git.svg': 'folder/folder-git.svg',
    'folder-green.svg': 'folder/folder-green.svg',
    'folder-grey.svg': 'folder/folder-grey.svg',
    'folder-image.svg': 'folder/folder-image.svg',
    'folder-images.svg': 'folder/folder-images.svg',
    'folder-important.svg': 'folder/folder-important.svg',
    'folder-locked.svg': 'folder/folder-locked.svg',
    'folder-magenta.svg': 'folder/folder-magenta.svg',
    'folder-music.svg': 'folder/folder-music.svg',
    'folder-network.svg': 'folder/folder-network.svg',
    'folder-orange.svg': 'folder/folder-orange.svg',
    'folder-pictures.svg': 'folder/folder-pictures.svg',
    'folder-public.svg': 'folder/folder-public.svg',
    'folder-red.svg': 'folder/folder-red.svg',
    'folder-root.svg': 'folder/folder-root.svg',
    'folder-temp.svg': 'folder/folder-temp.svg',
    'folder-templates.svg': 'folder/folder-templates.svg',
    'folder-trash.svg': 'folder/folder-trash.svg',
    'folder-unlocked.svg': 'folder/folder-unlocked.svg',
    'folder-videos.svg': 'folder/folder-videos.svg',
    'folder-violet.svg': 'folder/folder-violet.svg',
    'folder-yellow.svg': 'folder/folder-yellow.svg',
    
    // Device icons from scalable directory
    'drive-removable-media-usb-pendrive.svg': 'usb.svg',
    'drive-removable-media-usb.svg': 'usb.svg',
    'drive-harddisk.svg': 'hard-disk.svg',
};

// Create directories if they don't exist
const createDirIfNotExists = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

// Copy icons
const copyIcons = () => {
    Object.entries(iconsToMove).forEach(([source, dest]) => {
        const sourcePath = source.includes('drive-') ? 
            path.join(CANDY_ICONS_DEVICES, source) :
            path.join(CANDY_ICONS_PLACES, source);
        
        const destPath = path.join(ICON_FOLDER, dest);
        
        // Create destination directory if it doesn't exist
        createDirIfNotExists(path.dirname(destPath));
        
        try {
            if (fs.existsSync(sourcePath)) {
                fs.copyFileSync(sourcePath, destPath);
                console.log(`Copied ${source} to ${dest}`);
            } else {
                console.warn(`Source file not found: ${sourcePath}`);
            }
        } catch (err) {
            console.error(`Error copying ${source}: ${err.message}`);
        }
    });
};

copyIcons(); 