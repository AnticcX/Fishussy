import Config from "../Config"
// import { prefix } from "../utils/Utils"

export const FishussyCommand = register("command", (...args) => {
    if (!args || !args[0]) return Config.openGUI()

    let message = [
        `&9&m${ChatLib.getChatBreak(" ")}`,
        //`${prefix}`,
        ` `,
        `&7&lCreator: &3- Made by AnticcX (A.K.A Ossydeussy)`,
        `&7&lCommand Usage: &3- Opens Settings Menu`,
        `&9&m${ChatLib.getChatBreak(" ")}`
    ]
    ChatLib.chat(message.join("\n"))
}).setName("fishussy")