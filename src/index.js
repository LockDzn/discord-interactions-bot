const express = require('express');
const { InteractionType, verifyKeyMiddleware, verifyKey } = require('discord-interactions');

const commands = require('./utils/commandsLoader')

const port = process.env.PORT || 3999;

const app = express();

app.post('/interactions', verifyKeyMiddleware(process.env.CLIENT_PUBLIC_KEY), async (req, res) => {
    const message = req.body;
    // console.log(message)
    if (message && message.type === InteractionType.COMMAND) {
        const command = commands.commands.get(message.data.name) ||
        commands.commands.get(commands.aliases.get(message.data.name));

        if(!command) return;

        command.run(message, res);
    }
});

app.listen(port, () => {
    console.log(`App listening at port ${port}`);
});
