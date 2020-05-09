const {MessageEmbed} = require('discord.js');
const {deleteMessage,caseNumber,postToDefault} = require('../util/messageManagement.js');
exports.run = async (client, message, args, perms, settings) => {
  //Setup
  const id = args[0];
  const log = message.guild.channels.cache.find(channel => channel.name === settings.moderationchannel) || message.guild.channels.cache.find(channel => channel.name === settings.defaultchannel);
  const guild = message.guild;
  var caseNum;
  var reason;
  // Get member
  try{
    const bans = await guild.fetchBans();
    const ban = bans.find(ban => ban.user.id == id);
    let user = ban.user;
    if(user){
      //Get case number 
      caseNum = await caseNumber(client, log);
      reason = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${settings.prefix}reason ${caseNum} <reason>.`;
      //unban
      user = await guild.members.unban(user);
      //Fancy display of ban
      const embed = new MessageEmbed()
      .setColor(0x00AE86)
      .setTimestamp()
      .setDescription(`**Action:** Unban\n**Target:** ${user.tag}\n**Moderator:** ${message.author.tag}\n**Reason:** ${reason}`)
      .setFooter(`Case ${caseNum}`);
      if (log!=null){
        log.send({embed});
      } else {
        postToDefault(guild,{embed});
      }
    } else {
      message.reply("Error, check user ID").then((msg) => deleteMessage(msg, settings.messagetimeout)).catch(console.error);
    }
  } catch(e) {
    console.log(e);
    message.reply("Error, check user ID").then((msg) => deleteMessage(msg, settings.messagetimeout)).catch(console.error);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  category: "Server Management",
  permLevel: 2
};

exports.help = {
  name: 'unban',
  description: 'Unbans the user.',
  usage: 'unban <id> <reason>'
};
