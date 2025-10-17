(async () => {
const db = require("../db.js");
const Discord = require("discord.js")

const config = require("../config")
 

module.exports = {
    name: 'reboot',
    usage: 'reboot',
    description: `Permet de redémarrer le bot.`,
    async execute(message, args) {

        if (config.bot.buyer.includes(message.author.id)) {

            message.channel.send(`ℹ️ Reboot en cours ...`).then(async message => {
                message.edit(`ℹ️ Reboot en cours ...`)
                client.destroy();
                await client.login(process.env.TOKEN);
                await message.edit(`ℹ️ Reboot en cours ...`)
                message.edit(`ℹ️ Reboot terminé`)

            })
        }
    }
}

})();