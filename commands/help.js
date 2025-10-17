const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    name: "help",
    description: "Affiche toutes les commandes disponibles",
    async execute(message, args) {
        const embed = new EmbedBuilder()
            .setTitle("🛡️ HARUKA PROTECT - SYSTÈME COMPLET")
            .setDescription("**Bot de protection et modération avancée**\n*92 commandes disponibles • Préfixe: +*")
            .setColor("#5865F2")
            .setThumbnail(message.client.user.displayAvatarURL({ size: 512 }))
            .addFields(
                {
                    name: "🔧 COMMANDES PRINCIPALES",
                    value: "```+help • +ping • +config • +botinfo • +serverinfo • +userinfo • +avatar • +stats```",
                    inline: false
                },
                {
                    name: "🛡️ MODÉRATION",
                    value: "```+ban • +kick • +mute • +unmute • +warn • +clear • +lock • +unlock • +derank • +unban • +temprole • +vmove • +antijoin```",
                    inline: false
                },
                {
                    name: "🔒 PROTECTION ANTI-RAID", 
                    value: "```+secur • +antiraid • +antilink • +sanction • +server lock • +antiban • +antibot • +antichannel • +antidown • +antieveryone • +antiupdate • +antiwebhook```",
                    inline: false
                },
                {
                    name: "⚙️ CONFIGURATION & GESTION",
                    value: "```+config • +prefix • +set • +theme • +owner • +wl • +unwl • +bl • +unbl • +perm • +compet```",
                    inline: false
                },
                {
                    name: "🎫 SYSTÈME TICKETS & UTILITAIRES",
                    value: "```+ticket • +ticketset • +transcript • +permticket • +renew • +giveaway • +reroll • +embed • +buttonrole```",
                    inline: false
                },
                {
                    name: "📊 LOGS & STATISTIQUES",
                    value: "```+modlog • +raidlog • +ticketlog • +boostlog • +giveawaylog • +messagelog • +presetlogs```",
                    inline: false
                },
                {
                    name: "🔍 INFORMATIONS & RECHERCHE",
                    value: "```+lookup • +find • +snipe • +wiki • +calc • +role • +serveur • +vc • +banner • +pic```",
                    inline: false
                }
            )
            .setFooter({ 
                text: `Haruka Protect • ${message.guild.name} • ${message.client.guilds.cache.size} serveurs`, 
                iconURL: message.guild.iconURL() 
            })
            .setTimestamp();

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('📖 Documentation')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://github.com/Yoru6678/Haruka-protect'),
                new ButtonBuilder()
                    .setLabel('🆘 Support')
                    .setStyle(ButtonStyle.Link)
                    .setURL('https://discord.gg/haruka'),
                new ButtonBuilder()
                    .setCustomId('refresh_help')
                    .setLabel('🔄 Rafraîchir')
                    .setStyle(ButtonStyle.Secondary)
            );

        await message.channel.send({ 
            embeds: [embed], 
            components: [row] 
        });
    }
};