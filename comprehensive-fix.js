const fs = require('fs');
const path = require('path');

console.log('🔧 Comprehensive fix for all command files...\n');

let fixedCount = 0;
let errorCount = 0;

function fixFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        
        // Fix escaped backticks
        content = content.replace(/\\`/g, '`');
        
        // Fix escaped single quotes
        content = content.replace(/\\'/g, "'");
        
        // Fix escaped double quotes (but keep legitimate ones)
        content = content.replace(/\\"/g, '"');
        
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Fixed: ${path.basename(filePath)}`);
            fixedCount++;
        }
        
    } catch (error) {
        console.log(`❌ Error processing ${path.basename(filePath)}:`, error.message);
        errorCount++;
    }
}

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            processDirectory(filePath);
        } else if (file.endsWith('.js')) {
            fixFile(filePath);
        }
    }
}

// Process commands directory
processDirectory(path.join(__dirname, 'commands'));

console.log(`\n✅ Fixed ${fixedCount} files`);
console.log(`❌ Errors: ${errorCount}`);
console.log('\nDone!');
