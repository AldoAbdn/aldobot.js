const {createQueueString} = require('../util/createQueueString.js');
const {deleteMessage} = require('../util/messageManagement');
exports.run = (client, message, args, perms, settings) => {
  var queue = message.guild.queue;
  //If no queue, set it
  if (!queue) queue = [];
  //Display queue 
  message.reply(createQueueString(queue),{code:'asciidoc'}).then(msg=>deleteMessage(msg,settings.messagetimeout));
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