const Discord = require("discord.js");
const config = require("../config");
const db = require("quick.db");
const owner = db.table("Owner");
const cl = db.table("Color");
const ml = db.table("modlog");
const pgs = db.table("PermGs");
const temproles = db.table("TempRoles");

module.exports = {
    name: 'temprole',
    usage: 'temprole <membre> <role> <durée> | temprole list',
    description: `Permet d'ajouter un rôle temporaire à un membre ou de voir la liste des rôles temporaires.`,
    async execute(client, message, args) {
        let color = cl.fetch(`color_${message.guild.id}`);
        if (color == null) color = config.bot.couleur;

        if (owner.get(`owners.${message.author.id}`) || config.bot.buyer.includes(message.author.id)   || message.member.roles.cache.has(pgs.get(`permgs_${message.guild.id}`))) {
            if (args[0] === 'list') {
                let allTempRoles = temproles.fetch(`temproles_${message.guild.id}`) || [];
                if (allTempRoles.length === 0) {
                    return message.channel.send("Aucun rôle temporaire en cours.");
                }

                const embed = new Discord.MessageEmbed()
                    .setColor(color)
                    .setTitle("Liste des rôles temporaires")
                    .setDescription(allTempRoles.map((r, i) => `${i + 1}. <@${r.userId}> - <@&${r.roleId}> jusqu'à ${new Date(r.expireAt).toLocaleString()}`).join("\n"))
                    .setFooter({ text: `4Protect` });

                const row = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                            .setCustomId('remove_temprole')
                            .setLabel('X')
                            .setStyle('DANGER')
                    );

                const messageSent = await message.channel.send({ embeds: [embed], components: [row] });

                const filter = i => i.customId === 'remove_temprole' && i.user.id === message.author.id;
                const collector = messageSent.createMessageComponentCollector({ filter, time: 60000 });

                collector.on('collect', async i => {
                    if (i.customId === 'remove_temprole') {
                        await i.deferUpdate();

                        const tempRoleSelectMenu = new Discord.MessageActionRow()
                            .addComponents(
                                new Discord.MessageSelectMenu()
                                    .setCustomId('select_temprole')
                                    .setPlaceholder('Sélectionnez un rôle temporaire à enlever')
                                    .addOptions(allTempRoles.map((r, index) => ({
                                        label: `${message.guild.members.cache.get(r.userId).user.username} - ${message.guild.roles.cache.get(r.roleId).name}`,
                                        value: index.toString()
                                    })))
                            );

                        const selectMessage = await message.channel.send({ components: [tempRoleSelectMenu] });

                        const selectCollector = selectMessage.createMessageComponentCollector({ componentType: 'SELECT_MENU', time: 60000 });

                        selectCollector.on('collect', async selectInteraction => {
                            const selectedIndex = parseInt(selectInteraction.values[0]);
                            const selectedTempRole = allTempRoles[selectedIndex];

                            await selectInteraction.deferUpdate();
                            selectMessage.delete();

                            allTempRoles.splice(selectedIndex, 1);
                            temproles.set(`temproles_${message.guild.id}`, allTempRoles);

                            const member = message.guild.members.cache.get(selectedTempRole.userId);
                            const role = message.guild.roles.cache.get(selectedTempRole.roleId);

                            if (member && role) {
                                await member.roles.remove(role, `Rôle temporaire retiré par ${message.author.tag}`);
                            }

                            await message.channel.send(`Le rôle temporaire de <@${selectedTempRole.userId}> a été retiré.`);
                        });

                        selectCollector.on('end', collected => {
                            if (collected.size === 0) {
                                selectMessage.edit({ content: "Temps écoulé pour sélectionner un rôle temporaire à enlever.", components: [] });
                            }
                        });
                    }
                });

                collector.on('end', collected => {
                    if (collected.size === 0) {
                        messageSent.edit({ content: "Temps écoulé pour retirer un rôle temporaire.", components: [] });
                    }
                });

            } else {
                if (args.length < 3) {
                    return message.channel.send("Usage: `temprole <membre> <role> <durée>`");
                }

                let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
                if (!member) return message.channel.send("Membre invalide.");

                let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
                if (!role) return message.channel.send("Rôle invalide.");

                let duration = args[2];
                let durationMs;
                if (duration.endsWith('m')) {
                    durationMs = parseInt(duration) * 60000;
                } else if (duration.endsWith('h')) {
                    durationMs = parseInt(duration) * 3600000;
                } else if (duration.endsWith('j')) {
                    let days = parseInt(duration);
                    if (days > 30) {
                        return message.channel.send("La durée maximale est de 30 jours.");
                    }
                    durationMs = days * 86400000;
                } else {
                    return message.channel.send("Durée invalide. Utilisez m (minutes), h (heures), j (jours).");
                }

                if (isNaN(durationMs)) return message.channel.send("Durée invalide.");

                await member.roles.add(role, `Rôle temporaire ajouté par ${message.author.tag}`);

                let expireAt = Date.now() + durationMs;
                temproles.push(`temproles_${message.guild.id}`, {
                    userId: member.id,
                    roleId: role.id,
                    expireAt: expireAt
                });

                message.channel.send(`Le rôle <@&${role.id}> a été ajouté à <@${member.id}> pour une durée de ${duration}.`);

                setTimeout(async () => {
                    await member.roles.remove(role, `Rôle temporaire expiré`);
                    let updatedTempRoles = temproles.fetch(`temproles_${message.guild.id}`) || [];
                    updatedTempRoles = updatedTempRoles.filter(r => r.userId !== member.id || r.roleId !== role.id);
                    temproles.set(`temproles_${message.guild.id}`, updatedTempRoles);
                }, durationMs);

                const embed = new Discord.MessageEmbed()
                    .setColor(color)
                    .setDescription(`➕ <@${message.author.id}> a utilisé la commande \`temprole\` sur ${member}\nRôle ajouté : ${role}\nDurée : ${duration}`)
                    .setTimestamp()
                    .setFooter({ text: `📚` });
                const logchannel = client.channels.cache.get(ml.get(`${message.guild.id}.modlog`));
                if (logchannel) logchannel.send({ embeds: [embed] }).catch(() => false);
            }
        } else {
            message.reply("Vous n'avez pas la permission d'utiliser cette commande.");
        }
    }
};