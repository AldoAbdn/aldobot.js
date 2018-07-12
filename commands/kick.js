const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
const {postToDefault} = require('../util/postToDefault.js');
const settings = require('../settings.json');
exports.run = async (client, message, args) => {
  //Setup
  const user = message.mentions.users.first();
  parseUser(message, user);
  const modlog = client.channels.find("name",settings.moderationchannel);
  const caseNum = await caseNumber(client, modlog);
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to kick them.').catch(console.error);
  const reason = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${settings.prefix}reason ${caseNum} <reason>.`;
  //Kick  
  message.guild.member(user).kick(reason);
  //Fancy reply of kick
  const embed = new RichEmbed()
  .setColor(0x00AE86)
  .setTimestamp()
  .setDescription(`**Action:** Kick\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
  .setFooter(`Case ${caseNum}`);
  if (client.channels.find("name",settings.moderationchannel)){
    return client.channels.find("name", settings.moderationchannel).send({embed});
  } else {
    return postToDefault(client.guilds.get(message.guild.id),{embed});
  }
};

exports.conf = {
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'kick',
  description: 'Kicks the mentioned user.',
  usage: 'kick <mention> <reason>'
};
