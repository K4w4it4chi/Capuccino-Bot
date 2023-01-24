var admin = ["Han / Paçócrates"]

function Call(message) {
    let registered = require("../registered.json");
    console.log(registered.today);
    if (registered.today.length === 0 && message.author.username.indexOf(admin) !== -1) {
        message.reply("Agora capuccino está disponível");
    } else {
        registered.today.forEach((element) => {
            const split = element.split(' ');
            message.channel.send("<@" + split[split.length - 1] + ">");
        })
    }
}

exports.Call = Call;