const Discord = require('discord.js');
const client = new Discord.Client();

const generalVoiceChannelId = '744013183659802679';
const notificationTextChannelId = '794679849754558525';

client.on('voiceStateUpdate', (oldState, newState) => {
  // store the voice channel id's
  let oldChannelId = oldState.channelID || null;
  let newChannelId = newState.channelID || null;
  if (oldChannelId == newChannelId) return; // If there has been no change, exit

  // get the text channel for notifications
  let textChannel = newState.guild.channels.cache.get(notificationTextChannelId);
  if (!textChannel) throw new Error("That text channel does not exist.");

  // if new channel is not undefined, send a messages
  if (newChannelId === generalVoiceChannelId) {
    textChannel.send(`${newState.member.displayName} has joined the General voice channel.`);
  } else { // if new channel is undefined, the user left all voice channels
    textChannel.send(`${newState.member.displayName} has left the General voice channel.`);
  }
});

client.login(process.env.BOT_TOKEN)
  .catch((err) => console.error(err));