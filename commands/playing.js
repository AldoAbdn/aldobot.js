exports.run = (client, message) => {
    const currentlyPlaying = message.guild.currentlyPlaying;
    //If currently playing is set, reply with details
    if (currentlyPlaying){
        message.reply(`:Now Playing:\n${currentlyPlaying.title}`,{code:'asciidoc'});   
    } else {
        message.reply("Not Currently Playing Music");
    }
};
  
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'playing',
    description: 'Shows currently playing song',
    usage: 'playing'
};