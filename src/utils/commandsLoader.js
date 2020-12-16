const fs = require('fs');

const commands = new Map();
const aliases = new Map();

const discordAPI = require('./discordAPI')

fs.readdir("./src/commands", (err, files) => {
    if(err) console.error(err);

    files.forEach((f, i) => {
        let folder = f.split('.');

        if(folder[1]) return;

        fs.readdir(`./src/commands/${f}/`, (err, jsf) => {

            let jsfiles = jsf.filter(f => f.split(".").pop() === "js");

            if(jsfiles.length <= 0 ) return;
            
            jsfiles.forEach((j, k) => {
                let props = require(`../commands/${f}/${j}`);
                props.help.type = f;

                commands.set(props.help.name, props);

                discordAPI.post(`/applications/${process.env.CLIENT_ID}/commands`, {
                    name: props.help.name,
                    description: props.help.description,
                    options: props.help.options
                }).then((res) => console.log(`${props.help.name} loaded!`))

                if(!props.help || !props.help.aliases || props.help.aliases[0] == '') return;

                props.help.aliases.forEach(alias => {
                    aliases.set(alias, props.help.name);
                })
            });
        })
    })
});

module.exports = { commands, aliases };