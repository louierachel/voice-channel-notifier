const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.BOT_TOKEN); //BOT_TOKEN is the Client Secret

const generalVoiceChannelId = '744013183659802679';
const notificationTextChannelId = '794679849754558525';

client.on('voiceStateUpdate', (oldState, newState) => {
  console.log("oldState", oldState)
  console.log("newState", newState)
  // store the voice channel id's
  let oldChannel = oldState.channelID || null;
  let newChannel = newState.channelID || null;
  if (oldChannel == newChannel) return; // If there has been no change, exit

  // get the text channel for notifications
  let textChannel = oldState.guild.channels.cache.get(notificationTextChannelId);
  if (!textChannel) throw new Error("That text channel does not exist.");

  // if new channel is not undefined, send a messages
  if (newChannel) {
    textChannel.send(`${newState.member.displayName} has joined a voice channel.`);
  } else { // if new channel is undefined, the user left all voice channels
    textChannel.send(`${newState.member.displayName} has left all voice channels.`);
  }
});