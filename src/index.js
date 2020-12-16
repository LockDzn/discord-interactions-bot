const express = require('express');
const { InteractionType, InteractionResponseType, verifyKeyMiddleware, verifyKey } = require('discord-interactions');

const discordAPI = require('./utils/discordAPI')
const commands = require('./utils/commandsLoader')

const port = process.env.PORT || 3999;

const app = express();

async function registerCommand() {
    try {
        commands.commands.forEach(cmd => {
            console.log(cmd.help.name)
            discordAPI.post(`/applications/${process.env.CLIENT_ID}/commands`, {
                name: cmd.help.name,
                description: cmd.help.description,
                options: cmd.help.options
            }).then((res) => console.log(`${cmd.help.name} loaded!`))
        })
    
        console.log('foi?!')
    } catch (error) {
        console.error(error)
    }
}

app.post('/interactions', verifyKeyMiddleware(process.env.CLIENT_PUBLIC_KEY), async (req, res) => {
    const message = req.body;
    console.log(message)
    if (message && message.type === InteractionType.COMMAND) {
        const command = commands.commands.get(message.data.name) ||
        commands.commands.get(commands.aliases.get(message.data.name));
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
    // registerCommand()
});
