const {createQueueString} = require('../util/createQueueString.js');
exports.run = (client, message) => {
    if (!client.guilds.get(message.guild.id).queue) client.guilds.get(message.guild.id).queue = [];
    let str = createQueueString(client.guilds.get(message.guild.id).queue);
    message.reply(str,{code:'asciidoc'});
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'queue',
    description: 'Shows current song queue',
    usage: 'queue'
  };