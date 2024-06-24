const { SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const axios = require("axios");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("8ball")
        .setDescription("Play a game of 8 ball!")
        .addStringOption((option) =>
            option
                .setName("query")
                .setDescription("Ask the 8 Ball what you want!")
                .setRequired(true),
        )
        .addBooleanOption(option => option.setName('lucky').setDescription("Feeling lucky? Set this to true!")),

    async execute(interaction) {
        const userLuckyChoice = interaction.options.get("lucky")?.value;
        const userBallQuery = interaction.options.getString("query");
        const formattedUserBallQuery = userBallQuery.replace(/ /g, '+')
        console.log(userLuckyChoice)
        console.log(userBallQuery)
        console.log(formattedUserBallQuery)

        axios({
            method: "get",
            url: `https://eightballapi.com/api?question=${formattedUserBallQuery}&lucky=${userLuckyChoice}`,
            responseType: "json",
        })
            .then(function (response) {
                console.log(response.data.reading)
                const ballEmbed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle("8 Ball")
                    .addFields(
                        { name: "The 8 Ball's verdict:" , value: response.data.reading },
                    )
                    .setTimestamp()
                    .setFooter({ text: "Sent using Scythe discord bot!" })
                interaction.reply({embeds : [ballEmbed]});

            })
            .catch((err) => {
                console.log(err);
                interaction.reply("Did you type that in right?");
            });
    },
};
