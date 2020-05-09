const reqEvent = (event) => require(`../events/${event}`);
module.exports = client => {
  //Ready
  client.on('ready', () => reqEvent('ready')(client));
  //Connection
  client.on('reconnecting', () => reqEvent('reconnecting')(client));
  client.on('disconnect', () => reqEvent('disconnect')(client));
  //Message
  client.on('message', reqEvent('message'));
  //Guild
  client.on('guildCreate', reqEvent('guildCreate'));
  client.on('guildBanAdd', reqEvent('guildBanAdd'));
  //Guild Member
  client.on('guildMemberAdd', reqEvent('guildMemberAdd'));
  client.on('guildMemberRemove', reqEvent('guildMemberRemove'));
  //Channel
  client.on('channelCreate', reqEvent('channelCreate'));
  //Role
  client.on('roleCreate', reqEvent('roleCreate'));
  client.on('roleDelete', reqEvent('roleDelete'));
  //Warnings
  client.on('debug', reqEvent('debug'));
  client.on('error', reqEvent('error'));
  client.on('warn', reqEvent('warn'));
};
