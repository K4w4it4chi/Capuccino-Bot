function botStatus(command, admin, shutdown, message) {
    if (command === "shutdown" && (admin.indexOf(message.author.username) !== -1)) {
        shutdown = true;
        console.log("O Capuccino esfriou u.u")
        return true
        // message.channel.send("Adieu tout le monde")
    } else if (command === "Ligar" && (admin.indexOf(message.author.username) !== -1)) {
        shutdown = false;
        console.log("Capuccino pronto !")
        return false
    }
    if (shutdown === true) return true;
}

exports.botStatus = botStatus