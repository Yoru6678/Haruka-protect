const fs = require('fs');
const path = require('path');

console.log('🔧 Final comprehensive fix...\n');

const fixes = {
    'commands/config/getvanishconfig.js': {
        from: /value: vanishRole \? `\$\{vanishRole\} \(`\$\{vanishRole\.id\}`\)` : `❌ Non configuré\\n\*\*Par défaut:\*\* `vanish``,/g,
        to: "value: vanishRole ? `${vanishRole} (\`${vanishRole.id}\`)` : '❌ Non configuré\\n**Par défaut:** `vanish`',"
    },
    'commands/config/setvanishrole.js': {
        from: /HarukaEmbeds\.success\( `Le rôle \$\{role\} a été défini comme rôle vanish\.\\n\\n\*\*Rôle par défaut:\*\* `vanish``, `Rôle vanish configuré ✅ - Haruka Protect ⚡' \)/g,
        to: "HarukaEmbeds.success( `Le rôle ${role} a été défini comme rôle vanish.\\n\\n**Rôle par défaut:** \\`vanish\\``, 'Rôle vanish configuré ✅ - Haruka Protect ⚡' )"
    },
    'commands/config/setwhitelistrole.js': {
        from: /HarukaEmbeds\.success\( `Le rôle \$\{role\} a été défini comme whitelist vanish\.\\n\\n\*\*Rôle par défaut:\*\* `whitelist``, `Rôle whitelist configuré ✅ - Haruka Protect ⚡' \)/g,
        to: "HarukaEmbeds.success( `Le rôle ${role} a été défini comme whitelist vanish.\\n\\n**Rôle par défaut:** \\`whitelist\\``, 'Rôle whitelist configuré ✅ - Haruka Protect ⚡' )"
    }
};

// Fix files with simple pattern replacements
for (const [file, fix] of Object.entries(fixes)) {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        try {
            let content = fs.readFileSync(filePath, 'utf8');
            content = content.replace(fix.from, fix.to);
            fs.writeFileSync(filePath, content);
            console.log(`✅ Fixed: ${file}`);
        } catch (error) {
            console.log(`❌ Error: ${file} - ${error.message}`);
        }
    }
}

// Fix files with consistent patterns
const filesToFix = [
    'commands/config/getvanishconfig.js',
    'commands/moderation/unwarn.js',
    'commands/moderation/warn.js',
    'commands/utility/help.js',
    'commands/utility/serverinfo.js',
    'commands/fun/8ball.js',
    'commands/moderation/ban.js',
    'commands/moderation/kick.js',
    'commands/moderation/mute.js',
    'commands/moderation/unmute.js',
    'commands/moderation/unvanish.js',
    'commands/moderation/vanish.js',
    'commands/moderation/clear.js',
    'commands/moderation/warnings.js',
    'commands/utility/avatar.js',
    'commands/utility/userinfo.js'
];

filesToFix.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        try {
            let content = fs.readFileSync(filePath, 'utf8');
            
            // Fix template literal with nested backticks: `...`${var}` ` → `...${var}`
            content = content.replace(/`([^`]*)`\$\{([^}]+)\}`([^`]*)`/g, '`$1${$2}$3`');
            
            // Fix unmatched quotes
            content = content.replace(/`([^`\n]+)'/g, "'$1'");
            content = content.replace(/'([^'\n]+)`/g, "'$1'");
            
            // Fix path.join with mixed quotes
            content = content.replace(/path\.join\([^)]*`([^`]+)',/g, (match) => {
                return match.replace(/`/g, "'");
            });
            
            fs.writeFileSync(filePath, content);
            console.log(`✅ Processed: ${file}`);
        } catch (error) {
            console.log(`❌ Error: ${file} - ${error.message}`);
        }
    }
});

console.log('\nDone!');
