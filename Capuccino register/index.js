const Discord = require("discord.js");
const config = require("./config.json");

require('dotenv').config()

const client = new Discord.Client();

const prefix = "!";

const Code = require("./Commands/code")
const List = require("./Commands/list")
const Registration = require("./registration")
const Music = require("./Commands/music");
const Add = require("./Commands/add");
const { botStatus } = require("./Commands/BotStatus");
const { Call } = require("./Commands/call");

var shutdown = false;

var admin = ["Han / Paçócrates "]

setTimeout(() => {
    let registered = require("./registrado.json")
        registered.today = []
        Registration.updateRegistered(registered)
}, 1000 * 60 * 60 * 24)

console.log("UP")

client.on("message", function (message) {
    try {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    console.log("Command => ", message.author.username, command)
    shutdown = botStatus(command, admin, shutdown, message)
    if (shutdown === true) return;
    if (command === "código") {
        Code.Code(message, args)
        return
    }
    if (message.channel.id !== process.env.CHANNEL_ID) return;
    if (command === "registrar") {
        Registration.Register(message);
    } else if (command === "limpar") {
        Registration.Unregister(message);
    } else if (command === "mostrar") {
        let registered = require("./registered.json")
        console.log(registered)
    } else if (command === "call") {
        Call(message)
    } else if (command === "listar") {
        List.List(message);
    } else if (command === "certo") {
        message.channel.send("Sem métrica");
    } else if (command === "ajuda") {
        message.channel.send("```\r!register:\t Permite o checkin ! \r!anular :\tAnula o registro\r!listar:\tLista os usuários\r!clear:\rpermite limpar o registro\r!help: \r\rBot feito por Han / Palocrates ^^ <3\r```");
    } else if (command === "buzz") {
        message.channel.send("insira o nick");
    } else if (command === "clear") {
        let registered = require("./registered.json")
        registered.today = []
        Registration.updateRegistered(registered)
        message.channel.send("Nota Listada !")
    } else if (command === "obj") {
        Music.playMusic(client, message, "https://www.youtube.com/watch?v=fR4P8o95WPA");
    } else if (command === "snk") {
        Music.playMusic(client, message, "https://youtu.be/pa00z_Bp2j4?t=161")
    } else if (command === "sair") {
        Music.leave(message)
    } else if (command === "add") {
        Add.Add(message, args, command)
    } else {
        let register = require("./registered.json")
        console.log(register[command])
        if (register[command] !== undefined) {
            Music.playMusic(client, message, register[command])
        } else {
            message.channel.send("Comando não repoduzível ")
        }
    }
} catch (e) {
    console.log(e)
    message.channel.send("Capuccino Crashou com o comando :/ ")
}
});

client.login(config.BOT_TOKEN);