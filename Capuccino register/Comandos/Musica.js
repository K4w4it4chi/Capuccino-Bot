const ytdl = require('ytdl-core');

function channelVerif(voiceChannel, message, channel) {
    console.log("COUCOU")
    if (!voiceChannel)
        return { res: -1, response: "Você precisa estar no canal de voz para ouvir a Música" }
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return { res: -1, response: "Preciso de uma permissão para tocar no canal de voz" }
    }
    if (!channel) return console.error("The channel does not exist!");
    return { res: 0, response: 0 }
}
const queue = new Map();


async function playMusic(client, message, link) {
    
    const serverQueue = queue.get(message.guild.id);
    
    const channel = client.channels.fetch(process.env.VOICE_CHANNEL_ID);
    const voiceChannel = message.member.voice.channel;
    let res = channelVerif(voiceChannel, message, channel)
    console.log(res)
    if (res.res === -1) {
        message.channel.send(res.response)
        return
    }
    console.log("Hello")
    // console.log(message.member)
    const songInfo = await ytdl.getInfo(link);
    const song = {
        title: songInfo.playerResponse.videoDetails.title,
        url: link
    }
        const queueContruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        }

        queue.set(message.guild.id, queueContruct);
        
        try {
            var connection = await voiceChannel.join();
            queueContruct.connection = connection;
            play(message.guild, song);
        } catch (err) {
            console.log(err);
            queue.delete(message.guild.id);
            return message.channel.send(err);
        }
}

function play(guild, song) {
    const serverQueue = queue.get(guild.id);
    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }

    const dispatcher = serverQueue.connection
        .play(ytdl(song.url))
        .on("finish", () => {
        })
        .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 43);
    serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}

function skip(message, serverQueue) {
    if (!message.member.voice.channel)
      return message.channel.send(
        "Você precisa estar no canal para parar a música!"
      );
    if (!serverQueue)
      return message.channel.send("Som não encontrado,passe a música ");
    serverQueue.connection.dispatcher.end();
  }
  
  function stop(message, serverQueue) {
    if (!message.member.voice.channel)
      return message.channel.send(
        "Você precisa estar no canal!"
      );
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
  }

  function leave(message) {
    const voiceChannel = message.member.voice.channel;
    voiceChannel.leave()
  }

exports.playMusic = playMusic;
exports.stop = stop;
exports.leave = leave;