const {deleteMessage} = require('../util/messageManagement.js');
exports.run = async (client, message, args, perms, settings) => {
  const guild = message.guild;
  const voiceChannel = message.member.voiceChannel;
  //If no lock, bot isn't in a voice channel yet
  if (guild.lock == null){
      return;
  } 
  //Check if user is in same channel as bot
  if(client.voiceConnections.cache.find(channel => channel.channel === voiceChannel)){
    //Toggles lock
    guild.lock = !guild.lock;
    message.reply(guild.lock ? 'Bot Locked' : 'Bot Unlocked').then(msg=>deleteMessage(msg,settings.messagetimeout));
  } else {
    //You have to be in same channel
    message.reply("Must be in the same voice channel as the bot to lock it in a voice channel").then(msg=>deleteMessage(msg,settings.messagetimeout));
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  category: "Music",
  permLevel: 2
};

exports.help = {
  name: 'lock',
  description: 'Locks bot to its current voice channel',
  usage: 'lock'
};
