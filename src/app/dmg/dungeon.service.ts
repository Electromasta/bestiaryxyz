import { Injectable } from '@angular/core';

import { Dungeon } from './model/dungeon.model'

@Injectable({
  providedIn: 'root'
})
export class DungeonService {
  locations: Dungeon[] = [
    new Dungeon(1, 4, "A Building in a City", ""),
    new Dungeon(5, 8, "Catacombs or sewers beneath a city", ""),
    new Dungeon(9, 12, "Beneath a farmhouse", ""),
    new Dungeon(13, 16, "Beneath a graveyard", ""),
    new Dungeon(17, 22, "Beneath a ruined castle", ""),
    new Dungeon(23, 26, "Beneath a ruined city", ""),
    new Dungeon(27, 30, "Beneath a temple", ""),
    new Dungeon(31, 34, "In a chasm", ""),
    new Dungeon(35, 38, "In a cliff face", ""),
    new Dungeon(39, 42, "In a desert", ""),
    new Dungeon(43, 46, "In a forest", ""),
    new Dungeon(47, 50, "In a glacier", ""),
    new Dungeon(51, 54, "In a gorge", ""),
    new Dungeon(55, 58, "In a jungle", ""),
    new Dungeon(59, 62, "In a mountain pass", ""),
    new Dungeon(63, 66, "In a swamp", ""),
    new Dungeon(67, 70, "Beneath or on top of a mesa", ""),
    new Dungeon(71, 74, "In sea caves", ""),
    new Dungeon(75, 78, "In several connected mesas", ""),
    new Dungeon(79, 82, "On a mountain peak", ""),
    new Dungeon(83, 86, "On a promontory", ""),
    new Dungeon(87, 90, "On an island", ""),
    new Dungeon(91, 95, "Underwater", ""),
    new Dungeon(96, 100, "Roll on the Exotic Location Table", "")
  ];

  dungeonLocations: Dungeon[]  = [
    new Dungeon(1, 1, "Among the Branches of a Tree", ""),
    new Dungeon(2, 2, "Around a geyser", ""),
    new Dungeon(3, 3, "Behind a waterfall", ""),
    new Dungeon(4, 4, "Buried in an avalanche", ""),
    new Dungeon(5, 5, "Buried in a sandstorm", ""),
    new Dungeon(6, 6, "Buried in volcanic ash", ""),
    new Dungeon(7, 7, "CAstle or structure sunken in a swamp", ""),
    new Dungeon(8, 8, "Castle or structure at the bottom of a sinkhole", ""),
    new Dungeon(9, 9, "Floating on the sea", ""),
    new Dungeon(10, 10, "In a meteorite", ""),
    new Dungeon(11, 11, "On a demiplane or in a pocket dimension", ""),
    new Dungeon(12, 12, "In an area devestated by a magical catastrophe", ""),
    new Dungeon(13, 13, "On a cloud", ""),
    new Dungeon(14, 14, "In the Feywild", ""),
    new Dungeon(15, 15, "In the Shadowfell", ""),
    new Dungeon(16, 16, "On an island in an underground sea", ""),
    new Dungeon(17, 17, "In a volcano", ""), 
    new Dungeon(18, 18, "On the back of a Gargantuan living creature", ""),
    new Dungeon(19, 19, "Sealed inside a magical dome of force", ""),
    new Dungeon(20, 20, "Inside a Mordenkainen's magnificent mansion", "")
  ];

  dungeonCreator: Dungeon[] = [
    new Dungeon(1, 1, "Beholder", ""),
    new Dungeon(2, 4, "Cult or religious group", "Roll on cults or religious groups table to determine specifics"),
    new Dungeon(5, 8, "Dwarves", ""),
    new Dungeon(9, 9, "Elves (Including Drow)", ""),
    new Dungeon(10, 10, "Giants", ""),
    new Dungeon(11, 11, "Hobgoblins", ""), 
    new Dungeon(12, 15, "Humans", "Roll on the NPC Alignment and NPC class tables to determine specifics"),
    new Dungeon(16, 16, "Kuo-toa", ""),
    new Dungeon(17, 17, "Lich", ""),
    new Dungeon(18, 18, "Mind Flayers", ""),
    new Dungeon(19, 19, "Yuan-ti", ""),
    new Dungeon(20, 20, "No creator (natural caverns)", "")
    ,
  ];

