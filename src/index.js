const express = require('express');
const { InteractionType, verifyKeyMiddleware, verifyKey } = require('discord-interactions');

const commandsLoader = require('./utils/commandsLoader')

const port = process.env.PORT || 3999;

const app = express();

app.post('/interactions', verifyKeyMiddleware(process.env.CLIENT_PUBLIC_KEY), async (req, res) => {
    const message = req.body;
    // console.log(message)
    if (message && message.type === InteractionType.COMMAND) {
        const command = commandsLoader.commands.get(message.data.name) ||
        commandsLoader.commands.get(commandsLoader.aliases.get(message.data.name));

        if(!command) return;

        command.run(message, res);
    }
});

app.listen(port, () => {
    console.log(`App listening at port ${port}`);
});
