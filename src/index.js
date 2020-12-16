const express = require('express');
const axios = require('axios');
const { InteractionType, InteractionResponseType, verifyKeyMiddleware, verifyKey } = require('discord-interactions');

const discordAPI = axios.create({
  baseURL: 'https://discord.com/api/v8',
  headers: {
    'authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`
  }
})

const port = process.env.PORT || 3999;

const app = express();

async function registerCommand() {
  console.log('foi?!')
  await discordAPI.post(`/applications/${process.env.CLIENT_ID}/commands`, {
    name: 'ping',
    description: 'Command to return bot status',
    options: []
  })
}

app.post('/interactions', verifyKeyMiddleware(process.env.CLIENT_PUBLIC_KEY), async (req, res) => {
  const signature = req.get('X-Signature-Ed25519');
  const timestamp = req.get('X-Signature-Timestamp');
  const isValidRequest = await verifyKey(req.rawBody, signature, timestamp, 'MY_CLIENT_PUBLIC_KEY');
  if (!isValidRequest) {
    return res.status(401).end('Bad request signature');
  }

  const interaction = req.body;
  console.log(interaction)
  if (interaction.type === InteractionType.COMMAND) {
    if (interaction.data.name == "ping") {
      res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          embeds: [{
            title: 'Testing',
            description: 'pong!'
          }]
        }
      })
    }
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
  registerCommand()
});