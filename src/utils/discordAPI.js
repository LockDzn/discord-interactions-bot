const axios = require('axios');

const discordAPI = axios.create({
    baseURL: 'https://discord.com/api/v8',
    headers: {
      'authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`
    }
});

module.exports = discordAPI
