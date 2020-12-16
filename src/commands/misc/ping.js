const { InteractionResponseType } = require('discord-interactions');

exports.run = async (message, res) => {
    res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `<@${message.member.user.id}>, pong! :ping_pong:`,
          flags: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE
        }
    })
}

exports.help = {
    name: 'ping',
    description: 'Command to return bot status',
    options: []
}