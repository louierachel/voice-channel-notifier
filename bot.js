const Discord = require('discord.js');
const bot = new Discord.Client();

bot.login(process.env.BOT_TOKEN); //BOT_TOKEN is the Client Secret

bot.on('voiceStateUpdate', (oldMember, newMember) => {
  // Here I'm storing the IDs of their voice channels, if available
  let oldChannel = oldMember.voiceChannel ? oldMember.voiceChannel.id : null;
  let newChannel = newMember.voiceChannel ? newMember.voiceChannel.id : null;
  if (oldChannel == newChannel) return; // If there has been no change, exit

  // Here I'm getting the bot's channel (bot.voiceChannel does not exist)
  let botMember = oldMember.guild.member(bot.user),
    botChannel = botMember ? botMember.voiceChannel.id : null;

  // Here I'm getting the channel, just replace this string VVV with the channel's ID
  let textChannel = oldMember.guild.channels.get('voice-channel-notifications');
  if (!textChannel) throw new Error("That text channel does not exist.");

  // Here I don't need to check if they're the same, since it would've exit before
  if (newChannel == botChannel) {
    // console.log("A user joined.");
    textChannel.send(`${newMember} has joined the #general voice channel.`);
  } else if (oldChannel == botChannel) {
    // console.log("A user left.");
    textChannel.send(`${newMember} has left the #general voice channel.`);
  }
});