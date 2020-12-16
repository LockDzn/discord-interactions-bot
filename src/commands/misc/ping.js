exports.run = async (interaction, res) => {
    res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `<@${interaction.member.user.id}>, pong! :ping_pong:`,
          flags: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE
        }
    })
}

exports.help = {
    name: 'ping',
    description: 'Command to return bot status',
    options: []
}