  cults: Dungeon[] = [
    new Dungeon(1, 1, "Demon-worshiping cult", ""),
    new Dungeon(2, 2, "Devil-worshiping cult", ""),
    new Dungeon(3, 4, "Elemental Air cult", ""),
    new Dungeon(5, 6, "Elemental Earth cult", ""),
    new Dungeon(7, 8, "Elemental Fire cult", ""),
    new Dungeon(9, 10, "Elemental Water cult", ""),
    new Dungeon(11, 15, "Worshipers of an evil deity", ""),
    new Dungeon(16, 17, "Worshipers of a good diety", ""),
    new Dungeon(18, 20, "Worshipers of a neutral diety", "")
  ];

  alignment: [
    "Lawful Good", "Neutral Good", "Chaotic Good", "Lawful Neutral", "Neutral",
    "Chaotic Neutral", "Lawful Evil", "Neutral Evil", "Chaotic Evil"
  ];

  characterclass: [
    "Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin",
    "Ranger", "Rogue", "Sorcerer", "Warlock", "Wizard"
  ]

  purpose: Dungeon[] = [
    new Dungeon(1, 1, "Death Trap", ""),
    new Dungeon(2, 5, "Lair", ""),
    new Dungeon(6, 6, "Maze", ""),
    new Dungeon(7, 9, "Mine", ""),
    new Dungeon(10, 10, "Planar gate", ""),
    new Dungeon(11, 14, "Stronghold", ""),
    new Dungeon(15, 17, "Temple or shrine", ""),
    new Dungeon(18, 19, "Tomb", ""),
    new Dungeon(20, 20, "Treasure vault", "")
  ];

  dungeonHistory: Dungeon[] = [
    new Dungeon(1, 3, "Abandoned by creators", ""),
    new Dungeon(4, 4, "Abandoned due to the plague", ""), 
    new Dungeon(5, 8, "Conquered by invaders", ""),
    new Dungeon(9, 10, "Creators destroyed by conquering invaders", ""),
    new Dungeon(12, 12, "Creators destroyed by internal conflict", ""),
    new Dungeon(13, 13, "Creators destroyed by magical catastrophe", ""),
    new Dungeon(14, 15, "Creators destroyed by natural disaster", ""), 
    new Dungeon(16, 16, "Location cursed by the gods and shunned", ""),
    new Dungeon(17, 18, "Original creator still in control", ""), 
    new Dungeon(19, 19, "Overrun by planar creatures", ""), 
    new Dungeon(20, 20, "Site of a Great Miracle", "")
  ];

  monument: Dungeon[] = [
    new Dungeon(1, 1, "Sealed Burial mound or pyramid", ""),
    new Dungeon(2, 2, "Plundered Burial Mound or Pyramid", ""),
    new Dungeon(3, 3, "Faces carved into a mountainside or cliff", ""),
    new Dungeon(4, 4, "Giant Statues carved out of a mountainside or cliff", ""),
    new Dungeon(5, 6, "Intact obelistk etched with a warning , historical lore, dedication, or religious iconography", ""),
    new Dungeon(7, 8, "Ruined or toppled obelisk", ""),
    new Dungeon(9, 10, "Intact statue of a person or diety", ""),
    new Dungeon(11, 13, "Ruined or toppled statue of a person or diety", ""),
    new Dungeon(14, 14, "Great stone wall intact with tower fortifications spaced at one-mile intervals", ""),
    new Dungeon(15, 15, "Great stone wall in ruins", ""),
    new Dungeon(16, 16, "Great Stone Arch", ""),
    new Dungeon(17, 17, "Fountain", ""),
    new Dungeon(18, 18, "Intact circle of standing stones", ""),
    new Dungeon(19, 19, "Ruined or toppled circle of standing stones", ""),
    new Dungeon(20, 20, "Totem pole", "")
  ];

  weirdLocales: Dungeon[] = [
    new Dungeon(1, 2, "Dead magic zone", ""),
    new Dungeon(3, 3, "Wild magic zone", ""),
    new Dungeon(4, 4, "Boulder carved with talking faces", ""),
    new Dungeon(5, 5, "Crystal cave that mystically answers questions", ""),
    new Dungeon(6, 6, "Ancient Tree containing ancient spirit", ""),
    new Dungeon(7, 8,  "Battlefield where lingering fog occasionally assumes human form", ""),
    new Dungeon(9, 10, "Permanent portal to another plane of existance", ""),
    new Dungeon(11, 11, "Wishing well", ""), 
    new Dungeon(12, 12, "Giant Crystal shard protuding from the ground", ""), 
    new Dungeon(13, 13, "Wrecked ship, which might be nowhere near water", ""),
    new Dungeon(14, 15, "Haunted hill or barrow mound", ""),
    new Dungeon(16, 16, "River ferry guided by skeletal captain", ""),
    new Dungeon(17, 17, "Field of petrified soldiers or other creatures", ""),
    new Dungeon(18, 18, "Forest of petrified or awakened trees", ""),
    new Dungeon(19, 19, "Canyon containing a dragons' graveyard", ""),
    new Dungeon(20, 20, "Floating earth mote with a tower on it", "")
  ];

