const {groupCommandsByCategory} = require('../util/groupCommandsByCategory');
exports.run = (client, message, params, perms, settings) => {
  if (!params[0]) {
    //Prints list of all commands if none was specified
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    const commands = groupCommandsByCategory(client.commands.array(),'category');
    var string = `= Command List =\n\n[Use ${settings.prefix}help <commandname> for details]$`;
    for (var group in commands){
      string += `\n\n==${group}==\n\n`;
      string += commands[group].map(c => `${settings.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n');
    }
    message.channel.send(string, {code:'asciidoc',split:true});
  } else {
    //Prints description of specified command
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage::${command.help.usage}`, {code:'asciidoc',split:true});
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
