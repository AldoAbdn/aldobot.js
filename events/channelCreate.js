const {deleteMessage} = require('../util/messageManagement.js');
const settings = require('../settings.json');
module.exports = channel => {
	console.log(`Channel ${channel} was created`);
	if (channel.type === 'text'){
		channel.send('New Channel Created').then(msg=>deleteMessage(msg,settings.messagetimeout));
	}	
};