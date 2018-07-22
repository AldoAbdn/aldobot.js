exports.run = (client, message, args) => {
  const voiceChannel = message.member.voiceChannel;
  const dispatcher = message.guild.dispatcher;
  //If user is not in the voice channel, return
  if (!client.voiceConnections.find("channel",voiceChannel)){
    return;
  } else if (dispatcher){
    //If there is a dispatcher, pause it
    dispatcher.pause();
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
