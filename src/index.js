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
  try {
    discordAPI.post(`/applications/${process.env.CLIENT_ID}/commands`, {
      name: 'ping',
      description: 'Command to return bot status',
      options: []
    })
  
    discordAPI.post(`/applications/${process.env.CLIENT_ID}/commands`, {
      name: 'dice',
      description: 'Roll a dice',
      options: [{
        'name': 'max-number',
        'description': 'Maximum number that the data can reach',
        'type': 2 // 2 is type SUB_COMMAND_GROUP
      }]
    })
    
    console.log('foi?!')
  } catch (error) {
    console.error(error)
  }
}

app.post('/interactions', verifyKeyMiddleware(process.env.CLIENT_PUBLIC_KEY), async (req, res) => {
  const interaction = req.body;
  console.log(interaction)
  if (interaction.type === InteractionType.COMMAND) {
    if (interaction.data.name == 'ping') {
      res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `<@${interaction.member.user.id}>, pong! :ping_pong:`,
          flags: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE
        }
      })
    }

    if (interaction.data.name == 'dice') {
      res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `<@${interaction.member.user.id}>, pong! :ping_pong:`,
          flags: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE
        }
      })
    }
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
  registerCommand()
});