const {deleteMessage} = require('../util/messageManagement.js');

exports.run = (client, message, args, perms, settings) => {
  var command;
  const channel = message.channel;
  //Sets command to passed in command
  if (client.commands.has(args[0])) {
    command = args[0];
  } else if (client.aliases.has(args[0])) {
    command = client.aliases.get(args[0]);
  }
  //If no command return message
  if (!command) {
    return message.reply(`I cannot find the command: ${args[0]}`).then(m=>deleteMessage(m, settings.messagetimeout));
  } else {
    //Reloads command
    message.reply(`Reloading: ${command}`)
      .then(m => {
        client.reload(command)
          .then(() => {
            m.edit(`Successfully reloaded: ${command}`);
          })
          .catch(e => {
            m.edit(`Command reload failed: ${command}\n\`\`\`${e.stack}\`\`\``);
          });
          deleteMessage(m,settings.messagetimeout)
      });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['r'],
  category: "Server Management",
  permLevel: 4
};

exports.help = {
  name: 'reload',
  description: 'Reloads the command file, if it\'s been updated or modified.',
  usage: 'reload <commandname>'
};
