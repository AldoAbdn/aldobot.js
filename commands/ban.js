const {MessageEmbed} = require('discord.js');
const {deleteMessage,compareMemberRoles,caseNumber,postToDefault} = require('../util/messageManagement.js');
exports.run = async (client, message, args, perms, settings) => {
  //Setup
  const members = message.mentions.members.array();
  const log = message.guild.channels.cache.find(channel => channel.name === settings.moderationchannel) || message.guild.channels.cache.find(channel => channel.name === settings.defaultchannel);
  var caseNum;
  var reason;
  if (members.length < 1) return message.reply('You must mention someone to ban them.').then(msg=>deleteMessage(msg,settings.messagetimeout)).catch(console.error);
  for(var member of members){
    if(compareMemberRoles(message.member, member)){
      //Get case number 
      caseNum = await caseNumber(client, log);
      reason = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${settings.prefix}reason ${caseNum} <reason>.`;
      //Ban
      member.ban(reason);
      //Fancy display of ban
      const embed = new MessageEmbed()
      .setColor(0x00AE86)
      .setTimestamp()
      .setDescription(`**Action:** Ban\n**Target:** ${member.user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
      .setFooter(`Case ${caseNum}`);
      if (log!=null){
        log.send({embed});
      } else {
        postToDefault(message.guild,{embed});
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
  name: 'ban',
  description: 'Bans the mentioned user.',
  usage: 'ban <mention> <reason>'
};
