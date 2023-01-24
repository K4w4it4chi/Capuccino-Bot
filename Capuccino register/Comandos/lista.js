function List(message) {
    let registered = require("../registered.json")
    console.log(registered.today)
    if (registered.today.length === 0) {
        message.channel.send("Disponível ")
    } else {
        let response = "```\n"
        registered.today.forEach((element) => {
            const user = element.split(' ');
            response = response + user[0] + "\n";
        })
        response = response + "\nIl y'a " + registered.today.length + " jJuntou se a " + "\n```"
        message.channel.send(response)
    }
}

exports.List = List;