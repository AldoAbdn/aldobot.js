const deleteMessage = require('../util/messageManagement').deleteMessage;

exports.run = (client, message, args, perms, settings) => {
  const startTime = message.createdTimestamp;
  message.channel.send('Ping?')
    .then(msg => {
      const endTime = msg.createdTimestamp;
      msg.edit(`Pong! (took: ${endTime - startTime}ms)`);
      deleteMessage(msg,settings.messagetimeout);
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  category: "Just for Fun",
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Ping/Pong command. I wonder what this does? /sarcasm',
  usage: 'ping'
};
