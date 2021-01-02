const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.BOT_TOKEN); //BOT_TOKEN is the Client Secret

const generalVoiceChannelId = '744013183659802679';
const notificationTextChannelId = '794679849754558525';

client.on('voiceStateUpdate', (oldState, newState) => {
  console.log("oldState", oldState)
  console.log("newState", newState)
  // store the voice channel id's
  let oldChannel = oldState.voiceChannel ? oldState.voiceChannel.id : null;
  let newChannel = newState.voiceChannel ? newState.voiceChannel.id : null;
  if (oldChannel == newChannel) return; // If there has been no change, exit

  // get the text channel for notifications
  let textChannel = oldState.guild.channels.get(notificationTextChannelId);
  if (!textChannel) throw new Error("That text channel does not exist.");

  // get the guildMember form of the user
  let oldGuildMember = oldState.guild.member(client.user),
    oldVoiceChannelId = oldGuildMember ? oldGuildMember.voiceChannel.id : null;

  // Here I don't need to check if they're the same, since it would've exit before
  if (newChannel == oldVoiceChannelId) {
    textChannel.send(`${newState.member.displayName} has joined the voice channel.`);
  } else if (oldChannel == botChannel) {
    textChannel.send(`${newState.member.displayName} has left the voice channel.`);
  }
});