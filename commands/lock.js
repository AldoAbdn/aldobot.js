exports.run = async (client, message, args) => {
  const guild = message.guild;
  if (guild.lock == null){
      return;
  } 
  if(client.voiceConnections.find("channel",message.member.voiceChannel)){
    guild.lock = !guild.lock;
    message.reply(server.lock ? 'Bot Locked' : 'Bot Unlocked');
  } else {
    message.reply("Must be in the same voice channel as the bot to lock it in a voice channel");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'lock',
  description: 'Locks bot to its current voice channel',
  usage: 'lock'
};
