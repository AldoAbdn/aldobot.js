const {postToDefault} = require('../util/postToDefault.js');
module.exports = (guild,user) => {
	postToDefault(guild,`${user.username} was just banned`);	
};
