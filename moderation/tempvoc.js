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
} = require(`discord.js`);

module.exports = {
    name: 'tempvoc',
    usage: 'tempvoc',
    description: `Permet de configuréer des salons vocal temporaire.`,
    async execute(message, args) {

        if (owner.get(`owners.${message.author.id}`) || config.bot.buyer.includes(message.author.id)   === true) {

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
                                label: "Catégorie Tempvoc",
                                value: `categorietempvoc`,
                                emoji: "998562005155860510",
                            },
                            {
                                label: 'Salon Tempvoc',
                                value: `salontempvoc`,
                                emoji: "💬",
                            },
                            {
                                label: "Activé les vocaux temporaires",
                                value: "activéemodule",
                                emoji: "972648521255768095",
                            },
                            {
                                label: "Désactivéé les vocaux temporaires",
                                value: "desactivéemodule",
                                emoji: "988389407730040863",
                            },
                            {
                                label: 'Annulé',
                                value: "Cancel",
                                emoji: '988389407730040863',
                            },
                        ])


                    let color = await cl.get(`color_${message.guild.id}`)
                    if (color == null) color = config.bot.couleur

                    let pf = await p.get(`prefix_${message.guild.id}`)
                    if (pf == null) pf = config.bot.prefixe

                    let tempvocsettings = db.get(`tempvocsettings_${message.guild.id}`)
                    if (tempvocsettings == null) tempvocsettings = "Non Configuré"
                    if (tempvocsettings == true) tempvocsettings = "Activé"
                    if (tempvocsettings == false) tempvocsettings = "Desactivéé"

                    let categorytemp = `<#${db.get(`categorytempvoc_${message.guild.id}`)}>`
                    if (categorytemp == "<#null>") categorytemp = "Non Configuré"

                    let salontemp = `<#${db.get(`salontempvoc_${message.guild.id}`)}>`
                    if (salontemp == "<#null>") salontemp = "Non configuréé"


                    const MenuEmbed = new (require("discord.js").EmbedBuilder)()
                        .setTitle('Vocaux Temporaires')
                        .setDescription(`__**Choisissez les options pour configuréé les vocaux temporaires**__`)
                        .addFields(
                            { name: 'Activé/Désactivéé', value: `Tempvoc: __**${tempvocsettings}**__`, inline: true },
                            { name: 'Catégorie tempvoc', value: `Catégorie: __**${categorytemp}**__`, inline: true },
                            { name: 'Salon tempvoc', value: `Salon: __**${salontemp}**__`, inline: true },
                        )
                        .setColor(color)
                        .setFooter({ text: `Si vous avez fait des modifications refaite la commande pour actualiser ce message.` })

                    let used1 = false;

                    const menumsg = await message.channel.send({ embeds: [MenuEmbed], components: [new ActionRowBuilder().addComponents([menuoptions])] })

                    async function menuselection(i) {
                        used1 = true;
                    }

                    //Event
                    let msg = menumsg

                    const antichannel = new EmbedBuilder()
                        .setTitle(`Configuré les salons temporaires`)
                        .setDescription("**Sélectionner l'option qui vous correspond**")
                        .setColor(color)
                        .setImage('https://cdn.discordapp.com/attachments/904084986536276059/1003966590867472525/2022-08-02_11-59-40.gif')

                    const antichanneldelete = new EmbedBuilder()
                        .setTitle(`Sélectionner l'option qui vous correspond`)
                        .setDescription("**Sélectionner l'option qui vous correspond**")
                        .setColor(color)
                        .setImage('https://cdn.discordapp.com/attachments/904084986536276059/1003966590867472525/2022-08-02_11-59-40.gif')

                    let options = new StringSelectMenuBuilder()
                        .setCustomId('MenuOn')
                        .setMaxValues(1)
                        .setMinValues(1)
                        .setPlaceholder("Choisis une option")
                        .addOptions([
                            {
                                label: "Définir une Catégorie",
                                value: `activée`,
                                emoji: '✅',
                            },
                            {
                                label: 'Réinitialiser',
                                value: `desactivée`,
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
                                label: "Définir un Salon",
                                value: `activéedel`,
                                emoji: '✅',
                            },
                            {
                                label: 'Réinitialiser',
                                value: `desactivéedel`,
                                emoji: '❌',
                            },
                            {
                                label: 'Retour',
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
                        else if (i.values[0] === "categorietempvoc") {
                            menumsg.edit({ embeds: [antichannel], components: [new ActionRowBuilder().addComponents([options])] })
                            await i.deferUpdate().catch(() => false)
                        }
                        if (i.values[0] == "activée") {
                            let link = await db.get(`categorytempvoc_${message.guild.id}`)
                            if (link == true) {
                                message.channel.send(`✅ |`Une catégorie ` est déjà setup`).then(msg => {
                                    setTimeout(() => msg.delete(), 10000)
                                })
                                    .catch(() => false);
                                await i.deferUpdate().catch(() => false)
                            }
                            else {
                                await i.deferUpdate().catch(() => false)
                                const oui = await message.channel.send(`Quelle est la catégorie ou seront créer les vocaux temporaires`)
                                let collected = message.channel.awaitMessages({
                                    filter: m => m.author.id === message.author.id,
                                    max: 1,
                                    time: 100000,
                                    errors: ["time"]
                                })
                                    .then(collected => {
                                        oui.delete()

                                        const status = collected.first().content
                                        db.set(`categorytempvoc_${message.guild.id}`, status)
                                        collected.first().delete().catch(() => false)

                                        message.channel.send(`✅ |`La catégorie ` a bien été enregistrée`).then(msg => {
                                            setTimeout(() => msg.delete(), 5000)
                                        }).catch(() => false);
                                    })
                            }

                        } else if (i.values[0] == "Retour") {
                            menumsg.edit({ embeds: [MenuEmbed], components: [new ActionRowBuilder().addComponents([menuoptions])] })
                            await i.deferUpdate().catch(() => false)

                        } else if (i.values[0] == 'desactivée') {
                            let link = await db.get("messagebvn_" + message.guild.id)
                            if (link == true) {
                                //     db.set("support"+ message.guild.id , null)
                                db.delete("messagebvn_" + message.guild.id)
                                message.channel.send(`❌ |`Le message de bienvenue ` vient d'être reset`).then(msg => {
                                    setTimeout(() => msg.delete(), 10000)
                                })
                                    .catch(() => false);
                                await i.deferUpdate().catch(() => false)

                            } else if (link == null) {
                                message.channel.send(`❌ |`Le message de bienvenue ` est déjà reset`).then(msg => {
                                    setTimeout(() => msg.delete(), 10000)
                                })
                                    .catch(() => false);
                                await i.deferUpdate().catch(() => false)
                            }

                        }

                        //Statut
                        else if (i.values[0] === "salontempvoc") {
                            menumsg.edit({ embeds: [antichanneldelete], components: [new ActionRowBuilder().addComponents([AntiChannelDelete])] })
                            await i.deferUpdate().catch(() => false)
                        } if (i.values[0] == "activéedel") {
                            await i.deferUpdate().catch(() => false)
                            let link = await db.get(`salontempvoc_${message.guild.id}`)
                            if (link == true) {
                                message.channel.send(`✅ |`Le salon tempvoc ` est déjà configuréé`).then(msg => {
                                    setTimeout(() => msg.delete(), 10000)
                                })
                                    .catch(() => false);
                            } else {

                                const ez = await message.channel.send(`Quel salon sera utilisé pour les vocaux temporaires`)
                                let collected = await message.channel.awaitMessages({
                                    filter: filter2,
                                    max: 1,
                                    time: 5000,
                                    errors: ["time"]
                                }).then(collected => {
                                    ez.delete()

                                    const status = collected.first().content
                                    db.set(`salontempvoc_${message.guild.id}`, status)
                                    //  db.set("support"+ message.guild.id , true)
                                    message.channel.send(`✅ |`Le salon des vocaux temporaires a été enregistrée `Salon: <#${status}>`).then(msg => {
                                        setTimeout(() => msg.delete(), 10000)
                                    })
                                    collected.first().delete().catch(() => false)
                                        .catch(() => false);
                                })
                            }
                        } else if (i.values[0] == "Retourdel") {
                            menumsg.edit({ embeds: [MenuEmbed], components: [new ActionRowBuilder().addComponents([menuoptions])] })
                            await i.deferUpdate().catch(() => false)

                        } else if (i.values[0] == 'desactivéedel') {
                            let link = await db.get(`support${message.guild.id}`)
                            if (link == true) {
                                db.delete('status' + message.guild.id)
                                message.channel.send(`❌ |`Les vocaux temporaires ` vien d'être reset`).then(msg => {
                                    setTimeout(() => msg.delete(), 10000)
                                })
                                    .catch(() => false);
                                await i.deferUpdate().catch(() => false)


                            } else {
                                message.channel.send(`❌ |`Les vocaux temporaires ` sont déjà reset`).then(msg => {
                                    setTimeout(() => msg.delete(), 10000)
                                })
                                    .catch(() => false);
                                await i.deferUpdate().catch(() => false)
                            }
                        }


                        //activéé MSG
                        if (i.values[0] === "activéemodule") {
                            await i.deferUpdate().catch(() => false)
                            let soutien = await db.get("tempvocsettings_" + message.guild.id)
                            if (soutien === true) {
                                return message.channel.send("Les vocaux temporaires sont déjà activéés").then(msg => {
                                    setTimeout(() => msg.delete(), 5000)
                                })
                            } else {
                                db.set("tempvocsettings_" + message.guild.id, true)
                                return message.channel.send("✅ |Les vocaux temporaires viennent d'être activéés.").then(msg => {
                                    setTimeout(() => msg.delete(), 5000)
                                })
                            }
                        } else if (i.values[0] === "desactivéemodule") {
                            await i.deferUpdate().catch(() => false)
                            let soutien = await db.get("tempvocsettings_" + message.guild.id)
                            if (soutien == true) {
                                db.set("tempvocsettings_" + message.guild.id, null)
                                return message.channel.send("❌ | Les vocaux temporaires viennent d'être désactivéés.").then(msg => {
                                    setTimeout(() => msg.delete(), 5000)
                                })
                            } else return message.channel.send('✅ | Les vocaux temporaires sont déjà désactivéés.').then(msg => {
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
                        .setTitle("Une erreur est survenu")
                        .setDescription('Erreur intattenudu')
                    ]
                });
            }
        }
    }
}
