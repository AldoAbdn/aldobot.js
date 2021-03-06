const {MessageEmbed} = require('discord.js');
const {deleteMessage,compareMemberRoles,caseNumber} = require('../util/messageManagement.js');
exports.run = async (client, message, args, perms, settings) => {
  //Setup
  const members = message.mentions.members.array();
  const channels = message.guild.channels.cache;
  const log = channels.find(channel => channel.name === settings.moderationchannel) || channels.find(channel => channel.name === settings.defaultchannel);
  if (members.length < 1) return message.reply('You must mention someone to kick them.').then(msg=>deleteMessage(msg,settings.messagetimeout)).catch(console.error);
  var caseNum; 
  var reason;
  for (var member of members){
    if(compareMemberRoles(message.member, member)){
      //Case number
      caseNum = await caseNumber(client, log);
      //Reason
      reason = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${settings.prefix}reason ${caseNum} <reason>.`;
      //Kick  
      member.kick(reason);
      //Fancy reply of kick
      const embed = new MessageEmbed()
      .setColor(0x00AE86)
      .setTimestamp()
      .setDescription(`**Action:** Kick\n**Target:** ${member.user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
      .setFooter(`Case ${caseNum}`);
      if (log!=null){
        log.send({embed});
      }
    }
  }
};

exports.conf = {
  aliases: [],
  category: "Server Management",
  permLevel: 2
};

exports.help = {
  name: 'kick',
  description: 'Kicks the mentioned user.',
  usage: 'kick <mention> <reason>'
};
