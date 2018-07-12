exports.run = (client, message, args) => {   
    //Set variables
    let volume = parseInt(args[0]);
    //If no volume set, set it
    if (message.guild.volume == null){
        message.guild.volume = 1;
    }
    //If no args passed, return current volume
    if (args.length == 0) {
        message.reply("Volume is:" + (message.guild.volume * 100));
    }
    else if (!Number.isInteger(volume) || volume < 0){
        //Not valid, return error
        message.reply("Volume must be an integer between 0 and 100 inclusive");
        return;
    } else if (message.guild.dispatcher) {
        //Set volume
        message.guild.volume = volume/100;
        message.guild.dispatcher.setVolume(message.guild.volume);
    }
};
  
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'volume',
    description: 'Sets music volume, pass an integer greater than 0. If no value is passed bot returns current volume',
    usage: 'volume <volume (optional)>'
};