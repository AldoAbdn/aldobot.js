const {createQueueString} = require('../util/createQueueString.js');
exports.run = (client, message) => {
    if (!message.guild.queue) message.guild.queue = [];
    let str = createQueueString(message.guild.queue);
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