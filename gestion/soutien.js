const db = require("../db.js");
const Discord = require("discord.js")

const owner = db.table("Owner")
const cl = db.table("Color")
const config = require("../config")
const footer = config.bot.footer
const {
    MessageEmbed,
    MessageSelectMenu,
    MessageActionRow, MessageButton
} = require(`discord.js`);

module.exports = {
    name: 'soutien',
    usage: 'soutien',
    description: `Permet de configurer le rôle soutien.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.bot.buyer.includes(message.author.id)   === true) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.bot.couleur

            try {

                first_layer()
                async function first_layer() {
                    let menuoptions = new MessageSelectMenu()
                        .setCustomId('MenuSelection')
                        .setMaxValues(1)
                        .setMinValues(1)
                        .setPlaceholder("Choisis une option")
                        .addOptions([
                            {
                                label: "Rôle",
                                value: `Role`,
                                emoji: "👥",
                            },
                            {
                                label: 'Statut',
                                value: `Statut`,
                                emoji: "💬",
                            },
                            {
                                label: 'Configuration',
                                value: "Settings",
                                emoji: "⚙️"
                            },
                            {
                                label: "Activer le soutien",
                                value: "activemodule",
                                emoji: "✅",
                            },
                            {
                                label: "Désactiver le soutien",
                                value: "desactivemodule",
                                emoji: "❌",
                            },
                            {
                                label: 'Annuler',
                                value: "Cancel",
                                emoji: '❌',
                            },
                        ])


                    let MenuEmbed = new MessageEmbed()
                        .setColor(color)
                        .setTitle("Soutien")
                        .setDescription(`**Choisissez une option pour configurer le rôle soutien et son statut**`)
                    let used1 = false;

                    const menumsg = await message.channel.send({ embeds: [MenuEmbed], components: [new MessageActionRow().addComponents([menuoptions])] })

                    function menuselection(i) {
                        used1 = true;
                    }

                    //Event
                    let msg = menumsg

                    const antichannel = new MessageEmbed()
                        .setTitle(`Configurer le rôle`)
                        .setDescription("**Sélectionnez l'option qui vous correspond**")
                        .setColor(color)
                        .setImage('https://cdn.discordapp.com/attachments/904084986536276059/991543407694585866/role.gif')

                    const antichanneldelete = new MessageEmbed()
                        .setTitle(`Configurer le statut`)
                        .setDescription("**Indiquez le statut à avoir pour obtenir le rôle soutien**")
                        .setColor(color)


                    let options = new MessageSelectMenu()
                        .setCustomId('MenuOn')
                        .setMaxValues(1)
                        .setMinValues(1)
                        .setPlaceholder("Choisissez une option")
                        .addOptions([
                            {
                                label: "Définir un rôle",
                                value: `active`,
                                emoji: '✅',
                            },
                            {
                                label: 'Réinitialiser',
                                value: `desactive`,
                                emoji: '❌',
                            },
                            {
                                label: 'Retour',
                                value: "Retour",
                                emoji: "↩️",
                            },
                        ])




                    let AntiChannelDelete = new MessageSelectMenu()
                        .setCustomId('MenuOn')
                        .setMaxValues(1)
                        .setMinValues(1)
                        .setPlaceholder("Choisissez une option")
                        .addOptions([
                            {
                                label: "Définir un statut",
                                value: `activedel`,
                                emoji: '✅',
                            },
                            {
                                label: 'Réinitialiser',
                                value: `desactivedel`,
                                emoji: '❌',
                            },
                            {
                                label: 'Retour',
                                value: "Retourdel",
                                emoji: "↩️",
                            },
                        ])


                    let filter2 = (m) => m.author.id === message.author.id
                    let filter3 = m => {
                        if (m.mentions.roles.size == 0) return message.channel.send('Rôle invalide')
                    }
                    let filter1 = (i) => i.user.id === message.author.id;
                    const col = await msg.createMessageComponentCollector({
                        filter: filter1,
                        componentType: "SELECT_MENU"
                    })

                    col.on("collect", async (i) => {
                        if (i.values[0] == "Cancel") {
                            menumsg.delete()
                        }
                        else if (i.values[0] === "Role") {
                            menumsg.edit({ embeds: [antichannel], components: [new MessageActionRow().addComponents([options])] })
                            await i.deferUpdate().catch(() => false)
                        }
                        if (i.values[0] == "active") {
                            let link = db.fetch("role" + message.guild.id)
                            if (link == true) {
                                message.channel.send(`✅ | Un \`rôle\` est déjà setup`).then(msg => {
                                    setTimeout(() => msg.delete(), 10000)
                                })
                                    .catch(() => false);
                                await i.deferUpdate().catch(() => false)
                            }
                            else {
                                await i.deferUpdate().catch(() => false)
                                const oui = await message.channel.send('Quelle rôle doit être attribué ?')
                                let collected = message.channel.awaitMessages({
                                    filter: m => m.author.id === message.author.id,
                                    max: 1,
                                    time: 100000,
                                    errors: ["time"]
                                })
                                    .then(collected => {
                                        oui.delete()
                                        var coll = collected.first();
                                        let role =
                                            coll.mentions.roles.first()
                                        // db.set('support' + message.guild.id,true)
                                        collected.first().delete().catch(() => false)
                                        if (!role) return message.channel.send('Role invalide')
                                        if (role.permissions.has("KICK_MEMBERS") || role.permissions.has("BAN_MEMBERS") || role.permissions.has("MANAGE_WEBHOOKS") || role.permissions.has("ADMINISTRATOR") || role.permissions.has("MANAGE_CHANNELS") || role.permissions.has("MANAGE_GUILD") || role.permissions.has("MENTION_EVERYONE") || role.permissions.has("MANAGE_ROLES"))
                                            return message.channel.send("Ce rôle ne peut pas être défini en rôle de \`soutien\` car il possède des permissions dangereuses")

                                        db.set('role' + message.guild.id, role.id)

                                        message.channel.send(`✅ | Le module \`soutien\` a été activé avec succès, rôle soutien : **${role.name}**`).then(msg => {
                                            setTimeout(() => msg.delete(), 3000)
                                        }).catch(() => false);
                                    })
                            }

                        } else if (i.values[0] == "Retour") {
                            menumsg.edit({ embeds: [MenuEmbed], components: [new MessageActionRow().addComponents([menuoptions])] })
                            await i.deferUpdate().catch(() => false)

                        } else if (i.values[0] == 'desactive') {
                            let link = db.fetch("support" + message.guild.id)
                            if (link == true) {
                                //     db.set("support"+ message.guild.id , null)
                                db.delete("role" + message.guild.id)
                                message.channel.send(`❌ | Le \`rôle de soutien\` vient d'être réinitialiser`).then(msg => {
                                    setTimeout(() => msg.delete(), 10000)
                                })
                                    .catch(() => false);
                                await i.deferUpdate().catch(() => false)

                            } else if (link == null) {
                                message.channel.send(`❌ | Le \`rôle de soutien\` est déjà réinitialiser`).then(msg => {
                                    setTimeout(() => msg.delete(), 10000)
                                })
                                    .catch(() => false);
                                await i.deferUpdate().catch(() => false)
                            }

                        }

                        //Statut
                        else if (i.values[0] === "Statut") {
                            menumsg.edit({ embeds: [antichanneldelete], components: [new MessageActionRow().addComponents([AntiChannelDelete])] })
                            await i.deferUpdate().catch(() => false)
                        } if (i.values[0] == "activedel") {
                            await i.deferUpdate().catch(() => false)
                            let link = db.fetch(`status${message.guild.id}`)
                            if (link == true) {
                                message.channel.send(`✅ | Le module de \`statut\` est déjà activé`).then(msg => {
                                    setTimeout(() => msg.delete(), 10000)
                                })
                                    .catch(() => false);
                            } else {

                                const ez = await message.channel.send('Quelle texte doit être dans le statut ? (*Les espaces ne seront pas comptés*)')
                                let collected = await message.channel.awaitMessages({
                                    filter: filter2,
                                    max: 1,
                                    time: 5000,
                                    errors: ["time"]
                                }).then(collected => {
                                    ez.delete()

                                    const status = collected.first().content
                                    db.set("status" + message.guild.id, status)
                                    //  db.set("support"+ message.guild.id , true)
                                    message.channel.send(`✅ | Le \`statut\` a été configuré avec comme statut ${status}`).then(msg => {
                                        setTimeout(() => msg.delete(), 10000)
                                    })
                                    collected.first().delete().catch(() => false)
                                        .catch(() => false);
                                })
                            }
                        } else if (i.values[0] == "Retourdel") {
                            menumsg.edit({ embeds: [MenuEmbed], components: [new MessageActionRow().addComponents([menuoptions])] })
                            await i.deferUpdate().catch(() => false)

                        } else if (i.values[0] == 'desactivedel') {
                            let link = db.fetch(`support${message.guild.id}`)
                            if (link == true) {
                                db.delete('status' + message.guild.id)
                                message.channel.send(`❌ |Le \`statut\` vient d'être réinitialisé`).then(msg => {
                                    setTimeout(() => msg.delete(), 10000)
                                })
                                    .catch(() => false);
                                await i.deferUpdate().catch(() => false)


                            } else {
                                message.channel.send(`❌ | Le \`statut\` est déjà réinitialisé`).then(msg => {
                                    setTimeout(() => msg.delete(), 10000)
                                })
                                    .catch(() => false);
                                await i.deferUpdate().catch(() => false)
                            }
                        }


                        //activé
                        if (i.values[0] === "activemodule") {
                            await i.deferUpdate().catch(() => false)
                            let soutien = db.fetch("support" + message.guild.id)
                            if (soutien === true) {
                                return message.channel.send("Le module de \`soutien\` est déjà activé").then(msg => {
                                    setTimeout(() => msg.delete(), 5000)
                                })
                            } else {
                                db.set("support" + message.guild.id, true)
                                return message.channel.send("✅ | Le module de \`soutien\` vient d'être activé.").then(msg => {
                                    setTimeout(() => msg.delete(), 5000)
                                })
                            }
                        } else if (i.values[0] === "desactivemodule") {
                            await i.deferUpdate().catch(() => false)
                            let soutien = db.fetch("support" + message.guild.id)
                            if (soutien == true) {
                                db.set("support" + message.guild.id, null)
                                return message.channel.send("❌ | Le module de \`soutien\` vient d'être désactivé.").then(msg => {
                                    setTimeout(() => msg.delete(), 5000)
                                })
                            } else return message.channel.send('✅ | Le module de \`soutien\` est déjà désactivé.').then(msg => {
                                setTimeout(() => msg.delete(), 5000)
                            })
                        }


                        let role = await db.fetch("role" + message.guild.id)
                        let statut = await db.fetch("status" + message.guild.id)
                        //remove
                        if (i.values[0] === "Settings") {
                            await i.deferUpdate().catch(() => false)
                            const paramètre = new MessageEmbed()
                                .setTitle('Soutien')
                                .setColor(color)
                                .setDescription(`**Voici la configuration du soutien**\n\n**Rôle Soutien:** <@&${role}>\n**Statut à avoir**: __${statut}__`)

                            menumsg.edit({ embeds: [paramètre], components: [new MessageActionRow().addComponents([menuoptions])] })

                        }

                    })
                }
            }

            catch (e) {
                console.log(e)
                return message.channel.send({
                    embeds: [new MessageEmbed()
                        .setColor(color)
                        .setTitle("Une erreur est survenu")
                        .setDescription('Erreur inattendue')
                    ]
                });
            }
        }
    }

}
