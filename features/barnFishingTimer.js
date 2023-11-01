import { registerWhen, data, getTimeFromMs } from "../utils"
import Config from "../Config"

let sea_creatures = [
    "squid","sea_walker","night_squid","sea_guardian","sea_witch",
    "sea_archer","rider_of_the_deep","catfish","carrot_king","sea_leech",
    "agarimoo","guardian_defender","deep_sea_protector","water_hydra",
    "the_sea_emperor","oasis_rabbit","oasis_sheep",
    "scarecrow","nightmare","werewolf","phantom_fisher","grim_reaper",
    "frozen_steve","frosty","grinch","nutcracker","yeti","reindrake",
    "nurse_shark","blue_shark","tiger_shark","great_white_shark",
    "water_worm","poisoned_water_worm","zombie_miner",
    "flaming_worm","lava_blaze","lava_pigman",
    "plhlegblast","magma_slug","moogma","lava_leech",
    "pyroclastic_worm","lava_flame","fire_eel","taurus","thunder","lord_jawbus"
]

register("dragged", (dx, dy, x, y, btn) => {
    if (!Config.moveBarnTimer.isOpen()) return
    data.barnTimer.x = x
    data.barnTimer.y = y
    data.save()
})

let sc_count = 0
let barn_start_time = null
registerWhen(register("renderOverlay", () => {
    if (!Config.barnTimer) { return; }

    if (sc_count == 0) { barn_start_time = null; return }
    if (sc_count >= 0 && !barn_start_time) { barn_start_time = Date.now() }

    Renderer.retainTransforms(true)
    Renderer.translate(data.barnTimer.x, data.barnTimer.y)

    let [minutes, seconds] = getTimeFromMs(Date.now() - barn_start_time)
    let time_str = minutes != 0 ? `${minutes}m ${seconds}s` : `${seconds}s`
    let display = `${(Date.now() - barn_start_time) / 1000 >= Config.barnTimerSlider ? '&c' : '&e'}${time_str} &7(${sc_count >= 60 ? '&c' : '&e'}${sc_count} &bsea creature${(sc_count == 1 ? '' : 's')}&7)`

    Renderer.drawString(display, 0, 0);
    Renderer.retainTransforms(false);

}), () => Config.barnTimer);


const EntityArmorStand = Java.type("net.minecraft.entity.item.EntityArmorStand")
register('step', () => {
    if (!Config.barnTimer) { return; }
    sc_count = 0
    World.getAllEntitiesOfType(EntityArmorStand).forEach(entity => {
        let name = entity?.getName().removeFormatting()
        if (!name || !name.includes("[Lv")) { return; }
        sc_name = name.substring(name.indexOf("] ") + 2).split(" ")
        sc_name.pop()
        sc_name = sc_name.join("_").toLowerCase()
        if (sc_name.includes("acorrupted")) { sc_name = sc_name.slice(0, -1).slice(11) }
        if (!(sea_creatures.includes(sc_name))) { return; }
        sc_count += 1
    })
})
