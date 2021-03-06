const {MessageEmbed} = require('discord.js');
const {deleteMessage,compareMemberRoles,caseNumber} = require('../util/messageManagement.js');
exports.run = async (client, message, args, perms, settings) => {
  //Variables
  const specialist = message.author;
  const member = message.mentions.members.first();
  const guild = message.guild;
  const defaultrole = guild.roles.cache.find(role=>role.name === settings.defaultrole);
  const supportcategory = guild.channels.cache.find(channel=> channel.name === settings.supportcategory) || guild.createChannel('support-tickets-category','category');
  //Checks if a user was mentioned
  if (message.mentions.members.array().length < 1) return message.reply('You must mention someone create a ticket for them.').then(msg=>deleteMessage(msg,settings.messagetimeout)).catch(console.error);
  if (message.mentions.members.array().length > 1) return message.reply('Can only create a ticket for one user');
  //Get case number and reason, form fancy embed
  const log = guild.channels.cache.find(channel => channel.name === settings.supportchannel) || guild.channels.cache.find(channel => channel.name === settings.defaultchannel);
  if(!compareMemberRoles(message.member, member, message))return;
  //Case number and reason 
  const caseNum = await caseNumber(client, log);
  const issue = args.splice(1, args.length).join(' ') || '';
  //Nice embed
  const embed = new MessageEmbed()
  .setColor(0x00AE86)
  .setTimestamp()
  .setDescription(`**Action:** Support Ticket\n**Target:** ${member.user.tag}\n**Support Specialist:** ${specialist.tag}\n**Issue:** ${issue}\n**Status:**Initialized`)
  .setFooter(`Case ${caseNum}`);
  //If there is a moderation channel, post embed there
  if (log!=null){
    log.send({embed});
  } else {
    console.error('No Support Channel');
  }
  //Create new channel
  let permissionOverwites = ([
    {
      id: defaultrole.id,
      deny: ['VIEW_CHANNEL']
    },
    {
      id: member.id,
      allow: ['VIEW_CHANNEL']
    }
  ], "Makes Text Channel Private");
  var supportTicket = await guild.channels.create("support-ticket-"+caseNum,{type:'text', parent: supportcategory, permissionOverwites});
  supportTicket.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["create"],
  category: "Customer Support",
  permLevel: 3
};

exports.help = {
  name: 'createticket',
  description: 'Creates a new support ticket case and channel',
  usage: 'createticket <user> <issue>'
};