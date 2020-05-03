exports.run = async(client, message, args) => {
  //Set variables
  const channel = message.mentions.channels.first();
  if(channel == null)
    message.reply('You must mention a channel');
  if(message.mentions.channels.array().length > 1)
    message.reply('Too many channels in mentions');
  const messageid = args[1];
  //retrieve message 
  const messages = await message.channel.awaitMessages(message => message.id === messageid);
  const selectedMessage = messages.first();
  //Add message to channel 
  channel.send(`${selectedMessage.author} Wrote: \n\n ${selectedMessage.content}`);
  //Delete message
  selectedMessage.delete();
};
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['move'],
  category: "Server Management",
  permLevel: 2
};

exports.help = {
  name: 'movemessage',
  description: 'Moves a message to another channel',
  usage: 'movemessage <channel> <messageid>'
};