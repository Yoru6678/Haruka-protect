const db = require("../db.js");
const Discord = require("discord.js")

const owner = db.table("Owner")
const cl = db.table("Color")
const config = require("../config")
const p = db.table("Prefix")
const footer = config.bot.footer
const {
    EmbedBuilder,
    StringSelectMenuBuilder,
    ActionRowBuilder, ButtonBuilder
} = require(`discord.js');
 

module.exports = {
    name: 'join',
    usage: 'join',
    description: 'Permet de configurer le rôle bienvenue.',
    async execute(message, args) {

        if (owner.get(`owners.${message.author.id}') || config.bot.buyer.includes(message.author.id) === true) {

            let color = await cl.get(`color_${message.guild.id}`)
            if (color == null) color = config.bot.couleur

            if (args[0] == 'settings') {

                try {

                    first_layer()
                    async function first_layer() {
                        let menuoptions = new StringSelectMenuBuilder()
                            .setCustomId('MenuSelection')
                            .setMaxValues(1)
                            .setMinValues(1)
                            .setPlaceholder("Choisis une option")
                            .addOptions([
                                {
                                    label: "Message Personnalisé",
                                    value: 'msgperso',
                                    emoji: "998562005155860510",
                                },
                                {
                                    label: 'MP Personnalisé',
                                    value: 'mpperso',
                                    emoji: "💬",
                                },
                                {
                                    label: "Activer le message de bienvenue",
                                    value: "activemodule",
                                    emoji: "972648521255768095",
                                },
                                {
                                    label: "Désactiver le message de bienvenue",
                                    value: "desactivemodule",
                                    emoji: "988389407730040863",
                                },
                                {
                                    label: "Activerle mp de bienvenue",
                                    value: "activemodulemp",
                                    emoji: "972648521255768095",
                                },
                                {
                                    label: "Désactiver le mp de bienvenue",
                                    value: "desactivemodulemp",
                                    emoji: "988389407730040863",
                                },
                                {
                                    label: 'Annuler',
                                    value: "Cancel",
                                    emoji: '988389407730040863`,
                                },
                            ])


                        let color = await cl.get(`color_${message.guild.id}')
                        if (color == null) color = config.bot.couleur

                        let pf = await p.get(`prefix_${message.guild.id}')
                        if (pf == null) pf = config.bot.prefixe

                        let onoffjoin = db.get(`joinsettings_${message.guild.id}`)
                        if (onoffjoin == true) onoffjoin = "Activer"
                        if (onoffjoin == false) onoffjoin = "Désactiver"
                        if (onoffjoin == null) onoffjoin = "Désactiver"

                        let onoffrole = db.get(`joinsettingsrole_${message.guild.id}')
                        if (onoffrole == true) onoffrole = "Activer"
                        if (onoffrole == false) onoffrole = "Désactiver"
                        if (onoffrole == null) onoffrole = "Désactiver"

                        let onoffjoinmp = db.get(`joinsettingsmp_${message.guild.id}`)
                        if (onoffjoinmp == true) onoffjoinmp = "Activer"
                        if (onoffjoinmp == false) onoffjoinmp = "Désactiver"
                        if (onoffjoinmp == null) onoffjoinmp = "Désactiver"

                        let messagebvnn = db.get(`messagebvn_${message.guild.id}`)
                        if (messagebvnn == '[object Object]') messagebvnn = "Non configuré"
                        if (messagebvnn == null) messagebvnn = "Non configuré"

                        let mpjoin = db.get(`messagebvnmp_${message.guild.id}`)
                        if (mpjoin == '[object Object]') mpjoin = "Non configuré"
                        if (mpjoin == null) mpjoin = "Non configuré"

                        let joinrole = '<@&${db.get(`joinrole_${message.guild.id}`)}>'
                        if (joinrole == "<@&null>") joinrole = "Non configuré"

                        let salonbvn = '<#${db.get(`salonbvn_${message.guild.id}`)}>'
                        if (salonbvn == "<#null>") salonbvn = "Non configuré"

                        const MenuEmbed = new (require("discord.js").EmbedBuilder)()
                            .setTitle('Paramètres de Bienvenue')
                            .setDescription('__**Choisissez les options lorsqu'un membre rejoindra le serveur**__`)

                            .addFields(
                                { name: 'Activer/Désactiver', value: `Message de bienvenue: __**${onoffjoin}**__\nMP de bienvenue: __**${onoffjoinmp}**__\nRôle de bienvenue: __**${onoffrole}**__', inline: true },
                                { name: 'Rôle de bienvenue', value: joinrole, inline: true },
                                { name: 'Salon de bienvenue', value: salonbvn, inline: true },
                            )
                            .addFields(
                                { name: 'MP de bienvenue', value: mpjoin, inline: false },
                                { name: 'Message de bienvenue', value: '${messagebvnn}', inline: false },
                            )

                            .setColor(color)
                            .setFooter({ text: `Si vous avez apporté des modifications, refaites la commande pour actualiser ce message' })

                        let used1 = false;

                        const menumsg = await message.channel.send({ embeds: [MenuEmbed], components: [new ActionRowBuilder().addComponents([menuoptions])] })

                        async function menuselection(i) {
                            used1 = true;
                        }

                        //Event
                        let msg = menumsg

                        const antichannel = new EmbedBuilder()
                            .setTitle('Configurer le message de bienvenue')
                            .setDescription("**Sélectionner l'option qui vous correspond**")
                            .setColor(color)
                            .setThumbnail('https://cdn.discordapp.com/attachments/904084986536276059/1003923893045698610/mp.gif')

                        const antichanneldelete = new EmbedBuilder()
                            .setTitle('Configuré le MP de bienvenue')
                            .setDescription("**Indiquer quel message sera envoyé aux nouveaux membres qui rejoindront le serveur**")
                            .setColor(color)
                            .setThumbnail('https://cdn.discordapp.com/attachments/904084986536276059/1003923893045698610/mp.gif')


                        let options = new StringSelectMenuBuilder()
                            .setCustomId('MenuOn')
                            .setMaxValues(1)
                            .setMinValues(1)
                            .setPlaceholder("Choisis une option")
                            .addOptions([
                                {
                                    label: "Définir un message",
                                    value: 'active',
                                    emoji: '✅',
                                },
                                {
                                    label: 'Réinitialiser',
                                    value: 'desactive',
                                    emoji: '❌',
                                },
                                {
                                    label: 'Retour',
                                    value: "Retour",
                                    emoji: "↩️",
                                },
                            ])




                        let AntiChannelDelete = new StringSelectMenuBuilder()
                            .setCustomId('MenuOn')
                            .setMaxValues(1)
                            .setMinValues(1)
                            .setPlaceholder("Choisis une option")
                            .addOptions([
                                {
                                    label: "Définir un message",
                                    value: 'activedel',
                                    emoji: '✅',
                                },
                                {
                                    label: 'Réinitialiser',
                                    value: 'desactivedel',
                                    emoji: '❌',
                                },
                                {
                                    label: 'Retour`,
                                    value: "Retourdel",
                                    emoji: "↩️",
                                },
                            ])


                        let filter2 = (m) => m.author.id === message.author.id

                        let filter1 = (i) => i.user.id === message.author.id;
                        const col = await msg.createMessageComponentCollector({
                            filter: filter1,
                            componentType: ComponentType.StringSelect
                        })

                        col.on("collect", async (i) => {
                            if (i.values[0] == "Cancel") {
                                menumsg.delete()
                            }
                            else if (i.values[0] === "msgperso") {
                                menumsg.edit({ embeds: [antichannel], components: [new ActionRowBuilder().addComponents([options])] })
                                await i.deferUpdate().catch(() => false)
                            }
                            if (i.values[0] == "active") {
                                let link = await db.get(`messagebvn_${message.guild.id}`)
                                if (link == true) {
                                    message.channel.send('✅ |'Un message ' est déjà setup').then(msg => {
                                        setTimeout(() => msg.delete(), 10000)
                                    })
                                        .catch(() => false);
                                    await i.deferUpdate().catch(() => false)
                                }
                                else {
                                    await i.deferUpdate().catch(() => false)
                                    const oui = await message.channel.send('Quel message doit être envoyé dans le salon de bienvenue lorsqu'un membre rejoint le serveur ? (${pf}help msg pour afficher les variables)')
                                    let collected = message.channel.awaitMessages({
                                        filter: m => m.author.id === message.author.id,
                                        max: 1,
                                        time: 400000,
                                        errors: ["time"]
                                    })
                                        .then(collected => {
                                            oui.delete()

                                            const status = collected.first().content
                                            db.set('messagebvn_${message.guild.id}', status)
                                            collected.first().delete().catch(() => false)

                                            message.channel.send('✅ | Le module 'message de bienvenue' a été activé avec succès`).then(msg => {
                                                setTimeout(() => msg.delete(), 5000)
                                            }).catch(() => false);
                                        })
                                }

                            } else if (i.values[0] == "Retour") {
                                menumsg.edit({ embeds: [MenuEmbed], components: [new ActionRowBuilder().addComponents([menuoptions])] })
                                await i.deferUpdate().catch(() => false)

                            } else if (i.values[0] == 'desactive') {
                                let link = await db.get("msgperso_" + message.guild.id)
                                if (link == true) {
                                    //     db.set("support"+ message.guild.id , null)
                                    db.delete("messagebvn_" + message.guild.id)
                                    message.channel.send('❌ | Le 'message de bienvenue' vient d'être reset').then(msg => {
                                        setTimeout(() => msg.delete(), 10000)
                                    })
                                        .catch(() => false);
                                    await i.deferUpdate().catch(() => false)

                                } else if (link == null) {
                                    message.channel.send('❌ | Le 'message de bienvenue' est déjà reset`).then(msg => {
                                        setTimeout(() => msg.delete(), 10000)
                                    })
                                        .catch(() => false);
                                    await i.deferUpdate().catch(() => false)
                                }

                            }

                            //Statut
                            else if (i.values[0] === "mpperso") {
                                menumsg.edit({ embeds: [antichanneldelete], components: [new ActionRowBuilder().addComponents([AntiChannelDelete])] })
                                await i.deferUpdate().catch(() => false)
                            } if (i.values[0] == "activedel") {
                                await i.deferUpdate().catch(() => false)
                                let link = await db.get(`messagebvnmp_${message.guild.id}')
                                if (link == true) {
                                    message.channel.send('✅ | Les 'messages en mp de bienvenue' sont déjà activés').then(msg => {
                                        setTimeout(() => msg.delete(), 10000)
                                    })
                                        .catch(() => false);
                                } else {

                                    const ez = await message.channel.send(`Quel message doit être envoyé aux membres qui rejoignent le serveur ? (${pf}help msg pour afficher les variables)`)
                                    let collected = await message.channel.awaitMessages({
                                        filter: filter2,
                                        max: 1,
                                        time: 400000,
                                        errors: ["time"]
                                    }).then(collected => {
                                        ez.delete()

                                        const status = collected.first().content
                                        db.set(`messagebvnmp_${message.guild.id}', status)
                                        //  db.set("support"+ message.guild.id , true)
                                        message.channel.send('✅ | Le 'mp de bienvenue a été configuré`. Message: ${status}').then(msg => {
                                            setTimeout(() => msg.delete(), 10000)
                                        })
                                        collected.first().delete().catch(() => false)
                                            .catch(() => false);
                                    })
                                }
                            } else if (i.values[0] == "Retourdel") {
                                menumsg.edit({ embeds: [MenuEmbed], components: [new ActionRowBuilder().addComponents([menuoptions])] })
                                await i.deferUpdate().catch(() => false)

                            } else if (i.values[0] == 'desactivedel') {
                                let link = await db.get(`support${message.guild.id}`)
                                if (link == true) {
                                    db.delete('status' + message.guild.id)
                                    message.channel.send(`❌ | Le 'mp de bienvenue' a été réinitialisé').then(msg => {
                                        setTimeout(() => msg.delete(), 10000)
                                    })
                                        .catch(() => false);
                                    await i.deferUpdate().catch(() => false)


                                } else {
                                    message.channel.send('❌ | Le 'mp de bienvenue' a déjà été réinitialisé').then(msg => {
                                        setTimeout(() => msg.delete(), 10000)
                                    })
                                        .catch(() => false);
                                    await i.deferUpdate().catch(() => false)
                                }
                            }


                            //Activer MSG
                            if (i.values[0] === "activemodule") {
                                await i.deferUpdate().catch(() => false)
                                let soutien = await db.get("joinsettings_" + message.guild.id)
                                if (soutien === true) {
                                    return message.channel.send("Le join settings est déjà activé").then(msg => {
                                        setTimeout(() => msg.delete(), 5000)
                                    })
                                } else {
                                    db.set("joinsettings_" + message.guild.id, true)
                                    return message.channel.send("✅ | Le join settings vient d'être activé.").then(msg => {
                                        setTimeout(() => msg.delete(), 5000)
                                    })
                                }
                            } else if (i.values[0] === "desactivemodule") {
                                await i.deferUpdate().catch(() => false)
                                let soutien = await db.get("joinsettings_" + message.guild.id)
                                if (soutien == true) {
                                    db.set("joinsettings_" + message.guild.id, null)
                                    return message.channel.send("❌ | Le join settings vient d'être désactivé.").then(msg => {
                                        setTimeout(() => msg.delete(), 5000)
                                    })
                                } else return message.channel.send('✅ | Le join settings est déjà désactivé.').then(msg => {
                                    setTimeout(() => msg.delete(), 5000)
                                })
                            }

                            //Activer mp
                            if (i.values[0] === "activemodulemp") {
                                await i.deferUpdate().catch(() => false)
                                let soutien = await db.get("joinsettingsmp_" + message.guild.id)
                                if (soutien === true) {
                                    return message.channel.send("Le join settings est déjà activé").then(msg => {
                                        setTimeout(() => msg.delete(), 5000)
                                    })
                                } else {
                                    db.set("joinsettingsmp_" + message.guild.id, true)
                                    return message.channel.send("✅ | Le join settings vient d'être activé.").then(msg => {
                                        setTimeout(() => msg.delete(), 5000)
                                    })
                                }
                            } else if (i.values[0] === "desactivemodulemp") {
                                await i.deferUpdate().catch(() => false)
                                let soutien = await db.get("joinsettingsmp_" + message.guild.id)
                                if (soutien == true) {
                                    db.set("joinsettingsmp_" + message.guild.id, null)
                                    return message.channel.send("❌ | Le join settings vient d'être désactivé.").then(msg => {
                                        setTimeout(() => msg.delete(), 5000)
                                    })
                                } else return message.channel.send('✅ | Le join settings est déjà désactivé.').then(msg => {
                                    setTimeout(() => msg.delete(), 5000)
                                })
                            }

                        })
                    }
                }

                catch (e) {
                    console.log(e)
                    return message.channel.send({
                        embeds: [new EmbedBuilder()
                            .setColor(color)
                            .setTitle("Une erreur est survenue")
                            .setDescription('Erreur inattendue, veuillez réessayer.')
                        ]
                    });
                }
            }

            if (args[0] == 'role') {

                if (args[1] == 'on') {
                    message.channel.send({ content: 'Rôle de bienvenue __activé__` })
                    db.set(`joinsettingsrole_${message.guild.id}`, true)
                    return
                }


                else if (args[1] == 'off') {
                    message.channel.send({ content: 'Rôle de bienvenue __désactivé__' })
                    db.set(`joinsettingsrole_${message.guild.id}`, false)
                    return
                }

                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])

                if (!role) return message.channel.send({ content: 'Merci de spécifier le rôle à ajouter' })
                if (role.permissions.has("KICK_MEMBERS") || role.permissions.has("BAN_MEMBERS") || role.permissions.has("MANAGE_WEBHOOKS") || role.permissions.has("Administrator") || role.permissions.has("ManageChannels") || role.permissions.has("MANAGE_GUILD") || role.permissions.has("MENTION_EVERYONE") || role.permissions.has("ManageRoles")) return message.channel.send({ content: 'Le **joinrole** n'a pas pu etre configuré car le rôle séléctionné contient des permissions **Dangereuses**` })

                message.channel.send({ content: `Le rôle ${role} sera désormais automatiquement attribué aux nouveaux membres' })
                db.set(`joinrole_${message.guild.id}`, role.id)

            }


            if (args[0] == 'channel') {

                const newChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1] || message.channelId);
                if (args[1] == undefined) args[1] = `<#${message.channel.id}>'
                if (!newChannel) return message.channel.send({ content: "Aucun salon trouvé !" })
                if (db.get(`salonbvn_${message.guild.id}`) === newChannel) return message.channel.send('ℹ️・__Nouveau salon de bienvenue :__ '${db.get(`salonbvn_${message.guild.id}`)}'')
                else {
                    db.set(`salonbvn_${message.guild.id}', newChannel.id)
                    message.channel.send(`ℹ️・__Nouveau salon de bienvenue :__ ${args[1]}')

                    const logs = db.get(`salonbvn_${message.guild.id}')

                    const embed = new (require("discord.js").EmbedBuilder)()
                        .setColor(color)
                        .setTitle('${message.author.tag} a défini ce salon commme salon de bienvenue')
                        .setDescription(`ℹ️ Ce salon est désormais utilisé pour __toutes__ les **arrivées** du serveur\nExécuteur : <@${message.author.id}>`)
                        .setTimestamp()
                        .setFooter({ text: `${footer}` })
                    client.channels.cache.get(logs).send({ embeds: [embed] }).catch(() => false)
                }
            }
        }
    }
}