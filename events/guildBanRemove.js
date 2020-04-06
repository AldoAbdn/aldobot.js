const Discord = require('discord.js');
const {deleteMessage} = require('../util/messageManagement.js');
const settings = require('../settings.json');
module.exports = (guild, user) => {
  const defaultchannel = guild.channels.cache.find(channel => channel.name === settings.defaultchannel);
  const modlog = guild.channels.cache.find(channel => channel.name === settings.moderationchannel) || defaultchannel;
  defaultchannel.send(`${user.tag} was just unbanned`).then(msg=>deleteMessage(msg,settings.messagetimeout));
  const embed = new Discord.MessageEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setDescription(`**Action:** Unban\n**Target:** ${user.tag}\n**Moderator:** ${guild.client.unbanAuth.tag}\n**Reason:** ${guild.client.unbanReason}`);
  if (modlog){
    modlog.send({embed});
  } else {
    defaultchannel.send({embed});
  }
};
