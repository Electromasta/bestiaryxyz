import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl} from '@angular/forms';
import { DiceService } from '../dice.service';
import { BiomesService } from './biomes.service';
import { Biome } from './model/biome.model';
import { LevelRange } from './model/levelrange.model';
import { Encounter } from './model/encounter.model';

@Component({
  selector: 'app-xgte',
  templateUrl: './xgte.component.html',
  styleUrls: ['./xgte.component.css'],
  providers: [BiomesService]
})
export class XgteComponent implements OnInit {
  constructor(private diceService: DiceService, private biomesService: BiomesService) { }

  biomes = this.biomesService.biomes;
  ranges = this.biomes[0].levelranges;
  encounters = this.ranges[0].encounters;
  output = {dice:"(d-): ", desc:"Roll Some Dice!"};

  xgteForm = new FormGroup({
    biomeSelect: new FormControl(this.biomes[0].index),
    rangeSelect: new FormControl(this.ranges[0].index)
  });

  getBiomeIndex() {return this.xgteForm.get('biomeSelect').value;}
  getRangeIndex() {return this.xgteForm.get('rangeSelect').value;}

  getBiome() {return this.biomes[this.getBiomeIndex()];}
  getRange() {return this.ranges[this.getRangeIndex()];}

  onBiomeChange() {
    this.ranges = this.getBiome().levelranges
    this.onRangeChange();
  }

  onRangeChange() {
    this.encounters = this.getRange().encounters;
  }

  onRoll() {
    var rolled = this.diceService.roll(100, 1);
    var index = 0;
    
    this.encounters.forEach((e, i) => {
      if (rolled >= e.start && rolled <= e.end) {
        index = i;
      }
    });

    this.output = {dice:"(1d100): " + rolled, desc:this.encounters[index].desc};
  }

  ngOnInit() {
  }
}
