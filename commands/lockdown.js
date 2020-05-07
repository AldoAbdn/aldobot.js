const ms = require('ms');
const {deleteMessage} = require('../util/messageManagement.js');
exports.run = (client, message, args, perms, settings) => {
  //Setup
  var lockdownMessage;
  const role = message.guild.roles.cache.find(role => role.name === settings.defaultrole);
  const id = message.channel.id;
  if (!client.lockit) client.lockit = [];
  const time = args.join(' ');
  const validUnlocks = ['release', 'unlock'];
  if (!time) return message.reply('You must set a duration for the lockdown in either hours, minutes or seconds').then(msg=>deleteMessage(msg,settings.messagetimeout));
  //Checks if time includes a keywork, release or unlock
  if (validUnlocks.includes(time)) {
    message.channel.overwritePermissions([{
      id:role.id,
      SEND_MESSAGES: null
    }]).then(() => {
      //Unlocks channel
      message.channel.send('Lockdown lifted.').then((m)=>deleteMessage(m,settings.messagetimeout)).catch(console.error);
      clearTimeout(client.lockit[id]);
      delete client.lockit[id];
    }).catch(error => {
      console.log(error);
    });
  } else {
    message.channel.overwritePermissions([{
      id: role.id,
      SEND_MESSAGES: false
    }]).then(() => {
      //Loccks down channel for specified time
      message.channel.send(`Channel locked down for ${ms(ms(time), { long:true })}`).then((msg) => {
        client.lockit[id] = setTimeout(() => {
          //Only for default role
          message.channel.overwritePermissions([{
            id:role.id,
            SEND_MESSAGES: null
          }]).then(message.channel.send('Lockdown lifted.')).then((m)=>deleteMessage(m,settings.messagetimeout)).catch(console.error);
          delete client.lockit[id];
          deleteMessage(msg,0);
        }, ms(time));
      }).catch(error => {
        console.log(error);
      });
    });
  }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ld'],
  category: "Server Management",
  permLevel: 2
};

exports.help = {
  name: 'lockdown',
  description: 'This will lock a channel down for the set duration, be it in hours, minutes or seconds.',
  usage: 'lockdown <duration>'
};
