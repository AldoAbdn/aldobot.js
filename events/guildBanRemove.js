const Discord = require('discord.js');
const {postToDefault} = require('../util/postToDefault.js');
module.exports = (guild, user) => {
  postToDefault(client.guilds.get(message.guild.id),`${user.tag} was just unbanned`);
  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setDescription(`**Action:** Unban\n**Target:** ${user.tag}\n**Moderator:** ${guild.client.unbanAuth.tag}\n**Reason:** ${guild.client.unbanReason}`);
  return guild.channels.get(guild.channels.find('name', 'mod-log').id).send({embed});
};
