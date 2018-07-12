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
  const defaultRole = client.guilds.get(message.guild.id).roles.find('name', settings.defaultrole);
  const muteRole = client.guilds.get(message.guild.id).roles.find('name', settings.muterole);
  if (!muteRole) return message.reply('I cannot find a mute role').catch(console.error);
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to mute them.').catch(console.error);
  const reason = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${settings.prefix}reason ${caseNum} <reason>.`;

  //Fancy reply
  const embed = new RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setDescription(`**Action:** Un/mute\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
    .setFooter(`Case ${caseNum}`);
  //Bot checks if it has correct permissions
  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').catch(console.error);
  //Checks if user has mute role, and if they do removes it
  if (message.guild.member(user).roles.has(muteRole.id)) {
    message.guild.member(user).removeRole(muteRole).catch(console.error);
    message.guild.member(user).addRole(defaultRole).then(() => {
      if (client.channels.find("name",settings.moderationchannel)){
        return client.channels.find("name", settings.moderationchannel).send({embed}).catch(console.error);;
      } else {
        return postToDefault(client.guilds.get(message.guild.id),{embed});
      }
    });
  } else {
    //Adds mute role
    message.guild.member(user).removeRole(defaultRole).catch(console.error);
    message.guild.member(user).addRole(muteRole).then(() => {
      if (client.channels.find("name",settings.moderationchannel)){
        return client.channels.find("name", settings.moderationchannel).send({embed}).catch(console.error);;
      } else {
        return postToDefault(client.guilds.get(message.guild.id),{embed});
      }
    });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['unmute'],
  permLevel: 2
};

exports.help = {
  name: 'mute',
  description: 'mutes or unmutes a mentioned user',
  usage: 'un/mute <mention> <reason>'
};
