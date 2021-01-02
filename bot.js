const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.BOT_TOKEN); //BOT_TOKEN is the Client Secret

client.on('voiceStateUpdate', (oldMember, newMember) => {
  // Here I'm storing the IDs of their voice channels, if available
  let oldChannel = oldMember.voiceChannel ? oldMember.voiceChannel.id : null;
  let newChannel = newMember.voiceChannel ? newMember.voiceChannel.id : null;
  if (oldChannel == newChannel) return; // If there has been no change, exit

  // Here I'm getting the bot's channel (client.voiceChannel does not exist)
  let botMember = oldMember.guild.member(client.user),
    botChannel = botMember ? botMember.voiceChannel.id : null;

  // Here I'm getting the channel, just replace this string VVV with the channel's ID
  let textChannel = oldMember.guild.channels.get('794679849754558525');
  if (!textChannel) throw new Error("That text channel does not exist.");

  // Here I don't need to check if they're the same, since it would've exit before
  if (newChannel == botChannel) {
    // console.log("A user joined.");
    textChannel.send(`${newMember} has joined the voice channel.`);
  } else if (oldChannel == botChannel) {
    // console.log("A user left.");
    textChannel.send(`${newMember} has left the voice channel.`);
  }
});