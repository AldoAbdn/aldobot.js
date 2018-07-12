exports.run = (client, message, args) => {
  //If user is not in the voice channel, return
  if (!client.voiceConnections.find("channel",message.member.voiceChannel)){
    return;
  } else if (message.guild.dispatcher){
    //If there is a dispatcher, pause it
    message.guild.dispatcher.pause();
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'pause',
  description: 'Pauses audio',
  usage: 'pause'
};
