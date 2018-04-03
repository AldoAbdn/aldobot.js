module.exports = role =>{
	let guild = role.guild;
	guild.defaultChannel.sendMessage(`A new role was created`);
};