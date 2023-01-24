const fs = require("fs")

function Add(message, args, command) {
    console.log("COUCOUA")
    if (message.author.username === "Zuma Torney" || message.author.username === "Cerfio" || message.author.username === "Rajie") {
        console.log("COUCOU")
        if (args[0] !== undefined && args[1] !== undefined) {
            let register = require("../registered.json")
            register[args[0]] = args[1]
            fs.writeFile("../registered.json", JSON.stringify(register), function (err) {
                if (err) throw err;
                console.log('Salvo!');
            });
            message.channel.send("Command added")
        }
    }
}

exports.Add = Add;