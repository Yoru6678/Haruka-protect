const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing emoji corruption in command files...\n');

let fixedCount = 0;
let errorCount = 0;

function cleanEmojiCorruption(content) {
    return content.replace(/🔧/g, '');
}

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            processDirectory(filePath);
        } else if (file.endsWith('.js')) {
            try {
                const content = fs.readFileSync(filePath, 'utf8');
                
                if (content.includes('🔧')) {
                    const cleaned = cleanEmojiCorruption(content);
                    fs.writeFileSync(filePath, cleaned, 'utf8');
                    console.log(`✅ Fixed: ${filePath}`);
                    fixedCount++;
                }
            } catch (error) {
                console.log(`❌ Error processing ${filePath}:`, error.message);
                errorCount++;
            }
        }
    }
}

processDirectory(path.join(__dirname, 'commands'));

console.log(`\n✅ Fixed ${fixedCount} files`);
console.log(`❌ Errors: ${errorCount}`);
console.log('\nDone! The bot should now load all commands properly.');
