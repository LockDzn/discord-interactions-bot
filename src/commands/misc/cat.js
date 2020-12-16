const axios = require('axios');
const { InteractionResponseType } = require('discord-interactions');

exports.run = async (message, res) => {
    const redditData = await axios.get(`https://www.reddit.com/r/cats/hot/.json?limit=100`);
    const posts = redditData.data.data.children;
    const imgPosts = posts.filter(post => !post.data.over_18 && post.data.post_hint === 'image');

    const post = imgPosts[Math.floor(Math.random() * imgPosts.length)]

    console.log(post.data)

    res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: `<@${message.member.user.id}>`,
            embeds: [
                {
                    description: ':cat:',
                    image: {
                        url: post.data.url,
                    },
                    footer: {
                        text: `Posted by u/${post.data.author} - r/cats`
                    }
                },
            ],
        }
    });
}

exports.help = {
    name: 'cat',
    description: 'Photo of a kitten - r/cats',
    options: []
}