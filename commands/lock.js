exports.run = async (client, message, args) => {
    if (client.guilds.get(message.guild.id).lock == null){
        return;
    } 
    if(client.voiceConnections.find("channel",message.member.voiceChannel)){
      client.guilds.get(message.guild.id).lock = !client.guilds.get(message.guild.id).lock;
      message.reply(client.guilds.get(message.guild.id).lock ? 'Bot Locked' : 'Bot Unlocked');
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
