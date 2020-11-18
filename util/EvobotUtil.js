module.exports = {
  canModifyQueue(member) {
    const { channelID } = member.voice;
    const botChannel = member.guild.voice.channelID;

    if (channelID !== botChannel) {
      member.send("Tu dois etre dans un salon vocal!").catch(console.error);
      return;
    }

    return true;
  }
};
