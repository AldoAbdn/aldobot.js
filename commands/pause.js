exports.run = (client, message, args) => {
  const guild = message.guild;
  if (!client.voiceConnections.find("channel",message.member.voiceChannel)){
    return;
  }
  if(guild.dispatcher){
      guild.dispatcher.pause();
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
