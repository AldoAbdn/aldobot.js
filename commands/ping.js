exports.run = (client, message) => {
  const startTime = message.createdTimestamp;
  message.channel.send('Ping?')
    .then(msg => {
      const endTime = msg.createdTimestamp;
      msg.edit(`Pong! (took: ${endTime - startTime}ms)`);
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Ping/Pong command. I wonder what this does? /sarcasm',
  usage: 'ping'
};
