
function Code(message, args) {
    let registered = require("../registered.json")
    if (args.length === 0) {
        message.channel.send("o Código parte de :\n```\r" + registered.code + "\r```")
    } else {
        let code = args[0]
        if (code.length === 6 && /^[a-zA-Z()]+$/.test(code)) {
            registered.code = code.toUpperCase()
            message.channel.send("Código em parte registro de :)")
        } else {
            message.channel.send("Talvez n seja um código valido")
        }
    }
}

exports.Code = Code;