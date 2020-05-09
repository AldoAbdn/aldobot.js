exports.run = async(client, message, args) => {
  //Set variables
  const channel = message.mentions.channels.first();
  if(channel == null)
    return message.reply('You must mention a channel');
  else if(message.mentions.channels.array().length > 1)
    return message.reply('Too many channels in mentions');
  else if(channel.type != "text")
    return message.reply('Mentioned channel must be a Text channel');
  const messageid = args[1];
  //retrieve message 
  const selectedMessage = await message.channel.messages.fetch(messageid);
  if(selectedMessage){
    //Add message to channel 
    channel.send(`${selectedMessage.author} Wrote: \n\n ${selectedMessage.content}`);
    //Delete message
    selectedMessage.delete();
  } else {
    return message.reply('Invalid message ID');
  }
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