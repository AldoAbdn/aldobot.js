exports.run = (client, message, args) => {
    let user = message.author;
    let key = args[0];
    let value;
    //Concats args 
    if (args.length >= 2){
        value = args.slice(1).join(" ");
    } else {
        value = null;
    }
    //Checks if meta object is defined
    if (user.meta == undefined){
        user.meta = {};
    }
    //Checks input gives appropriate response
    if (key != null && value != null){
        //Both values have been passed, sets value
        user.meta[key] = value;
        message.reply("Value stored with key: " + key);
    } else if (key != null){
        //Only key passed, returns value
        if (user.meta[key] != undefined){
            message.reply(key + ": " +user.meta[key]);
        } else {
            message.reply("No value stored for this key");
        }
    } else {
        //If neither of above print meta object
        string = ``;
        for (key in user.meta){
            string += `\n${key}:${user.meta[key]}`;
        }
        message.reply(`:Meta Data:${string}`,{code:'asciidoc'});
    }

};
  
exports.conf = {
enabled: true,
guildOnly: false,
aliases: [],
permLevel: 0
};

exports.help = {
name: 'meta',
description: 'Lets a user store data, can be used to store traits for an RPG for example',
usage: 'meta <key> <value>(optional)'
};