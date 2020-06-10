import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MatSelectChange } from '@angular/material/select';
import { NgxXml2jsonService } from 'ngx-xml2json';

import { Biome } from './model/biome.model';
import { LevelRange } from './model/levelrange.model';
import { Encounter } from './model/encounter.model';

@Component({
  selector: 'app-encounter',
  templateUrl: './encounter.component.html',
  styleUrls: ['./encounter.component.css']
})
export class EncounterComponent implements OnInit {
  private headers = new HttpHeaders(); 
  private testFile = 'assets/booklet/encounters/index.xml';
  biomes: Array<Biome>;
  bookmark: Biome;
  chosenRange: LevelRange;
  encounter: Encounter;
  rolled = 0;

  tierSelect;

  constructor(private http: HttpClient, private ngxXml2jsonService: NgxXml2jsonService) {
    this.headers = this.headers.append('Content-Type', 'text/xml'); 
    this.headers = this.headers.append('Accept', 'text/xml');

    this.http.get(this.testFile, {responseType: 'text'}).subscribe(data => {
      this.biomes = new Array<Biome>(this.read(data)['files'].file.length);
      this.read(data)['files'].file.forEach(i => {
        this.http.get('assets/booklet/encounters/' + i + '.xml', {responseType: 'text'}).subscribe(data => {
          var json = this.read(data);
          this.biomes.splice(parseInt(json['biome'].order, 10), 1, this.parse(json));
          if (json['biome'].order == 0) {
            this.bookmark = this.biomes[0];
            this.chosenRange = this.biomes[0].levelranges[0];
          }
        });
      });
    });
  }

  ngOnInit(): void {
  }

  read(data)  {
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, 'text/xml');
    const json = this.ngxXml2jsonService.xmlToJson(xml);
    return json;
  }

  parse(json) {
    var levelranges = new Array<LevelRange>();

    this.arrayify(json['biome'].levelrange).forEach((levelrange, index) => {
      var encounters = new Array<Encounter>();

      this.arrayify(levelrange.encounter).forEach(encounter => {
        encounters.push(new Encounter(encounter.low, encounter.high, encounter.text));
      });

      levelranges.push(new LevelRange(index, levelrange.header,  "desc", encounters));
    });

    var b = new Biome(Number(json['biome'].order), json['biome'].title, "desc", levelranges);
    return b;
  }

  arrayify(x)  {
    if (x != undefined && x.length == undefined)  {
      var temp = new Array();
      temp.push(x);
      x = temp;
    }
    return x;
  }

  biomeChanged(selectChangeEvent: MatSelectChange)  {
    this.biomes.forEach(biome => {
      if (biome.order == selectChangeEvent.value) {
        this.bookmark = biome;
        this.tierSelect = biome.levelranges[0];
        this.chosenRange = biome.levelranges[0];
      }
    });
  }

  tierChanged(selectChangeEvent: MatSelectChange)  {
    this.bookmark.levelranges.forEach(range => {
      if (range.name == selectChangeEvent.value) {
        this.chosenRange = range;
      }
    });
  }

  rollEncounter()  {
    var rolled = Math.floor((Math.random() * Number(this.chosenRange.encounters[this.chosenRange.encounters.length-1].end)))+1;
    var index = 0;
    
    this.chosenRange.encounters.forEach((e, i) => {
      if (rolled >= e.start && rolled <= e.end) {
        index = i;
      }
    });

    this.rolled = rolled;
    this.encounter = this.chosenRange.encounters[index];
  }
}
