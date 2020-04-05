const {deleteMessage} = require('../util/messageManagement');
exports.run = (client, message) => {
    const currentlyPlaying = message.guild.currentlyPlaying;
    //If currently playing is set, reply with details
    if (currentlyPlaying){
        message.reply(`:Now Playing:\n${currentlyPlaying.title}`,{code:'asciidoc'}).then(msg=>deleteMessage(msg,settings.messagetimeout));   
    } else {
        message.reply("Not Currently Playing Music").then(msg=>deleteMessage(msg,settings.messagetimeout));
    }
};
  
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    category: "Music",
    permLevel: 0
};

exports.help = {
    name: 'playing',
    description: 'Shows currently playing song',
    usage: 'playing'
};