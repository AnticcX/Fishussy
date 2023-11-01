import { toTitleCase, getTimeFromMs, getSeaCreatures, registerWhen, playerData, data, seaCreatureInfo, rarity_colors, moduleName, sortDict } from "../utils"
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
    let [minutes, seconds] = getTimeFromMs(Date.now() - sc_data.start_time)

    if (Config.trackerOption == 1) {
        if (Config.trackerTimerPaused) {
            [minutes, seconds] = getTimeFromMs(sc_data.pause_time - sc_data.start_time)
        }
        display.unshift({"&2&aTimer": `&a${minutes}m${seconds}s`})
    }

    display.unshift({"&1&eCreatures Caught": "&e" + sc_data.total_caught},
                    {"&6&b-:": "&b:-"},
                    {"&4&5Great Catches": "&5" + sc_data.great_catches},
                    {"&3&6Good Catches": "&6" + sc_data.good_catches},
                    {"&5&6Coins": "&6" + sc_data.fished_coins})

    let finalDisplay = {}
    for (let line in display) {
        let key = Object.keys(display[line])
        let value = display[line][key]
        finalDisplay[key] = value
    }
    finalDisplay = sortDict(finalDisplay)
    
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
            
            let sc_display = `${name_color}${toTitleCase(sc_name)}`

            if (Config.trackerOption == 1) {
                if (Config.seaCreaturesSinceLastCaught) sc_display += ` &8[&d${sc_data.total_caught - player_info.last_caught}&8]${name_color}`
                sc_display += ": "
                if ((Date.now() - player_info.last_caught_time) / 1000 < 0) player_info.last_caught_time = Date.now();

                let [minutes, seconds] = getTimeFromMs(Date.now() - player_info.last_caught_time)
                if (Config.trackerTimerPaused) {
                    if (sc_data.pause_time == 0) {
                        sc_data.pause_time = Date.now() 
                    } 
                    if ((sc_data.pause_time - player_info.last_caught_time) / 1000 < 0) player_info.last_caught_time = sc_data.pause_time;
                    [minutes, seconds] = getTimeFromMs(sc_data.pause_time - player_info.last_caught_time)
                }
                if (!Config.trackerTimerPaused && !sc_data.pause_time == 0) { 
                    sc_data.start_time += Date.now() - sc_data.pause_time
                    syncSCTime(sc_data)
                    sc_data.pause_time = 0
                }
                if (Config.timeSinceLastCaught) sc_display += `&7(${minutes}m${seconds.padStart(2, '0')}s)${name_color}`
            } else { sc_display += ": " }
            
            let scData = {}
            scData[sc_display] = name_color + caught
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

    const maxWidth = Math.max(...Object.keys(display).map(a => Renderer.getStringWidth(a)));
    bg_color = Config.trackerBGColor;

    Renderer.retainTransforms(true);
    Renderer.translate(data.trackerDisplay.x, data.trackerDisplay.y);

    let guiWidth = maxWidth + Renderer.getStringWidth(" ")*7.5
    if (Config.trackerOption == 1) guiWidth = maxWidth + Renderer.getStringWidth("&2&aTimer") + Renderer.getStringWidth(display["&2&aTimer"])
    if (Config.trackerBackground) Renderer.drawRect(Renderer.color(bg_color.red, bg_color.green, bg_color.blue, bg_color.alpha), -4, -4, guiWidth + 8, Object.keys(display).length * 9 + 8);
    
    let x = 0
    let y = 0
    for (var key in Object.keys(display)) {
        key = Object.keys(display)[key]
        value = display[key]
        Renderer.drawString(key, x, y);
        Renderer.drawString(value, Renderer.getStringWidth(" ")*6 + Renderer.getStringWidth(key) + (maxWidth - Renderer.getStringWidth(key)), y);
        y += 9;
    }
    
    Renderer.retainTransforms(false);

}), () => display);