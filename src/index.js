const express = require('express');
const { InteractionType, InteractionResponseType, verifyKeyMiddleware, verifyKey } = require('discord-interactions');

const port = process.env.PORT || 3999;

const app = express();

async function handleCommand(data, res) {
  switch (data.name) {
    case 'ping':
      res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE,
        data: {
          content: "Hello World",
          flags: InteractionResponseFlags.EPHEMERAL,
        },
      });
      break;
    default:
      res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE,
        data: {
          content: "Sorry, I don't understand this command :(",
        },
        flags: InteractionResponseFlags.EPHEMERAL,
      });
      break;
  }
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
    handleCommand(interaction.data, res);
  }
});;

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});