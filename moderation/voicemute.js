const db = require("../db.js");
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')

const config = require("../config")
const owner = db.table("Owner")
const cl = db.table("Color")
const ml = db.table("modlog")
const p1 = db.table("Perm1")
const p2 = db.table("Perm2")
const p3 = db.table("Perm3")
const footer = config.bot.footer


module.exports = {
    name: 'voicemute',
    usage: 'voicemute <@>',
    description: `Permet de rendre muet un membre dans un salon vocal sur le serveur.`,
    async execute(client, message, args, member) {

        const perm1 = await p1.get(`perm1_${message.guild.id}`)
        const perm2 = await p2.get(`perm2_${message.guild.id}`)
        const perm3 = await p3.get(`perm3_${message.guild.id}`)

        if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(perm1) || message.member.roles.cache.has(perm2) || message.member.roles.cache.has(perm3) || config.bot.buyer.includes(message.author.id)   === true) {

            await message.guild.members.fetch();
            await message.client.await guilds.get(message.guild.id);

            const muteUser = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            
            /*   if (muteUser.roles.highest.position >= message.muteUser.roles.highest.position || message.author.id !== message.guild.owner.id) {
            return message.reply(`Vous ne pouvez pas ban un membre au dessus de vous`)
            }       */

            const muteReason = args.join(" ").slice(23);

            if (muteUser.voice.serverMute) {
                return message.channel
                    .send("Le membre n'est pas dans un salon vocal ou est déjà muet dans le salon vocal.")
            }

            try {
                muteUser.voice.setMute(true, "muteReason");
            } catch (err) {
                console.error(err);
                message
                    .reply("Je n'ai pas pu désactiver le son de cet utilisateur, veuillez vérifier mes permissions et réessayer.\n" + err)
            }

            try {
                muteUser.user.send(
                    `Vous avez été **mute** sur **${message.guild.name}**, raison: **${muteReason || "Aucune"}**.`
                );
            } catch (err) {
                console.err(err);
                message.reply("Impossible d'envoyer un message privé à ce membre...").then((m) => setTimeout(() => m.delete(), 10000));
            }

            message.channel.send(
                `**${muteUser.user.tag}** a été mute avec succès sur le serveur. Raison: **${muteReason || "Aucune"}**. `
            )

            let color = await cl.get(`color_${message.guild.id}`)
            if (color == null) color = config.bot.couleur

            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setDescription(`<@${message.author.id}> a \`voicemute\` ${muteUser}\nRaison: ${muteReason}`)
                .setTimestamp()
                .setFooter({ text: `📚` })
            const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`))
                if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false)

        }
    }
}