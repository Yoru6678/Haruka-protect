const db = require("../db.js");
const Discord = require("discord.js")
const config = require("../config")
const footer = config.bot.footer

const owner = db.table("Owner")
const p = db.table("Prefix")
const punish = db.table("Punition")
const cl = db.table("Color")
const atc = db.table("antichannelcreate")
const atd = db.table("antichanneldelete")
const acu = db.table("antichannelupdate")
const al = db.table("AntiLink")
const atr = db.table("antirolecreate")
const ard = db.table("antiroledelete")
const aru = db.table("antiroleupdate")
const aw = db.table("antiwebhook")
const agu = db.table("Guildupdate")
const atb = db.table("Antibot")
const aba = db.table("Antiban")
const ae = db.table("Antieveryone")
const ad = db.table("Antidown")
const lock = db.table("Serverlock")
const aa = db.table("Antiadmin")
 

module.exports = {
    name: 'secur',
    usage: 'secur',
    description: `Permet de configuréer les sécuritées sur le serveur.`,
    async execute(message, args) {

        let color = await cl.get(`color_${message.guild.id}`)
        if (color == null) color = config.bot.couleur

        let pf = await p.get(`prefix_${message.guild.id}`)
        if (pf == null) pf = config.bot.prefixe

        if (owner.get(`owners.${message.author.id}`) || config.bot.buyer.includes(message.author.id) === true) {

            const emojion = "✅"
            const emojioff = "❌"

            if (args[0] == 'on') {
                atc.set(`config.${message.guild.id}.antichannelcreate`, true)
                agu.set(`guildupdate_${message.guild.id}`, true)
                atd.set(`config.${message.guild.id}.antichanneldelete`, true)
                acu.set(`config.${message.guild.id}.antichannelupdate`, true)
                al.set(`config.${message.guild.id}.antilinkall`, true)
                atr.set(`config.${message.guild.id}.antirolecreate`, true)
                ard.set(`config.${message.guild.id}.antiroledelete`, true)
                aru.set(`config.${message.guild.id}.antiroleupdate`, true)
                aw.set(`config.${message.guild.id}.antiwebhook`, true)
                atb.set(`config.${message.guild.id}.antibot`, true)
                aba.set(`config.${message.guild.id}.antiban`, true)
                ae.set(`config.${message.guild.id}.antieveryone`, true)
                ad.set(`config.${message.guild.id}.antidown`, true)
                aa.set(`config.${message.guild.id}.antiadmin`, true)
            }


            if (args[0] == 'off') {
                atc.set(`config.${message.guild.id}.antichannelcreate`, false)
                agu.set(`guildupdate_${message.guild.id}`, false)
                atd.set(`config.${message.guild.id}.antichanneldelete`, false)
                acu.set(`config.${message.guild.id}.antichannelupdate`, false)
                al.set(`config.${message.guild.id}.antilinkinvite`, false)
                al.set(`config.${message.guild.id}.antilinkall`, false)
                atr.set(`config.${message.guild.id}.antirolecreate`, false)
                ard.set(`config.${message.guild.id}.antiroledelete`, false)
                aru.set(`config.${message.guild.id}.antiroleupdate`, false)
                aw.set(`config.${message.guild.id}.antiwebhook`, false)
                atb.set(`config.${message.guild.id}.antibot`, false)
                aba.set(`config.${message.guild.id}.antiban`, false)
                ae.set(`config.${message.guild.id}.antieveryone`, false)
                ad.set(`config.${message.guild.id}.antidown`, false)
                aa.set(`config.${message.guild.id}.antiadmin`, false)
            }


            //////////////                    antilink                    ///////////////////////////
            let antilink = await al.get(`config.${message.guild.id}.antilinkinvite`) || al.get(`config.${message.guild.id}.antilinkall`)
            if (antilink == true) antilink = `${emojion}`
            if (antilink == false) antilink = `${emojioff}`
            if (antilink == null) antilink = `${emojioff}`

            //////////////                    antiwebhook                    ///////////////////////////
            let antiwebhook = await aw.get(`config.${message.guild.id}.antiwebhook`)
            if (antiwebhook == true) antiwebhook = `${emojion}`
            if (antiwebhook == false) antiwebhook = `${emojioff}`
            if (antiwebhook == null) antiwebhook = `${emojioff}`

            //////////////                    antichannelcreate                    ///////////////////////////
            let antichannelcreate = await atc.get(`config.${message.guild.id}.antichannelcreate`)
            if (antichannelcreate == true) antichannelcreate = `${emojion}`
            if (antichannelcreate == false) antichannelcreate = `${emojioff}`
            if (antichannelcreate == null) antichannelcreate = `${emojioff}`


            //////////////                    antiupdate                    ///////////////////////////
            let antiupdate = await agu.get(`guildupdate_${message.guild.id}`)
            if (antiupdate == true) antiupdate = `${emojion}`
            if (antiupdate == false) antiupdate = `${emojioff}`
            if (antiupdate == null) antiupdate = `${emojioff}`


            //////////////                    antichanneldelete                    ///////////////////////////
            let antichanneldelete = await atd.get(`config.${message.guild.id}.antichanneldelete`)
            if (antichanneldelete == true) antichanneldelete = `${emojion}`
            if (antichanneldelete == false) antichanneldelete = `${emojioff}`
            if (antichanneldelete == null) antichanneldelete = `${emojioff}`


            //////////////                    antichannelupdate                    ///////////////////////////
            let antichannelupdate = await acu.get(`config.${message.guild.id}.antichannelupdate`)
            if (antichannelupdate == true) antichannelupdate = `${emojion}`
            if (antichannelupdate == false) antichannelupdate = `${emojioff}`
            if (antichannelupdate == null) antichannelupdate = `${emojioff}`

            //////////////                    antirolecreate                    ///////////////////////////
            let antirolecreate = await atr.get(`config.${message.guild.id}.antirolecreate`)
            if (antirolecreate == true) antirolecreate = `${emojion}`
            if (antirolecreate == false) antirolecreate = `${emojioff}`
            if (antirolecreate == null) antirolecreate = `${emojioff}`

            //////////////                    antiroledelete                    ///////////////////////////
            let antiroledelete = await ard.get(`config.${message.guild.id}.antiroledelete`)
            if (antiroledelete == true) antiroledelete = `${emojion}`
            if (antiroledelete == false) antiroledelete = `${emojioff}`
            if (antiroledelete == null) antiroledelete = `${emojioff}`

            //////////////                    antiroleupdate                    ///////////////////////////
            let antiroleupdate = await aru.get(`config.${message.guild.id}.antiroleupdate`)
            if (antiroleupdate == true) antiroleupdate = `${emojion}`
            if (antiroleupdate == false) antiroleupdate = `${emojioff}`
            if (antiroleupdate == null) antiroleupdate = `${emojioff}`

            //////////////                    antibot                    ///////////////////////////
            let antibot = await atb.get(`config.${message.guild.id}.antibot`)
            if (antibot == true) antibot = `${emojion}`
            if (antibot == false) antibot = `${emojioff}`
            if (antibot == null) antibot = `${emojioff}`

            //////////////                    antiban                    ///////////////////////////
            let antiban = await aba.get(`config.${message.guild.id}.antiban`)
            if (antiban == true) antiban = `${emojion}`
            if (antiban == false) antiban = `${emojioff}`
            if (antiban == null) antiban = `${emojioff}`

            //////////////                    antieveryone                    ///////////////////////////
            let antieveryone = await ae.get(`config.${message.guild.id}.antieveryone`)
            if (antieveryone == true) antieveryone = `${emojion}`
            if (antieveryone == false) antieveryone = `${emojioff}`
            if (antieveryone == null) antieveryone = `${emojioff}`

            //////////////                    antidown                    ///////////////////////////
            let antidown = await ad.get(`config.${message.guild.id}.antidown`)
            if (antidown == true) antidown = `${emojion}`
            if (antidown == false) antidown = `${emojioff}`
            if (antidown == null) antidown = `${emojioff}`

            //////////////                    antiadmin                    ///////////////////////////
            let antiadmin = await aa.get(`config.${message.guild.id}.antiadmin`)
            if (antiadmin == true) antiadmin = `${emojion}`
            if (antiadmin == false) antiadmin = `${emojioff}`
            if (antiadmin == null) antiadmin = `${emojioff}`



            const secu = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId('activée')
                        .setLabel('Activé')
                        .setStyle('Success')
                )
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId('desactivée')
                        .setLabel('Désactivéé')
                        .setStyle('Danger')
                )

            const panel = new (require("discord.js").EmbedBuilder)()
                .setAuthor({ name: `Panel Antiraid` })
                .setDescription(`

             Antibot : ${antibot}
             Antiadmin : ${antiadmin}
             Antiban : ${antiban}
             Antichannel create : ${antichannelcreate}
             Antichannel delete : ${antichanneldelete}
             Antichannel update : ${antichannelupdate}
             Antirôle create : ${antirolecreate}
             Antirôle delete : ${antiroledelete}
             Antirôle update : ${antiroleupdate}
             Anti Update : ${antiupdate}
             Anti Down : ${antidown}
             Anti Everyone : ${antieveryone}
             Antilink : ${antilink} 
             Anti webhook : ${antiwebhook}
               `)


                .setColor(color)

            const panelactivée = new (require("discord.js").EmbedBuilder)()
                .setAuthor({ name: `Panel Antiraid` })
                .setDescription(`

                Antibot : ${emojion}
                Antiban : ${emojion}
                Antichannel create : ${emojion}
                Antichannel delete : ${emojion}
                Antichannel update : ${emojion} 
                Antirôle create : ${emojion}  
                Antirôle delete : ${emojion} 
                Antirôle update : ${emojion}
                Anti Update : ${emojion}
                Anti Down : ${emojion}
                Anti Everyone : ${emojion}
                Antilink : ${emojion} 
                Anti webhook : ${emojion}
                  `)



                .setColor(color)

            const paneldesactivée = new (require("discord.js").EmbedBuilder)()
                .setAuthor({ name: `Panel Antiraid` })
                .setDescription(`

             Antibot : ${emojioff}
             Antiadmin : ${antiadmin}
             Antiban : ${emojioff}
             Antichannel create : ${emojioff}
             Antichannel delete : ${emojioff}
             Antichannel update : ${emojioff}
             Antirôle create : ${emojioff}
             Antirôle delete : ${emojioff}
             Antirôle update : ${emojioff}
             Anti Update : ${emojioff}
             Anti Down : ${emojioff}
             Anti Everyone : ${emojioff}
             Antilink : ${emojioff} 
             Anti webhook : ${emojioff}         
               `)


                .setColor(color)

            const panelselect = new Discord.ActionRowBuilder().addComponents(
                new Discord.StringSelectMenuBuilder()
                    .setCustomId('Funny')
                    .setPlaceholder(`Configurer un module`)
                    .addOptions([
                        {
                            label: 'Punition',
                            value: 'punish',
                            emoji: '',
                        },
                        {
                            label: 'Accès au serveur',
                            value: 'ass',
                            emoji: '',
                        },
                        {
                            label: 'AntiBan',
                            value: 'aba',
                            emoji: '',
                        },
                        {
                            label: 'Anti Channel Create',
                            value: 'acc',
                            emoji: '',
                        },
                        {
                            label: 'Anti Channel Delete',
                            value: 'acd',
                            emoji: '',
                        },
                        {
                            label: 'Anti Channel Update',
                            value: 'acu',
                            emoji: '',
                        },
                        {
                            label: 'Anti rôle create',
                            value: 'arc',
                            emoji: '',
                        },
                        {
                            label: 'Anti rôle delete',
                            value: 'ard',
                            emoji: '',
                        },
                        {
                            label: 'Anti rôle update',
                            value: 'aru',
                            emoji: '',
                        },
                        {
                            label: 'AntiLink',
                            value: 'al',
                            emoji: '',
                        },
                        {
                            label: 'Anti WebHooks',
                            value: 'aw',
                            emoji: '',
                        },
                        {
                            label: 'Anti Update',
                            value: 'au',
                            emoji: '',
                        },
                        {
                            label: 'Anti Bot',
                            value: 'ab',
                            emoji: '',
                        }

                    ])
            )


            message.channel.send({ embeds: [panel], components: [secu, panelselect] }).then(async msg => {

                //anti channel create
                const antichannelembed = new (require("discord.js").EmbedBuilder)()
                    .setDescription(`**Configuration de __l'anti channel create__**`)
                    .setColor(color)

                const antichannelrow = new Discord.ActionRowBuilder().addComponents(
                    new Discord.StringSelectMenuBuilder()
                        .setCustomId('Funny')
                        .setPlaceholder(`Configurer`)
                        .addOptions([
                            {
                                label: 'Activer',
                                value: 'accon',
                                emoji: '✅',
                            },
                            {
                                label: 'Désactivéer',
                                value: 'accoff',
                                emoji: '❌',
                            },
                            {
                                label: 'Retour',
                                value: 'retour',
                                emoji: '⬅️',
                            }
                        ])
                )
                //anti channel delete
                const antichanneldembed = new (require("discord.js").EmbedBuilder)()
                    .setDescription(`**Configuration de __l'anti channel delete__**`)
                    .setColor(color)

                const antichannedlrow = new Discord.ActionRowBuilder().addComponents(
                    new Discord.StringSelectMenuBuilder()
                        .setCustomId('Funny')
                        .setPlaceholder(`Configurer`)
                        .addOptions([
                            {
                                label: 'Activer',
                                value: 'acdon',
                                emoji: '✅',
                            },
                            {
                                label: 'Désactivéer',
                                value: 'acdoff',
                                emoji: '❌',
                            },
                            {
                                label: 'Retour',
                                value: 'retour',
                                emoji: '⬅️',
                            }
                        ])
                )
                //anti channel update
                const antichanneupdembed = new (require("discord.js").EmbedBuilder)()
                    .setDescription(`**Configuration de __l'anti channel update__**`)
                    .setColor(color)

                const antichanneduprow = new Discord.ActionRowBuilder().addComponents(
                    new Discord.StringSelectMenuBuilder()
                        .setCustomId('Funny')
                        .setPlaceholder(`Configurer`)
                        .addOptions([
                            {
                                label: 'Activer',
                                value: 'acuon',
                                emoji: '✅',
                            },
                            {
                                label: 'Désactivéer',
                                value: 'acuoff',
                                emoji: '❌',
                            },
                            {
                                label: 'Retour',
                                value: 'retour',
                                emoji: '⬅️',
                            }
                        ])
                )
                //anti Role create
                const antirolecreateembed = new (require("discord.js").EmbedBuilder)()
                    .setDescription(`**Configuration de __l'anti rôle create__**`)
                    .setColor(color)

                const antirolecreaterow = new Discord.ActionRowBuilder().addComponents(
                    new Discord.StringSelectMenuBuilder()
                        .setCustomId('Funny')
                        .setPlaceholder(`Configurer`)
                        .addOptions([
                            {
                                label: 'Activer',
                                value: 'arcon',
                                emoji: '✅',
                            },
                            {
                                label: 'Désactivéer',
                                value: 'arcoff',
                                emoji: '❌',
                            },
                            {
                                label: 'Retour',
                                value: 'retour',
                                emoji: '⬅️',
                            }
                        ])
                )
                //anti rôle delete
                const antiroledeleteembed = new (require("discord.js").EmbedBuilder)()
                    .setDescription(`**Configuration de __l'anti rôle delete__**`)
                    .setColor(color)

                const antiroledeleterow = new Discord.ActionRowBuilder().addComponents(
                    new Discord.StringSelectMenuBuilder()
                        .setCustomId('Funny')
                        .setPlaceholder(`Configurer`)
                        .addOptions([
                            {
                                label: 'Activer',
                                value: 'ardon',
                                emoji: '✅',
                            },
                            {
                                label: 'Désactivéer',
                                value: 'ardoff',
                                emoji: '❌',
                            },
                            {
                                label: 'Retour',
                                value: 'retour',
                                emoji: '⬅️',
                            }
                        ])
                )
                //anti rôle update
                const antiroleupembed = new (require("discord.js").EmbedBuilder)()
                    .setDescription(`**Configuration de __l'anti rôle update__**`)
                    .setColor(color)

                const antiroleuprow = new Discord.ActionRowBuilder().addComponents(
                    new Discord.StringSelectMenuBuilder()
                        .setCustomId('Funny')
                        .setPlaceholder(`Configurer`)
                        .addOptions([
                            {
                                label: 'Activer',
                                value: 'aruon',
                                emoji: '✅',
                            },
                            {
                                label: 'Désactivéer',
                                value: 'aruoff',
                                emoji: '❌',
                            },
                            {
                                label: 'Retour',
                                value: 'retour',
                                emoji: '⬅️',
                            }
                        ])
                )
                //anti Link
                const antilinkembed = new (require("discord.js").EmbedBuilder)()
                    .setDescription(`**Configuration de __l'antilink__**`)
                    .setColor(color)

                const antilinkrow = new Discord.ActionRowBuilder().addComponents(
                    new Discord.StringSelectMenuBuilder()
                        .setCustomId('Funny')
                        .setPlaceholder(`Configurer`)
                        .addOptions([
                            {
                                label: 'Activer',
                                value: 'alon',
                                emoji: '✅',
                            },
                            {
                                label: 'Désactivéer',
                                value: 'aloff',
                                emoji: '❌',
                            },
                            {
                                label: 'Retour',
                                value: 'retour',
                                emoji: '⬅️',
                            }
                        ])
                )

                //anti wb
                const antiwbembed = new (require("discord.js").EmbedBuilder)()
                    .setDescription(`**Configuration de __l'anti WebHook__**`)
                    .setColor(color)

                const antiwbrow = new Discord.ActionRowBuilder().addComponents(
                    new Discord.StringSelectMenuBuilder()
                        .setCustomId('Funny')
                        .setPlaceholder(`Configurer`)
                        .addOptions([
                            {
                                label: 'Activer',
                                value: 'awon',
                                emoji: '✅',
                            },
                            {
                                label: 'Désactivéer',
                                value: 'awoff',
                                emoji: '❌',
                            },
                            {
                                label: 'Retour',
                                value: 'retour',
                                emoji: '⬅️',
                            }
                        ])
                )
                //Punition
                const punishembed = new (require("discord.js").EmbedBuilder)()
                    .setDescription(`**Configuration de la __Punition__**`)
                    .setColor(color)

                const punishrow = new Discord.ActionRowBuilder().addComponents(
                    new Discord.StringSelectMenuBuilder()
                        .setCustomId('Funny')
                        .setPlaceholder(`Configurer la punition`)
                        .addOptions([
                            {
                                label: 'Derank',
                                value: 'derank',
                                emoji: '',
                            },
                            {
                                label: 'Kick',
                                value: 'kick',
                                emoji: '',
                            },
                            {
                                label: 'Ban',
                                value: 'ban',
                                emoji: '',
                            },
                            {
                                label: 'Retour',
                                value: 'retour',
                                emoji: '⬅️',
                            }
                        ])
                )

                //Anti update
                const antiupdateembed = new (require("discord.js").EmbedBuilder)()
                    .setDescription(`**Configuration de l' __anti update__**`)
                    .setColor(color)

                const antiupdaterow = new Discord.ActionRowBuilder().addComponents(
                    new Discord.StringSelectMenuBuilder()
                        .setCustomId('Funny')
                        .setPlaceholder(`Configurer l'anti update`)
                        .addOptions([
                            {
                                label: 'Activer',
                                value: 'auon',
                                emoji: '✅',
                            },
                            {
                                label: 'Désactivéer',
                                value: 'auoff',
                                emoji: '❌',
                            },
                            {
                                label: 'Retour',
                                value: 'retour',
                                emoji: '⬅️',
                            }
                        ])
                )

                //Anti Bot
                const antibotembed = new (require("discord.js").EmbedBuilder)()
                    .setDescription(`**Configuration de l'__anti bot__**`)
                    .setColor(color)

                const antibotrow = new Discord.ActionRowBuilder().addComponents(
                    new Discord.StringSelectMenuBuilder()
                        .setCustomId('Funny')
                        .setPlaceholder(`Configurer l'anti bot`)
                        .addOptions([
                            {
                                label: 'Activer',
                                value: 'atbon',
                                emoji: '✅',
                            },
                            {
                                label: 'Désactivéer',
                                value: 'atboff',
                                emoji: '❌',
                            },
                            {
                                label: 'Retour',
                                value: 'retour',
                                emoji: '⬅️',
                            }
                        ])
                )

                //Server lock/unlock
                const lockembed = new (require("discord.js").EmbedBuilder)()
                    .setDescription(`**Autoriser ou refuser __l'accès au serveur__**`)
                    .setColor(color)

                const lockrow = new Discord.ActionRowBuilder().addComponents(
                    new Discord.StringSelectMenuBuilder()
                        .setCustomId('Funny')
                        .setPlaceholder(`Accès au serveur`)
                        .addOptions([
                            {
                                label: 'Vérouiller le serveur',
                                value: 'asson',
                                emoji: '🔒',
                                description: 'Attention plus personne ne pourra rejoindre le serveur',
                            },
                            {
                                label: 'Dévérouiller le serveur',
                                value: 'assoff',
                                emoji: '🔓',
                            },
                            {
                                label: 'Retour',
                                value: 'retour',
                                emoji: '⬅️',
                            }
                        ])
                )

                //Anti Ban
                const antibanembed = new (require("discord.js").EmbedBuilder)()
                    .setDescription(`**Configuration de l'__antiban__**`)
                    .setColor(color)

                const antibanrow = new Discord.ActionRowBuilder().addComponents(
                    new Discord.StringSelectMenuBuilder()
                        .setCustomId('Funny')
                        .setPlaceholder(`Configurer l'anti bot`)
                        .addOptions([
                            {
                                label: 'Activer',
                                value: 'abaon',
                                emoji: '✅',
                            },
                            {
                                label: 'Désactivéer',
                                value: 'abaoff',
                                emoji: '❌',
                            },
                            {
                                label: 'Retour',
                                value: 'retour',
                                emoji: '⬅️',
                            }
                        ])
                )


                const collectorX = message.channel.createMessageComponentCollector({
                    componentType: ComponentType.Button,
                    filter: (i => i.user.id === message.author.id)
                })


                collector.on("collect", async (c) => {
                    const value = c.customId

                    if (value === "activée") {

                        c.reply({ content: `**Toutes les sécurités ont été activéées avec succès**`, ephemeral: true })

                        atc.set(`config.${message.guild.id}.antichannelcreate`, true)
                        agu.set(`guildupdate_${message.guild.id}`, true)
                        atd.set(`config.${message.guild.id}.antichanneldelete`, true)
                        acu.set(`config.${message.guild.id}.antichannelupdate`, true)
                        al.set(`config.${message.guild.id}.antilinkall`, true)
                        atr.set(`config.${message.guild.id}.antirolecreate`, true)
                        ard.set(`config.${message.guild.id}.antiroledelete`, true)
                        aru.set(`config.${message.guild.id}.antiroleupdate`, true)
                        aw.set(`config.${message.guild.id}.antiwebhook`, true)
                        atb.set(`config.${message.guild.id}.antibot`, true)
                        aba.set(`config.${message.guild.id}.antiban`, true)
                        ae.set(`config.${message.guild.id}.antieveryone`, true)
                        ad.set(`config.${message.guild.id}.antidown`, true)
                        aa.set(`config.${message.guild.id}.antiadmin`, true)

                        msg.edit({ embeds: [panelactivée] })
                    }

                    else if (value === "desactivée") {

                        c.reply({ content: `**Toutes les sécurités ont été désactivéées avec succès**`, ephemeral: true })

                        atc.set(`config.${message.guild.id}.antichannelcreate`, false)
                        agu.set(`guildupdate_${message.guild.id}`, false)
                        atd.set(`config.${message.guild.id}.antichanneldelete`, false)
                        acu.set(`config.${message.guild.id}.antichannelupdate`, false)
                        al.set(`config.${message.guild.id}.antilinkall`, false)
                        al.set(`config.${message.guild.id}.antilinkinvite`, false)
                        atr.set(`config.${message.guild.id}.antirolecreate`, false)
                        ard.set(`config.${message.guild.id}.antiroledelete`, false)
                        aru.set(`config.${message.guild.id}.antiroleupdate`, false)
                        aw.set(`config.${message.guild.id}.antiwebhook`, false)
                        atb.set(`config.${message.guild.id}.antibot`, false)
                        aba.set(`config.${message.guild.id}.antiban`, false)
                        ae.set(`config.${message.guild.id}.antieveryone`, false)
                        ad.set(`config.${message.guild.id}.antidown`, false)
                        aa.set(`config.${message.guild.id}.antiadmin`, false)

                        msg.edit({ embeds: [paneldesactivée] })
                    }
                })
            })
            .catch(() => false)
        }
    }
}
