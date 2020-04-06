const {MessageEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {compareMemberRoles} = require('../util/compareMemberRoles.js');
const {deleteMessage} = require('../util/messageManagement.js');
exports.run = async (client, message, args, perms, settings) => {
  //Variables
  const member = message.mentions.members.first();
  const guild = message.guild;
  const defaultrole = message.guild.roles.cache.find(role=>role === settings.defaultrole);
  const supportcategory = message.guild.channels.cache.find(channel=> channel.name === settings.supportcategory) || guild.createChannel('support-tickets-category','category');
  //Checks if a user was mentioned
  if (message.mentions.members.size < 1) return message.reply('You must mention someone create a ticket for them.').then(msg=>deleteMessage(msg,settings.messagetimeout)).catch(console.error);
  //Get case number and reason, form fancy embed
  const log = guild.channels.cache.find(channel => channel.name === settings.supportchannel) || guild.channels.cache.find(channel => channel.name === settings.defaultchannel);
  if(!compareMemberRoles(message.member, member, message))return;
  //Case number and reason 
  const caseNum = await caseNumber(client, log);
  const issue = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${settings.prefix}updatesupportticketissue ${caseNum} <issue>.`;
  //Nice embed
  const embed = new MessageEmbed()
  .setColor(0x00AE86)
  .setTimestamp()
  .setDescription(`**Action:** Support Ticket\n**Target:** ${member.user.tag}\n**Support Specialist:** ${message.author.tag}\n**Issue:** ${issue}\n**Status:**Initialized`)
  .setFooter(`Case ${caseNum}`);
  //If there is a moderation channel, post embed there
  if (log!=null){
    log.send({embed});
  }
  //Create new channel
  var supportTicket = await guild.channels.create("support-ticket-"+caseNum,{type:'text'});
  supportTicket.send(embed);
  supportTicket.overwritePermissions(defaultrole,{
    'VIEW_CHANNEL':false
  });
  supportTicket.overwritePermissions(user, {
    'VIEW_CHANNEL':true
  })
  supportTicket.setParent(supportcategory);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  category: "Customer Support",
  permLevel: 3
};

exports.help = {
  name: 'createticket',
  description: 'Creates a new support ticket case and channel',
  usage: 'createticket <user> <issue>'
};