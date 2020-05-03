exports.run = (client, message, args) => {
  //Get count
  const messagecount = parseInt(args.join(' '));
  const channel = message.channel;
  // Check size
  if (messagecount >= 100)
    message.reply('Message count must be less than 100');
  //Fetch messages, include the command itself, delete them
  channel.bulkDelete(messagecount + 1).catch(error=>message.reply(error));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['delete'],
  category: "Server Management",
  permLevel: 2
};

exports.help = {
  name: 'purge',
  description: 'Purges X amount of messages from a given channel.',
  usage: 'purge <number>'
};
