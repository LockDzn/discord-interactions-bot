const { InteractionResponseType } = require('discord-interactions');

exports.run = async (message, res) => {
    const options = message.data.options;

    if (!options) {
        res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
            content: `<@${message.member.user.id}>, ${randomNumber()} :game_die:`,
            flags: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE
            }
        });
    } else {
        res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: `<@${message.member.user.id}>, ${randomNumber(options[0].value)} :game_die:`,
                flags: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE
            }
        });
    }
}

function randomNumber(max) {
    const result = max ? Math.floor(Math.random() * max) : Math.floor(Math.random() * 20);

    return result + 1;
}

exports.help = {
    name: 'dice',
    alias: ['dado'],
    description: 'Maximum number that the data can reach',
    options: [{
        name: 'maxnumber',
        description: 'Maximum number that the data can reach',
        type: 4,
    }]
}