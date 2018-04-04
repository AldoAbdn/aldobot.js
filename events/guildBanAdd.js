const {postToDefault} = require('../util/postToDefault.js');
module.exports = (guild,user) => {
	postToDefault(client.guilds.get(message.guild.id),`${user.username} was just banned`);	
};