  startingArea: Dungeon[] = [
    new Dungeon(1, 1, "Square, 20 x 20 ft.; passage on each wall", ""),
    new Dungeon(2, 2, "Square, 20 x 20 ft.; door on two walls, passage in third wall", ""),
    new Dungeon(3, 3, "Square, 40 x 40 ft.; doors on the three walls", ""),
    new Dungeon(4, 4, "Rectangle, 80 x 20 ft., with row of pillars down the middle; " +
    "two passages leading from each long wall, doors on each short wall", ""),
    new Dungeon(5, 5, "Rectangle, 20 x 40 ft.; passage on each wall", ""),
    new Dungeon(6, 6, "Circle, 40 ft. diameter; one passage at each cardinal direction", ""),
    new Dungeon(7, 7, "Circle, 40ft. diameter; one passage in each cardinal direction, well in the middle of the room, might lead down to lower level", ""),
    new Dungeon(8, 8, "Square, 20 x 20.; door on two walls, passage on third wall, secret door on fourth wall", ""),
    new Dungeon(9, 9, "Passage, 10 ft. wide; T intersection", ""),
    new Dungeon(10, 10, "Passage, 10 ft. wide; four-way intersection", "")
  ];

  passage: Dungeon[] = [
    new Dungeon(1, 2, "Continue straight 30 ft., no doors or side passages", ""),
    new Dungeon(3, 3, "Continue straight 20 ft., door to the right, then an additional 10ft ahead", ""),
    new Dungeon(4, 4, "Continue straight 20 ft., door to the right, then an additional 10ft. ahead", ""),
    new Dungeon(5, 5, "Continue striaght 20ft., passage ends in a door", ""),
    new Dungeon(6, 7, "Continue straight 20 ft., side passage to the right, then an additional 10 ft ahead", ""),
    new Dungeon(8, 9, "Continue straight 20 ft., side passage to the left, then an additional 10 ft. ahead", ""),
    new Dungeon(10, 10, "Cotninue straight 20 ft., comes to a dead end, 10 percent chance of a secret door", ""),
    new Dungeon(11, 12, "Continue straight 20 ft., then the passage turns to the left and continues 10 ft.", ""),
    new Dungeon(13, 14, "Continue straight 20 ft., then the passage turns right and continues 10 ft.", ""),
    new Dungeon(15, 19, "Chamber (roll on the chamber table)", ""),
    new Dungeon(20, 20, "Stairs* (roll on the Stairs table)", "")
  ];

  passageWidth: Dungeon[] = [
    new Dungeon(1, 2, "5 ft.", ""),
    new Dungeon(3, 12, "10 ft.", ""),
    new Dungeon(13, 14, "20 ft.", ""),
    new Dungeon(15, 16, "30 ft.", ""),
    new Dungeon(17, 17, "40 ft., with row of pillars down the middle", ""),
    new Dungeon(18, 18, "40 ft., with double row of pillars", ""),
    new Dungeon(19, 19, "40 ft. wide, 20 ft. high", ""),
    new Dungeon(20, 20, "40 ft. wide, 20 ft. high, gallery 10 ft. above floor allows access to level above", "")
  ]

  doors: Dungeon[] = [
    new Dungeon(1, 10, "Wooden", ""),
    new Dungeon(11, 12, "Wooden barred or locked", ""),
    new Dungeon(13, 13, "Stone", ""),
    new Dungeon(14, 14, "Stone barred or locked", ""),
    new Dungeon(15, 15, "Iron", ""),
    new Dungeon(16, 16, "Iron, barred or locked", ""),
    new Dungeon(17, 17, "Portcullis", ""),
    new Dungeon(18, 18, "Portcullis, locked in place", ""),
    new Dungeon(19, 19, "Secret Door", ""),
    new Dungeon(20, 20, "Secret door, barred or locked", "")
  ];

