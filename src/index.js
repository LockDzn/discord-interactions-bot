const express = require('express');
const { InteractionType, InteractionResponseType, verifyKeyMiddleware } = require('discord-interactions');

const port = process.env.PORT || 3999;

const app = express();

app.get('/', (req, res) => {
    res.json({ massage: 'ok!' });
});

app.post('/interactions', verifyKeyMiddleware(process.env.CLIENT_PUBLIC_KEY), (req, res) => {
  const interaction = req.body;
  if (interaction.type === InteractionType.COMMAND) {
    res.send({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: 'Hello world',
      },
    });
  }
});;

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});