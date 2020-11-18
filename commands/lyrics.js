const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");

module.exports = {
  name: "lyrics",
  aliases: ["ly"],
  description: "Donne les paroles d'une chanson",
  async execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Aucune musique jouer").catch(console.error);

    let lyrics = null;

    try {
      lyrics = await lyricsFinder(queue.songs[0].title, "");
      if (!lyrics) lyrics = `Pas de paroles pour la chanson ${queue.songs[0].title}.`;
    } catch (error) {
      lyrics = `Pas de paroles pour la chanson ${queue.songs[0].title}.`;
    }

    let lyricsEmbed = new MessageEmbed()
      .setTitle(`${queue.songs[0].title} — Paroles`)
      .setDescription(lyrics)
      .setColor("#797D78")
      .setTimestamp()
      .setFooter("By ζ͜͡𝚁𝚊𝚙𝚑𝚊𝟸𝟸𝟶𝟸","https://zupimages.net/up/20/38/h9ls.jpg")

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return message.channel.send(lyricsEmbed).catch(console.error);
  }
};
