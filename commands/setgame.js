exports.run = (client, message, args) => {
    const game = args.join(" ");
    client.user.setGame(game);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  category: "Just for Fun",
  permLevel: 3
};

exports.help = {
  name: 'setgame',
  description: 'Sets game attribute of bot',
  usage: 'setgame <game>'
};