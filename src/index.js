const express = require('express');
const { InteractionType, InteractionResponseType, verifyKeyMiddleware, verifyKey } = require('discord-interactions');

const commands = require('./utils/commandsLoader')

const port = process.env.PORT || 3999;

const app = express();

async function registerCommand() {
    try {
        commands.commands.forEach(cmd => {
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
        return
        // const command = commands.commands.get(command.slice(prefix.length)) ||
        // client.commands.get(client.aliases.get(command.slice(prefix.length)));
        
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
    registerCommand()
});

function randomNumber(max) {
    const result = max ? Math.floor(Math.random() * max) : Math.floor(Math.random() * 20);

    return result + 1;
}