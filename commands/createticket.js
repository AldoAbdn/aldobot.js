const {MessageEmbed} = require('discord.js');
const {deleteMessage,compareMemberRoles,caseNumber} = require('../util/messageManagement.js');
exports.run = async (client, message, args, perms, settings) => {
  //Variables
  const member = message.mentions.members.first();
  const guild = message.guild;
  const defaultrole = guild.roles.cache.find(role=>role.name === settings.defaultrole);
  const supportcategory = guild.channels.cache.find(channel=> channel.name === settings.supportcategory) || guild.createChannel('support-tickets-category','category');
  //Checks if a user was mentioned
  if (message.mentions.members.size < 1) return message.reply('You must mention someone create a ticket for them.').then(msg=>deleteMessage(msg,settings.messagetimeout)).catch(console.error);
  if (message.mentions.members.size > 1) return message.reply('Can only create a ticket for one user');
  const user = message.mentions.members.first();
  // Get Support Specialist
  const specialist = message.author;
  //Get case number and reason, form fancy embed
  const log = guild.channels.cache.find(channel => channel.name === settings.supportchannel) || guild.channels.cache.find(channel => channel.name === settings.defaultchannel);
  if(!compareMemberRoles(message.member, member, message))return;
  console.log('roles fine');
  //Case number and reason 
  const caseNum = await caseNumber(client, log);
  console.log('Case Num');
  console.log(caseNum);
  const issue = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${settings.prefix}updatesupportticketissue ${caseNum} <issue>.`;
  //Nice embed
  const embed = new MessageEmbed()
  .setColor(0x00AE86)
  .setTimestamp()
  .setDescription(`**Action:** Support Ticket\n**Target:** ${user.tag}\n**Support Specialist:** ${specialist.tag}\n**Issue:** ${issue}\n**Status:**Initialized`)
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
      id: user.id,
      allow: ['VIEW_CHANNEL']
    }
  ], "Makes Text Channel Private");
  var supportTicket = await guild.channels.create("support-ticket-"+caseNum,{type:'text', parent: supportcategory, permissionOverwites});
  supportTicket.send(embed);
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