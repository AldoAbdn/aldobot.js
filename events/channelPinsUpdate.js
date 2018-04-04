const {postToDefault} = require('../util/postToDefault.js');
module.exports = (channel, time) => {
	postToDefault(client.guilds.get(message.guild.id),`The pins for ${channel.name} have been updated (${time})`);	
};