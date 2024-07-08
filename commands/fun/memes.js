const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const axios = require('axios');
const errorEmbed = require("../../templates/embeds/errors/errorEmbed");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("memes")
        .setDescription("Replies with an alright meme"),
    async execute(interaction) {
        axios({
            method: 'get',
            url: 'https://meme-api.com/gimme?nsfw=false',
            responseType: 'json'
        })
            .then(function (response) {
            const memesEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(response.data.title)
                .setURL(response.data.postLink)
                .setImage(response.data.url)
                .setTimestamp()
                .setFooter({ text: "Sent using Hydra" });
            interaction.reply({ embeds: [memesEmbed] });
        })
            .catch((err) => {
            console.log(`Woah there has been an error with the message of the day command. Here it is: 
` + err);
            interaction.editReply({ embeds: [errorEmbed] });
        });
    },
};
