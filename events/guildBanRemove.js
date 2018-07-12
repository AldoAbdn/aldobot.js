const Discord = require('discord.js');
const {postToDefault} = require('../util/postToDefault.js');
const settings = require('../settings.json');
module.exports = (guild, user) => {
  postToDefault(guild,`${user.tag} was just unbanned`);
  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setDescription(`**Action:** Unban\n**Target:** ${user.tag}\n**Moderator:** ${guild.client.unbanAuth.tag}\n**Reason:** ${guild.client.unbanReason}`);
  if (guild.channels.find("name",settings.moderationchannel)){
    return guild.channels.find("name", settings.moderationchannel).send({embed});
  } else {
    return postToDefault(guild,{embed});
  }
};