  beyondADoor: Dungeon[]  = [
    new Dungeon(1, 2, "Passage extending 10ft., then T intersection extending 10ft. to the right and left", ""),
    new Dungeon(3, 8, "Passage 20 ft., straight ahead", ""),
    new Dungeon(9, 18, "Chamber (roll on the Chamber table)", ""),
    new Dungeon(19, 19, "Stairs (roll on the Stairs table", ""),
    new Dungeon(20, 20, "False door with trap", "")
  ];

  chambers: Dungeon[] = [
    new Dungeon(1, 2, "Square, 20 x 20 ft.", "1"),
    new Dungeon(3, 4, "Square, 30 x 30 ft.", "1"),
    new Dungeon(5, 6, "Square, 40 x 40 ft.", "1"),
    new Dungeon(7, 9, "REctangle, 20 x 30 ft", "1"),
    new Dungeon(10, 12, "Rectangle, 30 x 40 ft.", "1"),
    new Dungeon(13, 14, "Rectangle, 40 x 50 ft", "2"),
    new Dungeon(15, 15, "Rectangle, 50 x 80 ft.", "2"),
    new Dungeon(16, 16, "Circle, 30 ft. diameter", "1"),
    new Dungeon(17, 17, "Circle, 50 ft. diameter", "2"),
    new Dungeon(18, 18, "Octagon, 40 x 40 ft.", "2"),
    new Dungeon(19, 19, "Octagon, 60 x 60 ft.", "2"),
    new Dungeon(20, 20, "Trapezoid, roughly 40 x 60 ft.", "")
  ];

  chamberExits: Dungeon[] = [
    new Dungeon(1, 3, "0", "0"),
    new Dungeon(4, 5, "0", "1"),
    new Dungeon(6, 8, "1", "1"),
    new Dungeon(9, 11, "1", "2"),
    new Dungeon(12, 13, "2", "2"),
    new Dungeon(14, 15, "2", "3"),
    new Dungeon(16, 17, "3", "3"),
    new Dungeon(18, 18, "3", "4"),
    new Dungeon(19, 19, "4", "5"),
    new Dungeon(20, 20, "4", "6")
  ];

  exitLocation: Dungeon[] = [
    new Dungeon(1, 7, "Wall opposite entrance", ""),
    new Dungeon(8, 12, "Wall left of entrance", ""),
    new Dungeon(13, 17, "Wall right of entrance", ""),
    new Dungeon(18, 20, "Same wall as entrance", "")
  ]

  exitType = ["Door (roll on the Door Type table)", "Corridor"];

  stairs: Dungeon[] = [
    new Dungeon(1, 4, "Down on level to a chamber", ""),
    new Dungeon(5, 8, "Down on level to a passage 20 ft. long", ""),
    new Dungeon(9, 9, "Down two levels to a chamber", ""),
    new Dungeon(10, 10, "Down two levels to a passage 20ft long", ""),
    new Dungeon(11, 11, "Down three levels to a chamber", ""),
    new Dungeon(12, 12, "Down three levels to a passage 20ft. long", ""),
    new Dungeon(13, 13, "Up one level to a chamber", ""),
    new Dungeon(14, 14, "Up one level to a passage 20ft. long", ""),
    new Dungeon(15, 15, "Up to a dead end", ""),
    new Dungeon(16, 16, "Down to a dead end", ""),
    new Dungeon(17, 17, "Chimney up one level to a passage 20 ft. long", ""),
    new Dungeon(18, 18, "Chimney up two levels to a passage 20 ft. long", ""),
    new Dungeon(19, 19, "Shaft (with or without elevator) down one level to a chamber", ""),
    new Dungeon(20, 20, "Shaft (with or without elevator) up one level to a chamber and down one level to a chamber", "")
  ];

  deathtrap: Dungeon[] = [
    new Dungeon(1, 1, "Antechamber or waiting room for spectators", ""),
    new Dungeon(2, 8, "Guardroom fortified against intruders", ""),
    new Dungeon(9, 11, "Vault for holding important treasures, accessible only by locked or secret doors", "75 percent chance of being trapped"),
    new Dungeon(12, 14, "Room containing a puzzle that must be solved to bypass a trap or monster", ""),
    new Dungeon(15, 19, "Trap designed to kill or capture creatures", ""),
    new Dungeon(20, 20, "Observation room, allowing guards or spectators to observe creatures moving through the dungeon", "")
  ];

