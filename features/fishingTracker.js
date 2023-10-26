import { playerData, getSeaCreatures, seaCreatureInfo } from "../utils";
import Config from "../Config";

const updateData = (sc_name, sc_data) => {
    sc_data.sea_creatures[sc_name] ||= seaCreatureInfo();
    sc_data.sea_creatures[sc_name].caught++;
    sc_data.total_caught++;
    sc_data.sea_creatures[sc_name].last_caught = sc_data.total_caught;
    sc_data.sea_creatures[sc_name].last_caught_time = Date.now();
    playerData.save();
}

const register_event = (sc_name, sea_creature) => register("chat", ()  => {
    if (Config.trackerTimerPaused ) { return }
    
    let { lifetime, sessions } = playerData;
    updateData(sc_name, lifetime)

    if (Config.trackerOption == 1) { updateData(sc_name, sessions[0]) }
    if (sc_name === "yeti") World.playSound("mob.enderdragon.growl", 300, 0.01);

}).setCriteria(sea_creature.message);
  
for ([zone, creatures] of Object.entries(getSeaCreatures())) {
    for ([sc, sea_creature] of Object.entries(creatures)) {
      if (sc === "shown") continue;
      register_event(sc, sea_creature);
    }
}