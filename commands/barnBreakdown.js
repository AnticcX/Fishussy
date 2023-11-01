import { playerData } from "../utils"
import { toTitleCase } from "../utils"

export const barnBreakdown = register("command", (...args) => {

    let message = []
    let barnSCList = playerData.barn_breakdown
    for (var sc_name in Object.keys(barnSCList)) {
        sc_name = Object.keys(barnSCList)[sc_name]
        message.push(`&e${toTitleCase(sc_name.replaceAll("_", " "))}: &f${barnSCList[sc_name]}`)
    }
    message.unshift(`&7[&bBarn Breakdown]`)
    message.unshift(`&9&m${ChatLib.getChatBreak(" ")}`)
    message.push(`&9&m${ChatLib.getChatBreak(" ")}`)

    ChatLib.chat(message.join("\n"))
}).setName("barnbreakdown").setAliases("bb")