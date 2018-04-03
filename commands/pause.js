exports.run = (client, message, args) => {
  if (!client.voiceConnections.find("channel",message.member.voiceChannel)){
    return;
  }
  if(client.guilds.get(message.guild.id).dispatcher){
      client.guilds.get(message.guild.id).dispatcher.pause();
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
