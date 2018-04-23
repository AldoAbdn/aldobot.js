const {postToDefault} = require('../util/postToDefault.js');
module.exports = channel => {
	console.log(`The ${channel.name} ${channel.type} channel was deleted`);		
};