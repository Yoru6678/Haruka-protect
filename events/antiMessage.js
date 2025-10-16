const db = require("../db.js");
const config = require('../config');
const Discord = require('discord.js');
const rlog = db.table("raidlog");
const wl = db.table("Whitelist");
const al = db.table("AntiLink");

module.exports = {
    name: 'antiMessage',
    async execute(message) {
        try {
            // Vérification whitelist
            const isWhitelisted = wl.get(`${message.guild.id}.${message.author.id}.wl`);
            if (isWhitelisted || message.author.bot) return;
            
            // Vérification anti-lien
            const antiLinkAll = al.get(`config.${message.guild.id}.antilinkall`);
            const antiLinkInvite = al.get(`config.${message.guild.id}.antilinkinvite`);
            
            if ((antiLinkAll || antiLinkInvite) && message.content) {
                const linkRegex = /https?:\/\/[^\s]+/gi;
                const inviteRegex = /(discord\.gg|discordapp\.com\/invite)\/([a-zA-Z0-9-]+)/gi;
                
                if (antiLinkAll && linkRegex.test(message.content)) {
                    await message.delete();
                    const msg = await message.channel.send(`🔗 **Anti-Link** - ${message.author}, les liens sont interdits.`);
                    setTimeout(() => msg.delete(), 5000);
                    return;
                }
                
                if (antiLinkInvite && inviteRegex.test(message.content)) {
                    await message.delete();
                    const msg = await message.channel.send(`🔗 **Anti-Invite** - ${message.author}, les invitations Discord sont interdites.`);
                    setTimeout(() => msg.delete(), 5000);
                    return;
                }
            }
        } catch (error) {
            console.error('Erreur antiMessage:', error);
        }
    }
};