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

  constructor() { }
}
