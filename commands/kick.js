const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
exports.run = async (client, message, args, perms, settings) => {
  //Setup
  const users = message.mentions.users.array();
  parseUser(message, user);
  const log = message.guild.channels.find("name",settings.moderationchannel) || message.guild.channels.find("name", settings.defaultchannel);
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to kick them.').catch(console.error);
  var caseNum; 
  var reason;
  for (var user of users){
    //Case number
    caseNum = await caseNumber(client, log);
    //Reason
    reason = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${settings.prefix}reason ${caseNum} <reason>.`;
    //Kick  
    message.guild.member(user).kick(reason);
    //Fancy reply of kick
    const embed = new RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setDescription(`**Action:** Kick\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
    .setFooter(`Case ${caseNum}`);
    if (log!=null){
      log.send({embed});
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
