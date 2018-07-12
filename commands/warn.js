const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
const settings = require('../settings.json');
exports.run = async (client, message, args) => {
  //Checks if a user was mentioned
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to warn them.').catch(console.error);
  //Get user
  const user = message.mentions.users.first();
  parseUser(message, user);
  //Get case number and reason, form fancy embed
  const modlog = client.channels.find("name",settings.moderationchannel);
  const caseNum = await caseNumber(client, modlog);
  const reason = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${settings.prefix}reason ${caseNum} <reason>.`;
  const embed = new RichEmbed()
  .setColor(0x00AE86)
  .setTimestamp()
  .setDescription(`**Action:** Warning\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
  .setFooter(`Case ${caseNum}`);
  //If there is a moderation channel, post embed there
  if (client.channels.find("name",settings.moderationchannel)){
    return client.channels.find("name", settings.moderationchannel).send({embed});
  } else {
    //Post to default instead
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
  name: 'warn',
  description: 'Issues a warning to the mentioned user.',
  usage: 'warn <mention> <reason>'
};
