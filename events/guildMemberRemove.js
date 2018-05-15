const {postToDefault} = require('../util/postToDefault.js');
module.exports = member => {
  const guild = member.guild;
  postToDefault(guild,`Please say goodbye to ${member.user.username} we will miss you!`);
};
