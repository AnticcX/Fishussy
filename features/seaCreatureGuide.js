import { moduleName, getSeaCreatures, getSlotCenter } from "../utils";

export const getVisibility = (sc_name) => {
    const sea_creatures = getSeaCreatures();
    let zone_visibility = null;
    let visibility = null;

    for (var zone in sea_creatures) {
        if (sc_name in sea_creatures[zone]) {
            zone_visibility = sea_creatures[zone].shown;
            visibility = sea_creatures[zone][sc_name].shown;
            break;
        }
    }

    return [zone_visibility, visibility];
}

const toggleVisibility = (sc_name) => {
    var sea_creatures = getSeaCreatures()
    var visibility = null
    for (var zone in sea_creatures) {
        if (sc_name in sea_creatures[zone]) {
            visibility = !sea_creatures[zone][sc_name].shown
            sea_creatures[zone][sc_name].shown = visibility
            World.playSound(visibility ? "random.orb" : "random.pop", 300, 1)
            break
        }
    }
    FileLib.write(moduleName, "data/seaCreatures.json", JSON.stringify(sea_creatures))
    return visibility
}

register("guiMouseclick", (x, y, btn, gui, event) => {
    if (gui.toString().includes("net.minecraft.client.gui.inventory.GuiChest")) {
        slot = Client.currentGui.get().getSlotUnderMouse()
        if (!Player.getContainer() || !slot || !Player.getContainer().getName().includes("Sea Creature Guide")) { return; }

        item = Player.getContainer().getItems()[Client.currentGui.get().getSlotUnderMouse().slotIndex]
        if (!item || !item.getName().includes("[Lvl")) { return; }

        sc_name = item.getName().substring(item.getName().indexOf("] §9§l") + 6)
        if (!getVisibility(sc_name.replaceAll(" ", "_").toLowerCase())[0]) {
            cancel(event)
            return
        }
        toggleVisibility(sc_name.replaceAll(" ", "_").toLowerCase())
    }
})

const draw_scg_background = (slot, sc_name) => {
    const [zone_visibility, visibility] = getVisibility(sc_name)
    const [x, y] = getSlotCenter(slot)

    Renderer.retainTransforms(true)
    Renderer.translate(x, y, zone_visibility ? 200 : 290)
    Renderer.drawCircle(
        !zone_visibility ? Renderer.color(139, 139, 139, 255) : 
        visibility ? Renderer.color(85, 255, 85, 255) : 
        Renderer.color(255, 85, 85, 255),
        0, -0.5, 8.1, 360)
    Renderer.scale(0.75, 0.75)
    Renderer.retainTransforms(false)
}

const NBTTagString = Java.type("net.minecraft.nbt.NBTTagString")
register("guiRender", () => {
    inv = Player.getContainer()
    if (!inv || !inv.getName().includes("Sea Creature Guide")) return
    slots = inv.getItems()

    for (var slot in slots) {
        item = inv.getStackInSlot(slot)

        if (!item || !item.getName().includes("[Lvl")) continue
        sc_name = item.getName().substring(item.getName().indexOf("] §9§l") + 6).replaceAll(" ", "_").toLowerCase()
        const [zone_visibility, visibility] = getVisibility(sc_name)
        try {
            if (!zone_visibility) {
                item_nbt = item.getNBT().getCompoundTag("tag").getCompoundTag("display").getTagMap()
                list = new NBTTagList(item_nbt.get("Lore"))
                for (let i = 0; i < list.getTagCount(); i++) {
                    list.removeTag(i)
                }
                if (list.getTagCount() == 0)
                    list.appendTag(new NBTTagString(ChatLib.addColor("&r&eToggle Sea Creature Zone / Event To View!")));
            }       
        } catch (e) { console.log(e) }
        
        draw_scg_background(slot, sc_name)
    }
})