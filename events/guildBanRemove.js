const Discord = require('discord.js');
const settings = require('../settings.json');
module.exports = (guild, user) => {
  const defaultchannel = guild.channels.find("name", settings.defaultchannel);
  const modlog = guild.channels.find("name", settings.moderationchannel) || defaultchannel;
  defaultchannel.sendMessage(`${user.tag} was just unbanned`);
  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setDescription(`**Action:** Unban\n**Target:** ${user.tag}\n**Moderator:** ${guild.client.unbanAuth.tag}\n**Reason:** ${guild.client.unbanReason}`);
  if (modlog){
    modlog.sendMessage({embed});
  } else {
    defaultchannel.sendMessage({embed});
  }
};
