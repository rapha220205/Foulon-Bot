const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "volume",
  aliases: ["v"],
  description: "Change le volume",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply("Aucune musique jouer.").catch(console.error);
    if (!canModifyQueue(message.member))
      return message.reply("Vous devez etre dans un salon vocal!").catch(console.error);

    if (!args[0]) return message.reply(`🔊 Le volume actuel est a : **${queue.volume}%**`).catch(console.error);
    if (isNaN(args[0])) return message.reply("Utiliser un nombre pour changer le volume.").catch(console.error);
    if (parseInt(args[0]) > 100 || parseInt(args[0]) < 0)
      return message.reply("Utilise un nombre entre 1 et 100").catch(console.error);

    queue.volume = args[0];
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

    return queue.textChannel.send(`Volume changer a: **${args[0]}%**`).catch(console.error);
  }
};
