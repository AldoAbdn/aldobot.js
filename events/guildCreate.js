const {postToDefault} = require('../util/postToDefault.js');
module.exports = guild =>{
	postToDefault(guild,`I have joined ${guild.name}`);
};