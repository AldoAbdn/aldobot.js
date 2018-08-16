const {groupCommandsByCategory} = require('../util/groupCommandsByCategory');
const {deleteMessage} = require('../util/messageManagement.js');
exports.run = (client, message, params, perms, settings) => {
  if (!params[0]) {
    //Prints list of all commands if none was specified
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    const commands = groupCommandsByCategory(client.commands.array(),'category');
    var stringArray = [];
    stringArray.push(`= Command List =\n\n[Use ${settings.prefix}help <commandname> for details]`);
    for (var group in commands){
      let string = `\n\n == ${group} == \n\n`;
      string += commands[group].map(c => `${settings.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n');
      stringArray.push(string);
    }
    for (var string of stringArray){
      message.channel.send(string, {code:'asciidoc',split:true}).then(msg=>deleteMessage(msg,settings.messagetimeout));
    }
  } else {
    //Prints description of specified command
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage::${command.help.usage}`, {code:'asciidoc',split:true}).then(msg=>deleteMessage(msg,settings.messagetimeout));
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'halp'],
  category: "Server Management",
  permLevel: 0
};

exports.help = {
  name: 'help',
  description: 'Displays all the available commands for your permission level, of you can specify a command to get specifics',
  usage: 'help <command (optional)> '
};
