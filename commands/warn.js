const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
const settings = require('../settings.json');
exports.run = async (client, message, args) => {
  //Checks if a user was mentioned
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to warn them.').catch(console.error);
  //Get users
  const users = message.mentions.users;
  //Get case number and reason, form fancy embed
  const log = message.gulid.channels.find("name",settings.moderationchannel) || message.guild.channels.find("name", settings.defaultchannel);
  var caseNum;
  var reason;
  for (var user of users){
    parseUser(message, user);
    //Case number and reason 
    caseNum = await caseNumber(client, modlog);
    reason = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${settings.prefix}reason ${caseNum} <reason>.`;
    //Nice embed
    const embed = new RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setDescription(`**Action:** Warning\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
    .setFooter(`Case ${caseNum}`);
    //If there is a moderation channel, post embed there
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
  name: 'warn',
  description: 'Issues a warning to the mentioned user.',
  usage: 'warn <mention> <reason>'
};
