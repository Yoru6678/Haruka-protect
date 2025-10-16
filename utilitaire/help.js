const db = require("../db.js");
const Discord = require("discord.js").default || require("discord.js").default || require("discord.js").default || require("discord.js");
const config = require("../config");

const p = db.table("Prefix");
const cl = db.table("Color");
const owner = db.table("Owner");
const footer = config.bot.footer;
const paginationEmbed = require('discordjs-button-pagination');

module.exports = {
    name: 'help',
    usage: 'help',
    category: "utils",
    description: "Permet d'afficher l'help.",
    async execute(message, args) {

        let pf = await p.get(`prefix_${message.guild.id}`);
        if (pf == null) pf = config.bot.prefixe;
        
        let color = await cl.get(`color_${message.guild.id}`);
        if (color == null) color = config.bot.couleur;

        if (args[0] === "variable") {
            const premiumTier = {
                NONE: 0,
                TIER_1: 1,
                TIER_2: 2,
                TIER_3: 3,
            };

            const embed = new (require("discord.js").default || require("discord.js").EmbedBuilder)()
                .setTitle("Arguments de messages")
                .setDescription("Exemple de message simple: `{MemberMention} nous a rejoint, nous sommes maintenant {MemberCount} sur {Server}`")
                .addFields(
                    { name: '{MemberName}', value: 'Le nom du membre concerné\n`Exemple: Funny`', inline: true },
                    { name: '{MemberMention}', value: "Mentionne le membre concerné\n`Exemple:` <@" + message.author.id + ">", inline: true },
                    { name: '{MemberTag}', value: 'Le nom et le # du membre concerné\n`Exemple: Funny#0666`', inline: true },
                )
                .addFields(
                    { name: '{MemberID}', value: "L'ID du membre concerné\n`Exemple: " + message.author.id + "`", inline: true },
                    { name: '{MemberCount}', value: "Le nombre total de membres sur le serveur\n`Exemple: " + message.guild.memberCount + "`", inline: true },
                    { name: '{Server}', value: "Le nom du serveur\n`Exemple: " + message.guild.name + "`", inline: true },
                )
                .setColor(color);

            message.channel.send({ embeds: [embed] });
            return;
        }

        if (args[0] === "all") {
            const public = new (require("discord.js").default || require("discord.js").EmbedBuilder)()
                .setTitle('Commandes Publiques')
                .setDescription(`**\`${pf}help\`**
**\`${pf}ping\`**
**\`${pf}serverinfo\`**
**\`${pf}userinfo\`**
**\`${pf}avatar\`**
**\`${pf}banner\`**
**\`${pf}snipe\`**`)
                .setFooter({ text: `${footer} | Préfixe : ${pf}` })
                .setColor(color);

            const perm1 = new (require("discord.js").default || require("discord.js").EmbedBuilder)()
                .setTitle('Permission 1')
                .setDescription(`**\`${pf}mute\`**
**\`${pf}unmute\`**
**\`${pf}voicemute\`**
**\`${pf}voiceunmute\`**`)
                .setFooter({ text: `${footer} | Préfixe : ${pf}` })
                .setColor(color);

            const perm2 = new (require("discord.js").default || require("discord.js").EmbedBuilder)()
                .setTitle('Permission 2')
                .setDescription(`**\`${pf}clear\`**
**\`${pf}hide\`**
**\`${pf}unhide\`**`)
                .setFooter({ text: `${footer} | Préfixe : ${pf}` })
                .setColor(color);

            const perm3 = new (require("discord.js").default || require("discord.js").EmbedBuilder)()
                .setTitle('Permission 3')
                .setDescription(`**\`${pf}kick\`**
**\`${pf}ban\`**
**\`${pf}unban\`**
**\`${pf}lock\`**
**\`${pf}unlock\`**
**\`${pf}renew\`**
**\`${pf}embed\`**`)
                .setFooter({ text: `${footer} | Préfixe : ${pf}` })
                .setColor(color);

            const ownerEmbed = new (require("discord.js").default || require("discord.js").EmbedBuilder)()
                .setTitle('Permission Owner')
                .setDescription(`**\`${pf}wl\`**
**\`${pf}unwl\`**
**\`${pf}secur\`**
**\`${pf}sanction\`**
**\`${pf}antiraid\`**`)
                .setFooter({ text: `${footer} | Préfixe : ${pf}` })
                .setColor(color);

            const button1 = new Discord.ButtonBuilder()
                .setCustomId('gauche')
                .setLabel('◀')
                .setStyle('Danger');

            const button2 = new Discord.ButtonBuilder()
                .setCustomId('droite')
                .setLabel('▶')
                .setStyle('Danger');

            const pages = [public, perm1, perm2, perm3, ownerEmbed];
            const buttonList = [button1, button2];

            paginationEmbed(message, pages, buttonList);
            return;
        }

        const row = new Discord.ActionRowBuilder().addComponents(
            new Discord.StringSelectMenuBuilder()
                .setCustomId('help')
                .setPlaceholder("Choisissez une catégorie")
                .addOptions([
                    {
                        label: 'Utilitaire',
                        value: 'help',
                        emoji: "🔧",
                    },
                    {
                        label: 'Antiraid',
                        value: 'antiraid',
                        emoji: "🛡️",
                    },
                    {
                        label: 'Logs',
                        value: 'logs',
                        emoji: "📋",
                    },
                    {
                        label: 'Gestion',
                        value: 'gestion',
                        emoji: "⚙️",
                    },
                    {
                        label: 'Modération',
                        value: 'moderation',
                        emoji: "🔨",
                    },
                    {
                        label: 'Owner',
                        value: 'owner',
                        emoji: '👑',
                    },
                ])
        );

        const Help = new (require("discord.js").default || require("discord.js").EmbedBuilder)()
            .setTitle("Utilitaire")
            .setDescription(`**\`${pf}help\`** - Menu d'aide
**\`${pf}ping\`** - Latence du bot
**\`${pf}avatar\`** - Avatar d'un membre
**\`${pf}banner\`** - Bannière d'un membre
**\`${pf}serverinfo\`** - Infos sur le serveur
**\`${pf}userinfo\`** - Infos sur un membre
**\`${pf}snipe\`** - Dernier message supprimé`)
            .setFooter({ text: `${footer} | Préfixe : ${pf}` })
            .setColor(color);

        const moderation = new (require("discord.js").default || require("discord.js").EmbedBuilder)()
            .setTitle('Modération')
            .setDescription(`**\`${pf}kick\`** - Expulser un membre
**\`${pf}ban\`** - Bannir un membre
**\`${pf}unban\`** - Débannir un membre
**\`${pf}mute\`** - Rendre muet
**\`${pf}unmute\`** - Retirer le mute
**\`${pf}clear\`** - Supprimer des messages
**\`${pf}lock\`** - Verrouiller un salon
**\`${pf}unlock\`** - Déverrouiller un salon`)
            .setFooter({ text: `${footer} | Préfixe : ${pf}` })
            .setColor(color);

        const Owner = new (require("discord.js").default || require("discord.js").EmbedBuilder)()
            .setTitle('Owner')
            .setDescription(`**\`${pf}wl\`** - Ajouter à la whitelist
**\`${pf}unwl\`** - Retirer de la whitelist
**\`${pf}derank\`** - Retirer tous les rôles
**\`${pf}owner\`** - Ajouter un owner
**\`${pf}unowner\`** - Retirer un owner`)
            .setFooter({ text: `${footer} | Préfixe : ${pf}` })
            .setColor(color);

        const antiraid = new (require("discord.js").default || require("discord.js").EmbedBuilder)()
            .setTitle('Antiraid')
            .setDescription(`**\`${pf}secur\`** - Panel de sécurité
**\`${pf}sanction\`** - Configurer les sanctions
**\`${pf}bypass\`** - Voir les permissions
**\`${pf}antiban\`** - Anti bannissement
**\`${pf}antibot\`** - Anti ajout de bot
**\`${pf}antichannel\`** - Anti salon
**\`${pf}antirole\`** - Anti rôle`)
            .setFooter({ text: `${footer} | Préfixe : ${pf}` })
            .setColor(color);

        const Gestion = new (require("discord.js").default || require("discord.js").EmbedBuilder)()
            .setTitle("Gestion")
            .setDescription(`**\`${pf}giveaway\`** - Lancer un giveaway
**\`${pf}gend\`** - Terminer un giveaway
**\`${pf}reroll\`** - Reroll un giveaway
**\`${pf}renew\`** - Recréer le salon
**\`${pf}embed\`** - Créer un embed
**\`${pf}ticket\`** - Système de tickets`)
            .setFooter({ text: `${footer} | Préfixe : ${pf}` })
            .setColor(color);

        const logs = new (require("discord.js").default || require("discord.js").EmbedBuilder)()
            .setTitle('Logs')
            .setDescription(`**\`${pf}messagelog\`** - Logs des messages
**\`${pf}modlog\`** - Logs de modération
**\`${pf}ticketlog\`** - Logs des tickets
**\`${pf}boostlog\`** - Logs des boosts
**\`${pf}raidlog\`** - Logs antiraid`)
            .setFooter({ text: `${footer} | Préfixe : ${pf}` })
            .setColor(color);

        message.channel.send({ embeds: [Help], components: [row] }).then(async msg => {
            const collector = message.channel.createMessageComponentCollector({
                componentType: ComponentType.StringSelect,
                filter: (i => i.user.id === message.author.id),
                time: 120000
            });

            collector.on("collect", async (collected) => {
                collected.deferUpdate();
                const value = collected.values[0];

                if (value === "help") {
                    msg.edit({ embeds: [Help], components: [row] });
                } else if (value === "moderation") {
                    msg.edit({ embeds: [moderation], components: [row] });
                } else if (value === "owner") {
                    msg.edit({ embeds: [Owner], components: [row] });
                } else if (value === "antiraid") {
                    msg.edit({ embeds: [antiraid], components: [row] });
                } else if (value === "gestion") {
                    msg.edit({ embeds: [Gestion], components: [row] });
                } else if (value === "logs") {
                    msg.edit({ embeds: [logs], components: [row] });
                }
            });

            collector.on("end", () => {
                msg.edit({ components: [] }).catch(() => {});
            });
        });
    }
};