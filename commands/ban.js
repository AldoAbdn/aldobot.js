const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {compareMemberRoles} = require('../util/compareMemberRoles.js');
const {deleteMessage} = require('../util/messageManagement.js');
exports.run = async (client, message, args, perms, settings) => {
  //Setup
  const members = message.mentions.members.array();
  const log = message.guild.channels.find("name",settings.moderationchannel) || message.guildchannels.find("name",settings.defaultchannel);
  var caseNum;
  var reason;
  if (message.mentions.members.size < 1) return message.reply('You must mention someone to ban them.').then(msg=>deleteMessage(msg,settings.messagetimeout)).catch(console.error);
  for(var member of members){
    if(compareMemberRoles(message.member, member)){
      //Get case number 
      caseNum = await(caseNumber, log);
      reason = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${settings.prefix}reason ${caseNum} <reason>.`;
      //Ban
      member.ban(reason);
      //Fancy display of ban
      const embed = new RichEmbed()
      .setColor(0x00AE86)
      .setTimestamp()
      .setDescription(`**Action:** Ban\n**Target:** ${member.user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
      .setFooter(`Case ${caseNum}`);
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
  name: 'ban',
  description: 'Bans the mentioned user.',
  usage: 'ban <mention> <reason>'
};
