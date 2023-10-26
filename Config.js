import { @Vigilant, @SelectorProperty, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, Color } from 'Vigilance'
import { playerData, sessionInfo } from "./utils"


@Vigilant("FishingTracker", "FishingTracker", {
    getCategoryComparator: () => (a, b) => {
        const categories = [
            "General", 
            "Zones/Events",
            "Sessions"
        ]
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})
class Config {

    moveTrackerDisplay = new Gui()

    // Tracker
    @SwitchProperty({
        name: "Show Tracker",
        description: "Display the fishing tracker on screen",
        category: "General",
        subcategory: "Tracker"
    })
    showTracker = false;

    @ButtonProperty({
        name: "Move Tracker",
        description: "Moves the tracker",
        category: "General",
        subcategory: "Tracker",
        placeholder: "Move"
    })
    moveTracker() {
        this.moveTrackerDisplay.open()
    };

    // Tracker Display

    @SelectorProperty({ 
        name: "Tracker Type",
        description: "Select what type of tracker you want to view",
        category: "General",
        subcategory: "Tracker Display",
        options: ["Lifetime", "Session"]
    })
    trackerOption = 0;

    @SwitchProperty({
        name: "Tracker Background",
        description: "Adds a background behind the tracker display",
        category: "General",
        subcategory: "Tracker Display"
    })
    trackerBackground = false;

    @ColorProperty({
        name: "Tracker Background Color",
        description: "Pick a color",
        category: "General",
        subcategory: "Tracker Display"
    })
    bg_color = new Color(0, 0, 0, .6);

    @SwitchProperty({
        name: "Name as Rarity",
        description: "Uses rarity as sea creature's name color on display",
        category: "General",
        subcategory: "Tracker Display"
    })
    displayNameAsRarity = false;

    @SwitchProperty({
        name: "Time since last caught",
        description: "Shows how long it has been since you've last caught a sea creature",
        category: "General",
        subcategory: "Tracker Extra Stats"
    })
    timeSinceLastCaught = false;

    @SwitchProperty({
        name: "Number of Sea Creatures since last caught",
        description: "Shows how many sea creatures it has been since you've last caught &cX&r sea creature",
        category: "General",
        subcategory: "Tracker Extra Stats"
    })
    seaCreaturesSinceLastCaught = false;

    // ZONES / EVENTS TOGGLE
    // Default Creature Category
    @SwitchProperty({
        name: "Show Default Sea Creatures",
        description: "Default water sea creatures",
        category: "Zones/Events",
        subcategory: "Zones/Events Toggle"
    })
    showDefaultSC = true;

    // Oasis Creatures
    @SwitchProperty({
        name: "Show Oasis Sea Creatures",
        description: "Show Oasis Sheep and Rabbit",
        category: "Zones/Events",
        subcategory: "Zones/Events Toggle"
    })
    showOasisSC = false;

    // Spooky Creatures
    @SwitchProperty({
        name: "Show Spooky Sea Creatures",
        description: "Show Spooky Event sea creatures",
        category: "Zones/Events",
        subcategory: "Zones/Events Toggle"
    })
    showSpookySC = false;

    // Winter SC
    @SwitchProperty({
        name: "Show Winter Sea Creatures",
        description: "Winter sea creatures from the Jerry Island",
        category: "Zones/Events",
        subcategory: "Zones/Events Toggle"
    })
    showWinterSC = false;

    // Sharks
    @SwitchProperty({
        name: "Show Fishing Festival Sea Creatures",
        description: "Sharks",
        category: "Zones/Events",
        subcategory: "Zones/Events Toggle"
    })
    showFishingFestivalSC = false;

    // CH Water
    @SwitchProperty({
        name: "Show Water Sea Creatures",
        description: "Shows sea creatures fished up in water from the Crystal Hollows",
        category: "Zones/Events",
        subcategory: "Zones/Events Toggle"
    })
    showWaterCrystalHollowsSC = false;

    // Lava CH
    @SwitchProperty({
        name: "Show Crystal Hollows Lava Sea Creatures",
        description: "Shows sea creatures fished up in lava from the Crystal Hollows",
        category: "Zones/Events",
        subcategory: "Zones/Events Toggle"
    })
    showLavaCrystalHollowsSC = false;

    // Crimson isles
    @SwitchProperty({
        name: "Show Crimson Isles Sea Creatures",
        description: "Strong.. lava fire guys",
        category: "Zones/Events",
        subcategory: "Zones/Events Toggle"
    })
    showCrimsonIsleSC = false;

    // SESSION CONFIGS
    @ButtonProperty({
        name: "Start New Session",
        description: "Starts a new session",
        category: "Sessions",
        subcategory: "Current Sessions",
        placeholder: "Start"
    })
    startSession() {
        playerData.sessions[0] = sessionInfo()
        playerData.save()
    };

    @SwitchProperty({
        name: "Pause Current Session",
        description: "Pause the session burh",
        category: "Sessions",
        subcategory: "Current Sessions",
    })
    trackerTimerPaused = false;


    constructor() {
        this.initialize(this)
        this.setCategoryDescription("General", "Created By AnticcX")
        this.setCategoryDescription("Zones/Events", "Toggle Individual Sea Creatures Using &e/scg")
    }
}

export default new Config()