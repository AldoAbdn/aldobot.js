const {MessageEmbed} = require('discord.js');
const {compareMemberRoles,caseNumber} = require('../util/messageManagement.js');
exports.run = async (client, message, args, perms, settings) => {
  //Setup
  const members = message.mentions.members.array();
  const log = message.guild.cache.find(channel => channel.name === settings.moderationchannel) || message.guild.cache.find(channel => channel.name === settings.defaultchannel);
  const defaultRole = client.guilds.get(message.guild.id).roles.cache.find(role=>role ===  settings.defaultrole);
  const muteRole = client.guilds.get(message.guild.id).roles.cache.find(role=>role ===  settings.muterole);
  if (!muteRole) return message.reply('I cannot find a mute role').then(msg=>deleteMessage(msg,settings.messagetimeout)).catch(console.error);
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to mute them.').then(msg=>deleteMessage(msg,settings.messagetimeout)).catch(console.error);
  var caseNum;
  var reason;
  for (var member of members){
    if(compareMemberRoles(message.member, member)){
      caseNum = await caseNumber(client, log);
      reason = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${settings.prefix}reason ${caseNum} <reason>.`;
      //Fancy reply
      const embed = new MessageEmbed()
        .setColor(0x00AE86)
        .setTimestamp()
        .setDescription(`**Action:** Un/mute\n**Target:** ${member.user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
        .setFooter(`Case ${caseNum}`);
      //Bot checks if it has correct permissions
      if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('I do not have the correct permissions.').then(msg=>deleteMessage(msg,settings.messagetimeout)).catch(console.error);
      //Checks if user has mute role, and if they do removes it
      if (member.roles.has(muteRole.id)) {
        member.removeRole(muteRole).catch(console.error);
        member.addRole(defaultRole).then(() => {
          if (log!=null){
            log.send({embed}).catch(console.error);;
          }
        });
      } else {
        //Adds mute role
        member.removeRole(defaultRole).catch(console.error);
        member.addRole(muteRole).then(() => {
          if (log){
            log.send({embed}).catch(console.error);;
          }
        });
      }
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['unmute'],
  category: "Server Management",
  permLevel: 2
};

exports.help = {
  name: 'mute',
  description: 'mutes or unmutes a mentioned user',
  usage: 'un/mute <mention> <reason>'
};
