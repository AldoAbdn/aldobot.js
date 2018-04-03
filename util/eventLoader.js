const reqEvent = (event) => require(`../events/${event}`);
module.exports = client => {
  //Ready
  client.on('ready', () => reqEvent('ready')(client));
  //Connection
  client.on('reconnecting', () => reqEvent('reconnecting')(client));
  client.on('disconnect', () => reqEvent('disconnect')(client));
  client.on('resume', () => reqEvent('resume')(client));
  //Message
  client.on('message', reqEvent('message'));
  client.on('messageDelete', reqEvent('messageDelete'));
  client.on('messageDeleteBulk', reqEvent('messageDeleteBulk'));
  client.on('messageReactionAdd', reqEvent('messageReactionAdd'));
  client.on('messageReactionRemove', reqEvent('messageReactionRemove'));
  client.on('messageReactionRemoveAll', reqEvent('messageReactionRemoveAll'));
  client.on('messageUpdate', reqEvent('messageUpdate'));
  //Guild
  client.on('guildCreate', reqEvent('guildCreate'));
  client.on('guildDelete', reqEvent('guildDelete'));
  client.on('guildUpdate', reqEvent('guildUpdate'));
  client.on('guildBanAdd', reqEvent('guildBanAdd'));
  client.on('guildBanRemove', reqEvent('guildBanRemove'));
  //Guild Member
  client.on('guildUnavailable', reqEvent('guildUnavailable'));
  client.on('guildMemberAdd', reqEvent('guildMemberAdd'));
  client.on('guildMembersChunk', reqEvent('guildMembersChunk'));
  client.on('guildMemberRemove', reqEvent('guildMemberRemove'));
  client.on('guildMemberAvailable', reqEvent('guildMemberAvailable'));
  client.on('guildMemberSpeaking', reqEvent('guildMemberSpeaking'));
  client.on('guildMemberUpdate', reqEvent('guildMemberUpdate'));
  client.on('presenceUpdate', reqEvent('presenceUpdate'));
  client.on('voiceStateUpdate', reqEvent('voiceStateUpdate'));
  //Channel
  client.on('channelCreate', reqEvent('channelCreate'));
  client.on('channelDelete', reqEvent('channelDelete'));
  client.on('channelPinsUpdate', reqEvent('channelPinsUpdate'));
  client.on('channelUpdate', reqEvent('channelUpdate'));
  //User 
  client.on('userNoteUpdate', reqEvent('userNoteUpdate'));
  client.on('userUpdate', reqEvent('userUpdate'));
  client.on('clientUserGuildSettingsUpdate', reqEvent('clientUserGuildSettingsUpdate'));
  client.on('clientUserSettingsUpdate', reqEvent('clientUserSettingsUpdate'));
  //Role
  client.on('roleCreate', reqEvent('roleCreate'));
  client.on('roleDelete', reqEvent('roleDelete'));
  client.on('roleUpdate', reqEvent('roleUpdate'));
  //Emoji
  client.on('emojiCreate', reqEvent('emojiCreate'));
  client.on('emojiDelete', reqEvent('emojiDelete'));
  client.on('emojiUpdate', reqEvent('emojiUpdate'));
  //Typing
  client.on('typingStart', reqEvent('typingStart'));
  client.on('typingStop', reqEvent('typingStop'));
  //Warnings
  client.on('debug', reqEvent('debug'));
  client.on('error', reqEvent('error'));
  client.on('warn', reqEvent('warn'));
};
