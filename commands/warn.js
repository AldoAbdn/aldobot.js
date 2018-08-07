const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {compareMemberRoles} = require('../util/compareMemberRoles.js');
const settings = require('../settings.json');
exports.run = async (client, message, args) => {
  //Checks if a user was mentioned
  if (message.mentions.members.size < 1) return message.reply('You must mention someone to warn them.').catch(console.error);
  //Get users
  const members = message.mentions.members.array();
  //Channels
  const channels = message.guild.channels;
  //Get case number and reason, form fancy embed
  const log = channels.find("name",settings.moderationchannel) || channels.find("name", settings.defaultchannel);
  var caseNum;
  var reason;
  for (var member of members){
    if(compareMemberRoles(message.member, member)){
      //Case number and reason 
      caseNum = await caseNumber(client, log);
      reason = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${settings.prefix}reason ${caseNum} <reason>.`;
      //Nice embed
      const embed = new RichEmbed()
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
