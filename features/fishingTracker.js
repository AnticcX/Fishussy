import { playerData, getSeaCreatures, seaCreatureInfo } from "../utils";
import Config from "../Config";

const updateSCData = (sc_name, sc_data) => {
    sc_data.sea_creatures[sc_name] ||= seaCreatureInfo();
    sc_data.sea_creatures[sc_name].caught++;
    sc_data.total_caught++;
    sc_data.sea_creatures[sc_name].last_caught = sc_data.total_caught;
    sc_data.sea_creatures[sc_name].last_caught_time = Date.now();
    playerData.save();
}

const updateTreasureData = (treasure, sc_data) => {
    if (treasure == "good") sc_data.good_catches++;
    if (treasure == "great") sc_data.great_catches++;
    if (treasure == "coins") sc_data.fished_coins++;
}

const register_event = (sc_name, sea_creature) => register("chat", ()  => {
    let { lifetime, sessions } = playerData;
    updateSCData(sc_name, lifetime)

    if (Config.trackerOption == 1 && !Config.trackerTimerPaused) { updateSCData(sc_name, sessions[0]) }
    if (sc_name === "yeti") World.playSound("mob.enderdragon.growl", 300, 0.01);

}).setCriteria(sea_creature.message);
  
for ([zone, creatures] of Object.entries(getSeaCreatures())) {
    for ([sc, sea_creature] of Object.entries(creatures)) {
      if (sc === "shown") continue;
      register_event(sc, sea_creature);
    }
}

register("chat", (message, event) => {
    let { lifetime, sessions } = playerData;
    updateTreasureData("good", lifetime)

    if (message.includes("Coins")) updateTreasureData("coins", lifetime)
    if (Config.trackerOption == 1 && !Config.trackerTimerPaused) {
        updateTreasureData("good", sessions[0])
        if (message.includes("Coins")) updateTreasureData("coins", sessions[0])
    }

}).setCriteria("GOOD CATCH! ${message}.")

register("chat", (message, event) => {
    let { lifetime, sessions } = playerData;
    updateTreasureData("great", lifetime)

    if (Config.trackerOption == 1 && !Config.trackerTimerPaused) { updateTreasureData("great", sessions[0]) }

}).setCriteria("GREAT CATCH! ${message}.")