const {MessageEmbed} = require('discord.js');
const {compareMemberRoles,caseNumber} = require('../util/messageManagement.js');
exports.run = async (client, message, args, perms, settings) => {
  //Setup
  const guild = message.guild;
  const channels = guild.channels.cache;
  const roles = guild.roles.cache;
  const members = message.mentions.members.array();
  const log = channels.find(channel => channel.name === settings.moderationchannel) || channels.find(channel => channel.name === settings.defaultchannel);
  const defaultRole = roles.find(role => role.name ===  settings.defaultrole);
  const muteRole = roles.find(role => role.name ===  settings.muterole);
  if (!muteRole) return message.reply('I cannot find a mute role').then(msg=>deleteMessage(msg,settings.messagetimeout)).catch(console.error);
  if (members.length < 1) return message.reply('You must mention at least one guild member to mute.').then(msg=>deleteMessage(msg,settings.messagetimeout)).catch(console.error);
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
      const roles = memeber.roles.cache;
      if (roles.has(muteRole.id)) {
        membee.roles.remove(muteRole).catch(console.error);
        member.roles.add(defaultRole).then(() => {
          if (log!=null){
            log.send({embed}).catch(console.error);;
          }
        });
      } else {
        //Adds mute role
        member.roles.remove(defaultRole).catch(console.error);
        member.roles.add(muteRole).then(() => {
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
