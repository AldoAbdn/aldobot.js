const {MessageEmbed} = require('discord.js');
const {deleteMessage,compareMemberRoles,caseNumber} = require('../util/messageManagement.js');
exports.run = async (client, message, args, perms, settings) => {
  //Checks if a user was mentioned
  if (message.mentions.members.size < 1) return message.reply('You must mention someone to warn them.').then(msg=>deleteMessage(msg,settings.messagetimeout)).catch(console.error);
  //Get users
  const members = message.mentions.members.array();
  //Channels
  const channels = message.guild.channels.cache;
  //Get case number and reason, form fancy embed
  const log = channels.find(channel => channel.name === settings.moderationchannel) || channels.find(channel => channel.name === settings.defaultchannel);
  var caseNum;
  var reason;
  for (var member of members){
    if(compareMemberRoles(message.member, member)){
      //Case number and reason 
      caseNum = await caseNumber(client, log);
      reason = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${settings.prefix}reason ${caseNum} <reason>.`;
      //Nice embed
      const embed = new MessageEmbed()
      .setColor(0x00AE86)
      .setTimestamp()
      .setDescription(`**Action:** Warning\n**Target:** ${member.user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
      .setFooter(`Case ${caseNum}`);
      //If there is a moderation channel, post embed there
      if (log!=null){
        log.send({embed});
      }
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  category: "Server Management",
  permLevel: 2
};

exports.help = {
  name: 'warn',
  description: 'Issues a warning to the mentioned user.',
  usage: 'warn <mention> <reason>'
};
