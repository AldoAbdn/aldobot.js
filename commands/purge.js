exports.run = (client, message, args) => {
  const messagecount = parseInt(args.join(' '));
  message.channel.fetchMessages({
    limit: messagecount + 1
  }).then(messages => message.channel.bulkDelete(messages));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'purge',
  description: 'Purges X amount of messages from a given channel.',
  usage: 'purge <number>'
};
