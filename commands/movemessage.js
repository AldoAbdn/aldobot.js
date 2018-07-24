exports.run = async(client, message, args) => {
    //Set variables
    const channel = message.mentions.channels.first();
    const messageid = args[1];
    //retrieve message 
    var selectedMessage = message.channel.fetchMessage(messageid);
    //Add message to channel 
    channel.send(`${selectedMessage.author} Wrote: \n\n ${selectedMessage.content}`);
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 2
  };
  
  exports.help = {
    name: 'movemessage',
    description: 'Moves a message to another channel',
    usage: 'togglerole <channel> <messageid>'
  };