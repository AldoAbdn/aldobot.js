const {createQueueString} = require('../util/createQueueString.js');
exports.run = (client, message) => {
  var queue = message.guild.queue;
  //If no queue, set it
  if (!queue) queue = [];
  //Display queue 
  message.reply(createQueueString(queue),{code:'asciidoc'});
};
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    category: "Music",
    permLevel: 0
  };
  
  exports.help = {
    name: 'queue',
    description: 'Shows current song queue',
    usage: 'queue'
  };