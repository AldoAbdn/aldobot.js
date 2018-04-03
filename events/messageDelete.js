module.exports = message => {
	console.log(`A message with the contents ${message.cleanContent} was deleted from ${message.channel.name}`);
};