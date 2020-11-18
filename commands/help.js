const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "Affiche toutes les commandes",
  execute(message) {
    let commands = message.client.commands.array();

    let helpEmbed = new MessageEmbed()
      .setTitle(`${message.client.user.username} Help`)
      .setDescription("Liste des commandes")
      .setColor("#797D78")
      .setTimestamp()
      .setFooter("By ζ͜͡𝚁𝚊𝚙𝚑𝚊𝟸𝟸𝟶𝟸","https://zupimages.net/up/20/38/h9ls.jpg")

    commands.forEach((cmd) => {
      helpEmbed.addField(
        `**${message.client.prefix}${cmd.name} ${cmd.aliases ? `(${cmd.aliases})` : ""}**`,
        `${cmd.description}`,
        true
      );
    });

    helpEmbed.setTimestamp();

    return message.channel.send(helpEmbed).catch(console.error);
  }
};
