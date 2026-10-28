import { Component, OnInit } from '@angular/core';

import { MatSelectChange } from '@angular/material/select';

import { FakeabaseService } from '../fakeabase.service';

@Component({
  selector: 'app-encounter',
  templateUrl: './encounter.component.html',
  styleUrls: ['./encounter.component.css']
})
export class EncounterComponent implements OnInit {
  biomes = [
    {name: "Arctic", levels: ["Level Range 1-4", "Level Range 5-10", "Level Range 11-16", "Level Range 17-20"]},
    {name: "Coastal", levels: ["Level Range 1-4", "Level Range 5-10", "Level Range 11-16", "Level Range 17-20"]},
    {name: "Desert", levels: ["Level Range 1-4", "Level Range 5-10", "Level Range 11-16", "Level Range 17-20"]},
    {name: "Forest", levels: ["Level Range 1-4", "Level Range 5-10", "Level Range 11-16", "Level Range 17-20"]},
    {name: "Hill", levels: ["Level Range 1-4", "Level Range 5-10", "Level Range 11-16", "Level Range 17-20"]},
    {name: "Mountain", levels: ["Level Range 1-4", "Level Range 5-10", "Level Range 11-16", "Level Range 17-20"]},
    {name: "Swamp", levels: ["Level Range 1-4", "Level Range 5-10", "Level Range 11-20"]},
    {name: "Underdark", levels: ["Level Range 1-4", "Level Range 5-10", "Level Range 11-16", "Level Range 17-20"]},
    {name: "Underwater", levels: ["Level Range 1-4", "Level Range 5-10", "Level Range 11-20"]},
    {name: "Urban", levels: ["Level Range 1-4", "Level Range 5-10", "Level Range 11-16", "Level Range 17-20"]}
  ];
  bookmark = this.biomes[0];
  chosenRange = this.bookmark.levels[0];
  encounter;
  rolled = 0;

  tierSelect;

  constructor(private fakeabase: FakeabaseService) {
  }

  ngOnInit(): void {
  }

  biomeChanged(selectChangeEvent: MatSelectChange)  {
    this.biomes.forEach(biome => {
      if (biome.name == selectChangeEvent.value) {
        this.bookmark = biome;
        this.tierSelect = biome.levels[0];
        this.chosenRange = biome.levels[0];
      }
    });
  }

  tierChanged(selectChangeEvent: MatSelectChange)  {
    this.bookmark.levels.forEach(range => {
      if (range == selectChangeEvent.value) {
        this.chosenRange = range;
      }
    });
  }

  rollEncounter()  {
    var formatted = this.bookmark.name.toLowerCase() + "." + this.chosenRange.replace(/\s/g, '').toLowerCase();
    this.fakeabase.rollEncounter(formatted).subscribe(encounter => {
      this.encounter = encounter;
    });
  }
}
