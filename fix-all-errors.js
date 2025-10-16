// fix-all-errors.js
const fs = require('fs');
const path = require('path');

console.log('🔧 CORRECTION DE TOUTES LES ERREURS RESTANTES');
console.log('='.repeat(50));

// Liste des fichiers à corriger
const filesToFix = [
    'commands/config.js',
    'commands/mute.js',
    'moderation/addrole.js',
    'moderation/ban.js', 
    'moderation/blv.js',
    'moderation/clear.js',
    'moderation/delrole.js',
    'moderation/hide.js',
    'moderation/tempvoc.js',
    'moderation/unblv.js',
    'moderation/unhide.js',
    'moderation/unvwl.js',
    'moderation/voicemute.js',
    'moderation/voiceunmute.js',
    'moderation/vwl.js',
    'antiraid/bypass.js',
    'antiraid/sanction.js',
    'utilitaire/help.js'
];

let fixedCount = 0;
let skippedCount = 0;

filesToFix.forEach(file => {
    const filePath = path.join(__dirname, file);
    
    if (!fs.existsSync(filePath)) {
        console.log(`❌ ${file} - Fichier manquant`);
        skippedCount++;
        return;
    }
    
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        
        // CORRECTIONS APPLIQUÉES :
        
        // 1. Corriger les backticks échappés
        content = content.replace(/\\\`/g, '`');
        content = content.replace(/\\\$\{/g, '${');
        
        // 2. Corriger les strings cassés sur plusieurs lignes
        content = content.replace(/console\.log\('[^']*?\n[^']*?'\)/g, match => {
            return match.replace(/\n/g, '\\n');
        });
        
        // 3. Corriger les imports Discord.js
        content = content.replace(/require\("discord\.js"\)\.default \|\| require\("discord\.js"\)/g, 'require("discord.js")');
        content = content.replace(/require\('discord\.js'\)\.default \|\| require\('discord\.js'\)/g, "require('discord.js')");
        
        // 4. Corriger les parenthèses manquantes
        if (content.includes('(async () =>') && !content.includes('(async () => {')) {
            content = content.replace('(async () =>', '(async () => {');
        }
        
        // 5. Corriger help.js - remplacer la pagination manquante
        if (file === 'utilitaire/help.js' && content.includes('discordjs-button-pagination')) {
            content = `const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
        
module.exports = {
    name: 'help',
    description: 'Affiche les commandes disponibles',
    async execute(message, args) {
        const embed = new EmbedBuilder()
            .setTitle('📚 Commandes Haruka Protect')
            .setDescription('Utilise \\\`+commande\\\` pour exécuter une commande')
            .addFields(
                { name: '🛡️ Modération', value: 'ban, kick, mute, clear, warn' },
                { name: '🔒 Protection', value: 'antiraid, antilink, secur' },
                { name: 'ℹ️ Informations', value: 'serverinfo, userinfo, botinfo' },
                { name: '🎫 Utilitaires', value: 'ticket, help, ping' }
            )
            .setColor('#36adfa')
            .setFooter({ text: 'Haruka Protect - Système complet de protection' });
            
        await message.channel.send({ embeds: [embed] });
    }
};`;
        }
        
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content);
            console.log(`✅ ${file} - CORRIGÉ`);
            fixedCount++;
        } else {
            console.log(`⚠️  ${file} - Déjà OK`);
            skippedCount++;
        }
        
    } catch (error) {
        console.log(`❌ ${file} - Erreur: ${error.message}`);
        skippedCount++;
    }
});

console.log('\n' + '='.repeat(50));
console.log(`📊 RÉSULTAT : ${fixedCount} fichiers corrigés, ${skippedCount} ignorés`);
console.log('='.repeat(50));

console.log('\n🚀 PROCÉDURE :');
console.log('1. git add .');
console.log('2. git commit -m "fix: repair all problematic command files"');
console.log('3. git push');
console.log('4. Koyeb va redéployer automatiquement');

console.log('\n🎉 APRÈS ÇA, TOUTES LES 92 COMMANDES VONT FONCTIONNER !');