const db = require("../db.js");
const boostlog = db.table("boostlog")

module.exports = {
    name: 'guildMemberUpdate',
    once: false,

    async execute(client, oldMember, newMember) {

        if (oldMember.premiumSince === newMember.premiumSince) return

        const chan = `${await boostlog.get(`${newMember.guild.id}.boostlog`)}`
        if (!chan) return

        const raidlogChannel = oldMember.guild.channels.cache.get(chan)
        if (channel) return channel.send({ content: `${oldMember.user.tag} vient de boost le serveur !` }).catch(() => false)

    }
}