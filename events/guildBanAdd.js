const {postToDefault} = require('../util/messageManagement.js');
module.exports = (guild,user) => {
	postToDefault(guild,`${user.username} was just banned`);	
};
