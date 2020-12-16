const express = require('express');
const { InteractionType, InteractionResponseType, verifyKeyMiddleware, verifyKey } = require('discord-interactions');

const port = process.env.PORT || 3999;

const app = express();

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
});