const {deleteMessage} = require('../util/messageManagement.js');
exports.run = (client, message, args, perms, settings) => {   
    //Set variables
    const dispatcher = message.guild.dispatcher;
    let newVolume = parseInt(args[0]);
    //If no volume set, set it
    if (message.guild.volume == null){
        volume = 1;
    }
    //If no args passed, return current volume
    if (args.length == 0) {
        message.reply("Volume is:" + (message.guild.volume * 100)).then(msg=>deleteMessage(msg,settings.messagetimeout));
    }
    else if (!Number.isInteger(newVolume) || newVolume < 0){
        //Not valid, return error
        message.reply("Volume must be an integer between 0 and 100 inclusive").then(msg=>deleteMessage(msg,settings.messagetimeout));
        return;
    } else if (dispatcher) {
        //Set volume
        message.guild.volume = newVolume/100;
        dispatcher.setVolume(message.guild.volume);
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
    name: 'volume',
    description: 'Sets music volume, pass an integer greater than 0. If no value is passed bot returns current volume',
    usage: 'volume <volume (optional)>'
};