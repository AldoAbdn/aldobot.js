exports.run = (client, message, args) => {
  //Get count
  const messagecount = parseInt(args.join(' '));
  const channel = message.channel;
  //Fetch messages, include the command itself, delete them
  channel.fetchMessages({
    limit: messagecount + 1
  }).then(messages => channel.bulkDelete(messages));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  category: "Server Management",
  permLevel: 2
};

exports.help = {
  name: 'purge',
  description: 'Purges X amount of messages from a given channel.',
  usage: 'purge <number>'
};
