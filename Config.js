import { @Vigilant, @SelectorProperty, @TextProperty, @ColorProperty, @ButtonProperty, @SwitchProperty, Color } from 'Vigilance'


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
        // this.moveTrackerDisplay.open()
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
    showFestivalSC = false;

    // CH Water
    @SwitchProperty({
        name: "Show Water Sea Creatures",
        description: "Shows sea creatures fished up in water from the Crystal Hollows",
        category: "Zones/Events",
        subcategory: "Zones/Events Toggle"
    })
    showWaterCHSC = false;

    // Lava CH
    @SwitchProperty({
        name: "Show Crystal Hollows Lava Sea Creatures",
        description: "Shows sea creatures fished up in lava from the Crystal Hollows",
        category: "Zones/Events",
        subcategory: "Zones/Events Toggle"
    })
    showLavaCHSC = false;

    // Crimson isles
    @SwitchProperty({
        name: "Show Crimson Isles Sea Creatures",
        description: "Strong.. lava fire guys",
        category: "Zones/Events",
        subcategory: "Zones/Events Toggle"
    })
    showCISC = false;

    // SESSION CONFIGS
    @ButtonProperty({
        name: "Start New Session",
        description: "Starts a new session",
        category: "Sessions",
        subcategory: "Current Sessions",
        placeholder: "Start"
    })
    startSession() {
        /*playerData.sessions[0] = session_info()
        playerData.save()
        sessionReset = true;*/
    };

    @ButtonProperty({
        name: "Pause Current Session",
        description: "Pause the session burh",
        category: "Sessions",
        subcategory: "Current Sessions",
        placeholder: "Reset"
    })
    pauseSession() {
        /*playerData.sessions[0] = session_info()
        playerData.save()
        sessionReset = true;*/
    };

    @ButtonProperty({
        name: "Resume Current Session",
        description: "Resumes the session burh",
        category: "Sessions",
        subcategory: "Current Sessions",
        placeholder: "Resume"
    })
    resumeSession() {
        /*playerData.sessions[0] = session_info()
        playerData.save()
        sessionReset = true;*/
    };

    @ButtonProperty({
        name: "End Current Session",
        description: "Ends the session burh",
        category: "Sessions",
        subcategory: "Current Sessions",
        placeholder: "End"
    })
    endSession() {
        /*playerData.sessions[0] = session_info()
        playerData.save()
        sessionReset = true;*/
    };

    // Past Sessions
    @SelectorProperty({ 
        name: "Select Session to view",
        description: "Select the past session you want to view",
        category: "Sessions",
        subcategory: "Past Sessions",
        options: ["PlaceholderSession1", "PlaceholderSession2"]
    })
    trackerOption = 0;

    @ButtonProperty({
        name: "View Session",
        description: "View the selected session",
        category: "Sessions",
        subcategory: "Past Sessions",
        placeholder: "View"
    })
    viewSession() {
        /*playerData.sessions[0] = session_info()
        playerData.save()
        sessionReset = true;*/
    };


    constructor() {
        this.initialize(this)
        this.setCategoryDescription("General", "Created By AnticcX")
        this.setCategoryDescription("Zones/Events", "Toggle Individual Sea Creatures Using &e/scg")
    }
}

export default new Config()