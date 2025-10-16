(async () => {
const db = require("../db.js");
const Discord = require("discord.js");
const fetch = require("node-fetch");


const cl = db.table("Color");
const config = require("../config");
const footer = config.bot.footer;

module.exports = {
    name: 'wiki',
    usage: 'wiki <mot-clé>',
    description: `Recherche des mot-clé sur Wikipedia.`,
    async execute(message, args) {
      
        let color = await cl.get(`color_${message.guild.id}`);
        if (color == null) color = config.bot.couleur;

      
        if (!args[0]) {
            return message.channel.send("Veuillez fournir une phrase à rechercher sur Wikipedia.");
        }
        
        const searchTerm = args.join('_');
        const apiUrl = `https://fr.wikipedia.org/api/rest_v1/page/summary/${searchTerm}`;

            const response = await fetch(apiUrl);
            const data = await response.json();

       
            if (response.status !== 200) {
                return message.channel.send("Aucune page Wikipedia trouvée pour cette phrase.");
            }
          
            const embed = new (require("discord.js").EmbedBuilder)()
            .setTitle("Recherche sur " + data.title)
            .setURL(data.content_urls.desktop.page)
            .setDescription(data.extract)
            .setColor(color)
            .setFooter(footer);

            message.channel.send({ embeds: [embed] });
        }
    }
})();