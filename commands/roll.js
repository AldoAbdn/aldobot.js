const {postToDefault} = require('../util/postToDefault.js');
const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
const settings = require('../settings.json');
exports.run = async (client, message, args) => {
    let max = parseInt(args[0]);
    let randomInt = 1;
    if (max){
        randomInt = Math.floor(Math.random() * max) + 1;
        message.reply(`You rolled: ${randomInt}`);
    } else if(max <= 1 || !Number.isInteger(max)) {
        message.reply(`Ooops! I can only roll for a valid integer that is greater than 1`);
    }else {
        randomInt = Math.floor(Math.random() * 20) + 1;
        message.reply(`You rolled: ${randomInt}`);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'roll',
  description: 'Rolls a random number between 1 and the passed value. If no option specified rolls d20',
  usage: 'roll <max (optional)>'
};