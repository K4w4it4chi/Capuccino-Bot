const fs = require("fs")

function updateRegistered (content) {
    fs.writeFile("./registered.json", JSON.stringify(content), function (err) {
        if (err) throw err;
        console.log('Salvo!');
      });
}

function Register(message) {
    let registered = require("./registered.json")
    if (registered.today.indexOf(message.author.username + ' ' + message.author.id) === -1) {
        registered.today.push(message.author.username + ' ' + message.author.id)
        updateRegistered(registered)
        message.reply("registro salvo !");
    } else {
        message.reply("Você já está registrado !")
    }
}

function Unregister(message) {
    let registered = require("./registered.json")
    let index = registered.today.indexOf(message.author.username + ' ' + message.author.id)
    if ( index === -1) {
        message.reply(" você não especificou ao certo , e não encontramos");
    } else {
        registered.today.splice(index, 1)
        message.reply("Não está mais disponível")
    }

}

exports.updateRegistered = updateRegistered;
exports.Unregister = Unregister;
exports.Register = Register;