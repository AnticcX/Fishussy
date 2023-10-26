import { toTitleCase, getTimeFromMs, getSeaCreatures, registerWhen, playerData, data, seaCreatureInfo, rarity_colors, moduleName } from "../utils"
import Config from "../Config"

syncSCTime = (sc_data) => {
    const sea_creatures = getSeaCreatures()
    for (var zone in sea_creatures) {
        let sc_zone = sea_creatures[zone]
        if (!sc_zone.shown) { continue; }
        for (var sc_raw_name in sc_zone) {
            let sc_info = sc_zone[sc_raw_name]
            if (sc_raw_name == "shown" || !sc_info.shown) { continue; } 
            player_info = sc_data.sea_creatures[sc_raw_name]
            player_info.last_caught_time += Date.now() - sc_data.pause_time
        }
    }
}

const format_display = (display, sc_data) => {
    let [minutes, seconds] = getTimeFromMs((Date.now() - sc_data.start_time) / 1000)
    if (Config.trackerOption == 1) {
        if (Config.trackerTimerPaused) {
            [minutes, seconds] = getTimeFromMs((sc_data.pause_time - sc_data.start_time) / 1000)
        }
        display.unshift(
            {"&4&5Great Catches": sc_data.great_catches}, 
            {"&3&6Good Catches": sc_data.good_catches}, 
            {"&2&aTimer": `${minutes}m${seconds}s`})
    }

    display.unshift({"&1&eCreatures Caught": sc_data.total_caught}, {"&5&b-:": ":-"})
    display.sort((a, b) => Renderer.getStringWidth(Object.keys(b)[0]) - Renderer.getStringWidth(Object.keys(a)[0]))
    
    const finalDisplay = display.map(sc => {
        const sc_name = Object.keys(sc)[0]
        const info = sc[sc_name]
        const width_different = parseInt((Renderer.getStringWidth(ChatLib.removeFormatting(Object.keys(display[0])[0])) - Renderer.getStringWidth(ChatLib.removeFormatting(sc_name))) / 4) + 3 * 4
        return `${sc_name}${" ".repeat(width_different)}${info}`
    }).sort()
    return finalDisplay
}

const tracker = (sc_data) => {
    const sea_creatures = getSeaCreatures()
    let display = []
    for (var zone in sea_creatures) {
        let sc_zone = sea_creatures[zone]
        if (!sc_zone.shown) { continue; }
        for (var sc_raw_name in sc_zone) {
            let sc_info = sc_zone[sc_raw_name]
            if (sc_raw_name == "shown" || !sc_info.shown) { continue; } 
            if (!(sc_raw_name in sc_data.sea_creatures)) {
                sc_data.sea_creatures[sc_raw_name] = seaCreatureInfo()
                playerData.save()
            }
            player_info = sc_data.sea_creatures[sc_raw_name]

            name_color = ""
            caught = player_info.caught
            sc_name = sc_raw_name.replaceAll("_", " ")
            if (Config.displayNameAsRarity) { name_color = `&r${rarity_colors[sc_info.rarity]}`; }
            
            let sc_display = `${name_color}${toTitleCase(sc_name)} `

            if (Config.trackerOption == 1) {
                sc_display += `&7[&d${sc_data.total_caught - player_info.last_caught}&7]${name_color}: `
                let [minutes, seconds] = getTimeFromMs((Date.now() - player_info.last_caught_time) / 1000)
                if (Config.trackerTimerPaused) {
                    if (sc_data.pause_time == 0) {
                        sc_data.pause_time = Date.now() 
                    } 
                    [minutes, seconds] = getTimeFromMs((sc_data.pause_time - player_info.last_caught_time) / 1000)
                }
                if (!Config.trackerTimerPaused && !sc_data.pause_time == 0) { 
                    sc_data.start_time += Date.now() - sc_data.pause_time
                    syncSCTime(sc_data)
                    sc_data.pause_time = 0
                }
                sc_display += `&8(${minutes}m${seconds.padStart(2, '0')}s)${name_color}`
            }
            
            let scData = {}
            scData[sc_display] = caught
            display.push(scData)
        }
    }
    return format_display(display, sc_data)
}

register("dragged", (dx, dy, x, y, btn) => {
    if (!Config.moveTrackerDisplay.isOpen()) return
    data.trackerDisplay.x = x
    data.trackerDisplay.y = y
    data.save()
})

let display = null;
register("tick", () => {
    let seaCreatures = getSeaCreatures();
    Object.keys(seaCreatures).forEach((creature) => {
        seaCreatures[creature].shown = Config[`show${creature.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("")}SC`];
    });
    FileLib.write(moduleName, "data/seaCreatures.json", JSON.stringify(seaCreatures));
    if (!Config.showTracker && !Config.moveTrackerDisplay.isOpen()) { return display = null; }
    display = tracker(Config.trackerOption === 0 ? playerData.lifetime : playerData.sessions[0]);
});

registerWhen(register("renderOverlay", () => {
    if (!display) { return; }

    const maxWidth = Math.max(...display.map(a => Renderer.getStringWidth(a)));

    bg_color = Config.bg_color;
    Renderer.retainTransforms(true);
    Renderer.translate(data.trackerDisplay.x, data.trackerDisplay.y);
    if (Config.trackerBackground) Renderer.drawRect(Renderer.color(bg_color.red, bg_color.green, bg_color.blue, bg_color.alpha), -4, -4, maxWidth + 8, display.length * 9 + 8);

    Renderer.drawString(display.join("\n"), 0, 0);
    Renderer.retainTransforms(false);

}), () => display);