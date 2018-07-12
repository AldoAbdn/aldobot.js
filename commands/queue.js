const {createQueueString} = require('../util/createQueueString.js');
exports.run = (client, message) => {
  //If no queue, set it
  if (!message.guild.queue) message.guild.queue = [];
  //Display queue 
  message.reply(createQueueString(message.guild.queue),{code:'asciidoc'});
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