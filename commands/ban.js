const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
const settings = require('../settings.json');
exports.run = async (client, message, args) => {
  //Setup
  const users = message.mentions.users.array();
  parseUser(message, user);
  const log = message.guild.channels.find("name",settings.moderationchannel) || message.guildchannels.find("name",settings.defaultchannel);
  var caseNum;
  var reason;
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to ban them.').catch(console.error);
  for(var user of users){
    //Check reason 
    reason = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${settings.prefix}reason ${caseNum} <reason>.`;
    //Get case number 
    caseNum = await(caseNumber, log);
    //Ban
    message.guild.member(user).ban(reason);
    //Fancy display of ban
    const embed = new RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setDescription(`**Action:** Ban\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
    .setFooter(`Case ${caseNum}`);
    if (log!=null){
      return log.send({embed});
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'ban',
  description: 'Bans the mentioned user.',
  usage: 'ban <mention> <reason>'
};
