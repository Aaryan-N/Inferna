const { Collection } = require("discord.js");
const path = require("path");
const fs = require("node:fs");
const { redBright } = require("chalk");
const commandHandler = (client) => {
    client.commands = new Collection();
    const foldersPath = path.join(__dirname, `../commands/`);
    const commandFolders = fs.readdirSync(foldersPath);
    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
            }
            else {
                console.log(redBright(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`));
            }
        }
    }
};
module.exports = { commandHandler };
