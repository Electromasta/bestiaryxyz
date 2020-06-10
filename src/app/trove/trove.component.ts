import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { NgxXml2jsonService } from 'ngx-xml2json';

import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-trove',
  templateUrl: './trove.component.html',
  styleUrls: ['./trove.component.css']
})
export class TroveComponent implements OnInit {
  private headers = new HttpHeaders(); 
  private filelocal = 'assets/booklet/loottables/';
  tierList = ["Tier 1 - Gritty", "Tier 2 - Heroic", "Tier 3 - Wuxia", "Tier 4 - Diety"];
  cultureList = ["Jonapur", "Akros", "Twin Cities"];
  worldTendancyList = ["Black", "Blue", "White", "Red", "Green"];
  troveTypeList = ["Individual", "Trove", "Double Trove", "TRIPLE Trove"];
  tier = 0;
  coinio = 0;

  coins = [
    [[12, 6, 100, 0], [6, 6, 100, 0], [4, 6, 10, 0], [2, 6, 1, -4], [1, 6, 0, 0]],
    [[2, 6, 100, 0], [2, 6, 1000, 0], [2, 4, 100, 0], [2, 4, 10, 0], [1, 6, 0, 0]],
    [[1, 6, 0, 0], [2, 6, 100, 0], [6, 6, 100, 0], [2, 6, 10, 0], [2, 6, 1, -4]],
    [[1, 6, 0, 0], [2, 6, 100, 0], [12, 6, 100, 0], [2, 6, 100, 0], [2, 6, 1, 0]]
  ];

  coinage = [
    ["Copper Pesci", "Silver Pesci", "Silver Serpenti", "Gold Serpenti", "Mithril Serpenti"],
    ["Ses", "Heralds", "Denari", "Crowns", "Divines"],
    ["Papyrus Tablet", "Clay Tablet", "Ivory Tablet", "Gold Tablet", "Electrum Tablet"]
  ];

  gemmos = [
    [[2, 6, 10], [2, 6, 10], [2, 6, 25], [2, 6, 50]],
    [[2, 4, 25], [2, 6, 50], [2, 6, 100], [1, 4, 250]],
    [[2, 4, 250], [1, 4, 750], [2, 4, 500], [1, 6, 1000]],
    [[1, 6, 1000], [1, 4, 2500], [1, 4, 7500], [1, 4, 5000]]
  ];

  books = [];
  commons = [];
  exotics = [];
  gemNames = [];
  minors = [];
  majors = [];

  chanceDrops = [ //out of 100
    [35, 0, 0],
    [45, 5, 0],
    [5, 25, 5],
    [5, 5, 15]
  ];

  trove = [];

