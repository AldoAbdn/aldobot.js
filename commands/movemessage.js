exports.run = async(client, message, args) => {
    //Set variables
    const channel = args[0];
    const messageid = args[1];
    //retrieve message 
    var selectedMessage = message.channel.fetchMessage(messageid);
    //Add message to channel 
    channel.sendMessage(`{selectedMessage.author} Wrote: \n\n {selectedMessage.content}`);
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