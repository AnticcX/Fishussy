import PogObject from "../PogData/index"


export const moduleName = "Fishussy"
export const prefix = "&7&n[&r&b&lFishing Tracker&r&7&n]&r"
export const rarity_colors = {
    common: "&1&r&f",
    uncommon: "&2&r&a",
    rare: "&3&r&9",
    epic: "&4&r&5",
    legendary: "&5&r&6",
    mythic: "&6&r&d",
    special: "&7&r&c"
}

export const sessionInfo = () => {
    return {
        start_time: Date.now(),
        total_caught: 0,
        good_catches: 0,
        great_catches: 0,
        sea_creatures: {}
    }
}

export const seaCreatureInfo = () => {
    return {
    caught: 0,
    last_caught: 0,
    last_caught_time: Date.now()
    }
}

export const data = new PogObject("FishingTracker", {
    trackerDisplay: {
        x: 0,
        y: 0
    }
}, "data/data.json");

export const playerData = new PogObject(moduleName, {
    sessions: [sessionInfo()],
    lifetime: {
        total_caught: 0,
        sea_creatures: {}
    }
}, "data/player_data.json");

// Returns the full list of sea creatures
export const getSeaCreatures = () => { 
    return JSON.parse(FileLib.read(moduleName, "data/seaCreatures.json")) 
}

export function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

// Takes miliseconds and changes it to readible minutes and seconds
export const getTimeFromMs = (miliseconds) => {
    return [parseInt(miliseconds / 60), parseInt(miliseconds % 60).toString().padStart(2, '0')]
}

// Gets the center of the slot and returns the x and y coords
export const getSlotCenter = (slot) => {
    const x = slot % 9;
    const y = Math.floor(slot / 9);

    return [
        Renderer.screen.getWidth() / 2 + ((x - 4) * 18),
        (Renderer.screen.getHeight() + 10) / 2 + ((y - Player.getOpenedInventory().getSize() / 18) * 18)
    ];
}

// Registers / Unregisters trigger (Bloom inspired)
const checkingTriggers = [];
export const registerWhen = (trigger, checkFunc) => checkingTriggers.push([trigger, checkFunc]);

register("tick", () => checkingTriggers.forEach(([trigger, func]) => func() ? trigger.register() : trigger.unregister()));

