const settings = require('../settings.json');
const {deleteMessage} = require('../util/messageManagement.js');
exports.postToDefault = (guild,string) => {
    if (guild.channels.cache.find(channel => channel.name === settings.defaultchannel)){
        guild.channels.cache.find(channel => channel.name === settings.defaultchannel).send(string,{code:'asciidoc'});
        return true;
    } else {
        guild.defaultChannel.send(string,{code:'asciidoc'}).then(msg=>deleteMessage(msg,settings.messagetimeout));
        return true;
    }
};