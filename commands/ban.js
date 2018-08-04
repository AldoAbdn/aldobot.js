const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
exports.run = async (client, message, args, perms, settings) => {
  //Setup
  const users = message.mentions.users.array();
  const log = message.guild.channels.find("name",settings.moderationchannel) || message.guildchannels.find("name",settings.defaultchannel);
  var caseNum;
  var reason = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${settings.prefix}reason ${caseNum} <reason>.`;
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to ban them.').catch(console.error);
  for(var user of users){
    if(parseUser(message, user)){
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
