const {postToDefault} = require('../util/postToDefault.js');
const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
const settings = require('../settings.json');
exports.run = async (client, message, args) => {
  //Setup
  const user = message.mentions.users.first();
  parseUser(message, user);
  const modlog = client.channels.find("name",settings.moderationchannel);
  const caseNum = await caseNumber(client, modlog);
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to ban them.').catch(console.error);
  const reason = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${settings.prefix}reason ${caseNum} <reason>.`;
  //Ban
  message.guild.member(user).ban(reason);
  //Fancy display of ban
  const embed = new RichEmbed()
  .setColor(0x00AE86)
  .setTimestamp()
  .setDescription(`**Action:** Ban\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
  .setFooter(`Case ${caseNum}`);
  if (client.channels.find("name",settings.moderationchannel)){
    return client.channels.find("name", settings.moderationchannel).send({embed});
  } else {
    return postToDefault(client.guilds.get(message.guild.id),{embed});
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
