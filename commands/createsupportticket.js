const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
const settings = require('../settings.json');
exports.run = async (client, message, args) => {
  //Variables
  const user = message.mentions.users.first();
  const guild = message.guild;
  const defaultrole = message.guild.roles.find('name',settings.defaultrole);
  const supportcategory = message.guild.channels.find("name", settings.supportcategory) || guild.createChannel('support-tickets-category','category');
  //Checks if a user was mentioned
  if (message.mentions.users.size < 1) return message.reply('You must mention someone create a ticket for them.').catch(console.error);
  //Get case number and reason, form fancy embed
  const log = guild.channels.find("name",settings.supportchannel) || guild.channels.find("name",settings.defaultchannel);
  parseUser(message, user);
  //Case number and reason 
  const caseNum = await caseNumber(client, log);
  const issue = args.splice(1, args.length).join(' ') || `Awaiting moderator's input. Use ${settings.prefix}updatesupportticketissue ${caseNum} <issue>.`;
  //Nice embed
  const embed = new RichEmbed()
  .setColor(0x00AE86)
  .setTimestamp()
  .setDescription(`**Action:** Warning\n**Target:** ${user.tag}\n**Support Specialist:** ${message.author.tag}\n**Issue:** ${issue}\n**Status:**Initialized`)
  .setFooter(`Case ${caseNum}`);
  //If there is a moderation channel, post embed there
  if (log!=null){
    log.send({embed});
  }
  //Create new channel
  var supportTicket = guild.createChannel("support-ticket-"+caseNum,'text');
  supportTicket.overwritePermissions(defaultrole,{
    'VIEW_CHANNEL':false
  });
  supportTicket.overwritePermissions(user, {
    'VIEW_CHANNEL':true
  })
  supportTicket.setParent(supportcategory);
  supportTicket.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'createsupportticket',
  description: 'Creates a new support ticket case and channel',
  usage: 'createsupportticket <user> <issue>'
};