  constructor(private http: HttpClient, private ngxXml2jsonService: NgxXml2jsonService) { 
    this.headers = this.headers.append('Content-Type', 'text/xml'); 
    this.headers = this.headers.append('Accept', 'text/xml');

    this.http.get(this.filelocal + "commons.xml", {responseType: 'text'}).subscribe(data => {
      var json = this.read(data);
      json["commons"].common.forEach(common => {
        this.commons.push(common);
      });
    });

    this.http.get(this.filelocal + "books.xml", {responseType: 'text'}).subscribe(data => {
      var json = this.read(data);
      console.log(json);
      json["books"].book.forEach(book => {
        this.books.push({name: book.name, desc: book.desc});
      });
    });
    
    this.http.get(this.filelocal + "gemmos.xml", {responseType: 'text'}).subscribe(data => {
      var json = this.read(data);
      console.log(json);
      json["tables"].table.forEach((table, x) => {
        var ntable = [];
        table.tab.forEach((tab, y)  => {
          var ntab = [];
          tab.item.forEach(item => {
            ntab.push({name: item.name, desc: item.price});
          });
          ntable.push(ntab);
        });
        this.gemNames.push(ntable);
      });
    });
    
    this.http.get(this.filelocal + "exotics.xml", {responseType: 'text'}).subscribe(data => {
      var json = this.read(data);
      console.log(json);
      json["exotics"].exotic.forEach(exotic => {
        this.exotics.push({name: exotic.name, desc: exotic.price});
      });
    });

    this.http.get(this.filelocal + "minoritems.xml", {responseType: 'text'}).subscribe(data => {
      var json = this.read(data);
      console.log(json);
      json["tables"].table.forEach(table => {
        var t = [];
        table.list.item.forEach(item => {
          t.push({"weight": item.weight, "name": item.text});
        });
        console.log(t)
        this.minors.push(t);
      });
    });

    this.http.get(this.filelocal + "majoritems.xml", {responseType: 'text'}).subscribe(data => {
      var json = this.read(data);
      console.log(json);
      var weighttotal = 0;
      json["tables"].table.forEach((table, i) => {
        var t = [];
        table.list.item.forEach(item => {
          weighttotal += Number(item.weight);
          t.push({"weight": weighttotal, "name": item.text});
        });
        console.log(t)
        this.majors.push(t);
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

  tierChanged(selectChangeEvent: MatSelectChange)  {
    this.tierList.forEach((range, i) => {
      if (range == selectChangeEvent.value) {
        this.tier = i;
      }
    });
  }

  coinChanged(selectChangeEvent: MatSelectChange)  {
    this.cultureList.forEach((c, i) => {
      if (c == selectChangeEvent.value) {
        this.coinio = i;
      }
    });
  }

  rollEncounter()  {
    var coinTier = this.coins[this.tier];
    this.trove = [];

    coinTier.forEach((e, i) =>{
      var num = ((this.rollDice(e[0], e[1])*e[2])+e[3]);
      if (num > 0)  this.trove.push(num + " " + this.coinage[this.coinio][i]);
    });

    for (var i=0; i<this.zeroTwo(); i++) {
      var GEMGEM = this.gemmos[this.tier][this.rollDice(1, 4)-1];
      var NAMENAME = this.gemNames[this.tier][this.rollDice(1, 4)-1][Math.floor(Math.random() * this.gemNames[this.tier].length)].name;
      this.trove.push(this.rollDice(GEMGEM[0], GEMGEM[1]) + " " + NAMENAME + " " + GEMGEM[2]);
    }

    for (var i=0; i<this.zeroTwo(); i++) {
      var c = this.minors[this.tier][Math.floor(Math.random() * this.minors[this.tier].length)];
      this.trove.push(c.name);
    }

    for (var i=0; i<this.zeroTwo(); i++) {
      var randumb = this.rollDice(1, 4);
      var com = "";
      if (randumb == 1 || randumb == 2)  {
        com = this.commons[Math.floor(Math.random() * this.commons.length)];
      } else if (randumb == 3)  {
        var chosen = this.books[Math.floor(Math.random() * this.books.length)];
        com = chosen.name + ", Desc: " + chosen.desc;
      } else {
        var chosen = this.exotics[Math.floor(Math.random() * this.exotics.length)];
        com = chosen.name;
      }
      this.trove.push(com);
    }

    if (this.chanceDrops[this.tier][0] >= this.rollDice(1, 100)) {
      for (var i=0; i<this.zeroTwo(); i++) {
        this.trove.push(this.rollOnTable(this.majors[0]).name);
      }
    }

    if (this.chanceDrops[this.tier][1] >= this.rollDice(1, 100)) {
      for (var i=0; i<this.zeroTwo(); i++) {
        this.trove.push(this.rollOnTable(this.majors[1]).name);
      }
    }

    if (this.chanceDrops[this.tier][2] >= this.rollDice(1, 100)) {
      for (var i=0; i<this.zeroTwo(); i++) {
        this.trove.push(this.rollOnTable(this.majors[2]).name);
      }
    }
  }

  rollDice(dice, faces)  {
    var total = 0;
    for (var i=0; i<dice; i++) 
      total += Math.floor(Math.random() * faces)+1;
    return total;
  }

  bellCurve(dice, faces, additive) {
    return (this.rollDice(dice, faces) + additive)/faces;
  }

  zeroTwo() {
    return Math.floor(this.bellCurve(2, 4, 0));
  }

  rollOnTable(table) {
    var index = 0;
    var rweight = Math.floor(Math.random() * table[table.length-1].weight);
    var prev = 0;
    table.forEach((e, i) => {
      if (rweight >= prev && rweight <= e.weight) {
        index = i;
      }
      prev = e.weight;
    });

    return table[index];
  }
}