  lair: Dungeon[] = [
    new Dungeon(1, 1, "Armory stocked with weapons and armor", ""),
    new Dungeon(2, 2, "Audience chamber, used to recieve guests", ""),
    new Dungeon(3, 3, "Banquet room for important celebrations", ""),
    new Dungeon(4, 4, "Barracks where the lair's defenders are quartered", ""),
    new Dungeon(5, 5, "Bedroom, for use by leaders", ""),
    new Dungeon(6, 6, "Chapel where the lair's inhabitants worship", ""),
    new Dungeon(7, 7, "Cistern or well for drinking water", ""),
    new Dungeon(8, 9, "Guardroom for the defense of the lair", ""),
    new Dungeon(10, 10, "Guardroom for the defense of the lair", ""),
    new Dungeon(11, 11, "Kitchen for food storage and preperation", ""),
    new Dungeon(12, 12, "PEn or prison where the captives are held", ""),
    new Dungeon(13, 14, "Storage, mostly nonperishable goods", ""),
    new Dungeon(15, 15, "Throne room where the lair's leaders hold court", ""),
    new Dungeon(16, 16, "Torture Chamber", ""),
    new Dungeon(17, 17, "Training and exercise room", ""),
    new Dungeon(18, 18, "Trophy room or museum", ""),
    new Dungeon(19, 19, "Latrine or bath", ""),
    new Dungeon(20, 20, "Workshop for the construction of weapons, armor, tools, and other goods", "")
  ];

maze: Dungeon[] = [
  new Dungeon(1, 1, "Conjuring room, used to summon creatures that guard the maze", ""),
  new Dungeon(2, 5, "Guardroom for sentinals that patrol the maze", ""),
  new Dungeon(6, 10, "Lair for guard beasts that patrol the maze", ""),
  new Dungeon(11, 11, "Pen or prison accessible only by a secret door, used to hold captives condemned to the maze", ""),
  new Dungeon(12, 12, "Shrine dedicated to a god or other entity", ""),
  new Dungeon(13, 14, "Storage for food, as well as tools used by the maze's guardians to keep the complex in working order", ""),
  new Dungeon(15, 18, "Trap to confound or kill those sent into the maze", ""),
  new Dungeon(19, 19, "Well that provides drinking water", ""),
  new Dungeon(20, 20, "Workshop where doors, torch sconces, and other furnishings are repaired and maintained", "")
]

mine: Dungeon[] = [
  new Dungeon(1, 2, "Barracks for miners", ""),
  new Dungeon(3, 3, "Bedroom for supervisor or manager", ""),
  new Dungeon(4, 4, "Chapel dedicated to a patron deity of miners, earth, or protection", ""),
  new Dungeon(5, 5, "Cistern providing drinking water for miners", ""),
  new Dungeon(6, 7, "Guardroom", ""),
  new Dungeon(8, 8, "Kitchen used to feed workers", ""),
  new Dungeon(9, 9, "Laboratory used to conduct tests on strange minerals extracted from the mine", ""),
  new Dungeon(10, 15, "Lode where metal ore is mined (75 percent chance of being depleted)", ""),
  new Dungeon(16, 16, "Office used by the mine supervisor" ,""),
  new Dungeon(17, 17, "Smithy for repairing damaged tools", ""),
  new Dungeon(18, 19, "Storage for tools and other equipment", ""),
  new Dungeon(20, 20, "Strong room or vault used to store ore for transport to the surface", "")
]

planarGate: Dungeon[] = [
  new Dungeon(1, 3, "Decorated foyer or antechamber", ""),
  new Dungeon(4, 8, "Armory used by the portals guardians", ""),
  new Dungeon(9, 10, "Audience chamber for receiving visitors", ""),
  new Dungeon(11, 19, "Barracks used by the portal's guards", ""),
  new Dungeon(20, 23, "Bedroom for use by the high-ranking members of the order that guards the portal", ""),
  new Dungeon(24, 30, "Chapel dedicated to a deity or deities related to the portal and its defenders", ""),
  new Dungeon(31, 35, "Cistern providing fresh water", ""),
  new Dungeon(36, 38, "Classroom for use of initiates learning about the portal's secrets", ""),
  new Dungeon(39, 39, "Conjuring room for summoning creatures used to investigate or dfeend the portal", ""),
  new Dungeon(40, 41, "Crypt where the remains fo those that died guarding the portal are kept", ""),
  new Dungeon(42, 47,  "Dining Room", ""),
  new Dungeon(48, 50, "Divination room used to investigate the portal events tied to it", ""),
  new Dungeon(51, 55, "Dormitory for visitors and guards", ""),
  new Dungeon(56, 57, "Entry room or vestibule", ""),
  new Dungeon(58, 59, "Gallery for displaying trophies and objects related to the portal and those that guard it", ""),
  new Dungeon(60, 67, "Guardroom to protect or watch over the portal", ""),
  new Dungeon(68, 72, "Kitchen", ""),
  new Dungeon(73, 77, "Laboratory for conducting experiments relating to the portal and those that emerge from it", ""),
  new Dungeon(78, 80, "Library holding books about the portal's history", ""),
  new Dungeon(81, 85, "Pen or prison for holding captives or creatures that emerge form the portal", ""),
  new Dungeon(86, 87, "Planar junction, where the gate to another plane once stood (25 percent chance of being active", ""),
  new Dungeon(88, 90, "Storage", ""),
  new Dungeon(91, 91, "Strong room or vault, for guarding valuable treasures connected ot the portal or funds used to pay the planar gate's guardians", ""),
  new Dungeon(92, 93, "Study", ""),
  new Dungeon(94, 94, "Tortue chamber, for questioning creatures that pass through the portal or funds used to pay the planar gate's guardians", ""),
  new Dungeon(95, 98, "Latrine or bath", ""),
  new Dungeon(99, 100, "Workshop for constructing tools and gear needed to study the portal", "")
];

stronghold: Dungeon[] = [
  new Dungeon(1, 2, "Antechamber where visitors seeking access to the stronghold wait", ""),
  new Dungeon(3, 5, "Armory holding high-quality gear, including light siege weapons such as ballistas", ""),
  new Dungeon(6, 6, "Audience chamber used by the master of the stronghold to receive visitors", ""),
  new Dungeon(7, 7, "Aviary or zoo for keeping exotic creatures", ""),
  new Dungeon(8, 11, "Banquet room for hosting celebrations and guests", ""),
  new Dungeon(12, 15, "Barracks used by elite guards", ""),
  new Dungeon(16, 16, "Bath outfitted with marble floor and other luxurious accoutrements", ""),
  new Dungeon(17, 17, "Bedroom for use by the strongold's master or important guests", ""),
  new Dungeon(18, 18, "Chapel dedicated to a deity associated with the strongholds master", ""),
  new Dungeon(19, 21, "Cistern providing drinking water", ""),
  new Dungeon(22, 25, "Dining room for intimate gatherings or informal meals", ""),
  new Dungeon(26, 26, "Dressing room featuring a number of wardrobes", ""),
  new Dungeon(27, 29, "Gallery for the display of expensive works of art and trophies", ""),
  new Dungeon(30, 32, "Game room used to entertain visitors", ""),
  new Dungeon(33, 50, "Guardroom", ""),
  new Dungeon(51, 51, "Kennel where monsters or trained animals that protect the stronghold are kept", ""),
  new Dungeon(52, 57, "Kitchen designed to prepare exotic foods for large numbers of guests", ""),
  new Dungeon(58, 61, "Library with an extensive collection of rare books", ""),
  new Dungeon(62, 62, "Lounge used to entertain guests", ""),
  new Dungeon(63, 70, "Pantry, including cellar for wine or spirits", ""),
  new Dungeon(71, 74, "Sitting room for family and intimate guests", ""),
  new Dungeon(75, 78, "Stable", ""),
  new Dungeon(79, 86, "Storage for mundane goods and supplies", ""),
  new Dungeon(87, 87, "Strong room or vault for protecting important treasures (75 percent chance of being hidden behind a secret door", ""),
  new Dungeon(88, 92, "Study, including a writing desk", ""),
  new Dungeon(93, 93, "Throne room, elaborately decorated", ""),
  new Dungeon(94, 96, "Waiting room where lesser guests are held before receiving an audience", ""),
  new Dungeon(97, 98, "Latrine or Bath", ""),
  new Dungeon(99, 100, "Crypt belonging to the stronghold's master or someone else of importance", "")
]

templeShrine: Dungeon[] = [
  new Dungeon(1, 3, "Armory filled with weapons and armor, battle banners, and pennants", ""),
  new Dungeon(4, 5, "Audience chamber where priests of the temple receive commoners and low-ranking visitors", ""),
  new Dungeon(6, 7, "Banquet room used for celebrations and holy days", ""),
]

































  constructor() { }
}
