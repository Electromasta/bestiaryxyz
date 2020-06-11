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
  troveTypeList = [{name: "Individual", value: 0.2}, {name: "Trove", value: 1}, {name: "Double Trove", value: 2}, {name: "TRIPLE Trove", value: 3}];

  coins = [
    [[12, 6, 100, 0], [6, 6, 100, 0], [4, 6, 10, 0], [2, 6, 1, -4], [1, 6, 0, 0]],
    [[2, 6, 100, 0], [2, 6, 1000, 0], [2, 4, 100, 0], [2, 4, 10, 0], [1, 6, 0, 0]],
    [[1, 6, 0, 0], [2, 6, 100, 0], [6, 6, 100, 0], [2, 6, 10, 0], [2, 6, 1, -4]],
    [[1, 6, 0, 0], [2, 6, 100, 0], [12, 6, 100, 0], [2, 6, 100, 0], [2, 6, 1, 0]]
  ];

  icoins = [
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

  gemvals = [
    [[2, 6, 10], [2, 6, 10], [2, 6, 25], [2, 6, 50]],
    [[2, 4, 25], [2, 6, 50], [2, 6, 100], [1, 4, 250]],
    [[2, 4, 250], [1, 4, 750], [2, 4, 500], [1, 6, 1000]],
    [[1, 6, 1000], [1, 4, 2500], [1, 4, 7500], [1, 4, 5000]]
  ];

  chanceDrops = [ //out of 100
    [35, 0, 0],
    [45, 5, 0],
    [5, 25, 5],
    [5, 5, 15]
  ];

  gemmos = [];
  books = [];
  exotics = [];
  commonitems = [];
  tradegoods = [];
  minoritems = [];
  majoritems = [];

  files = ["gemmos", "books", "exotics", "commonitems", "tradegoods", "minoritems", "majoritems"];
  data = [this.gemmos, this.books, this.exotics, this.commonitems, this.tradegoods, this.minoritems, this.majoritems];
  commonDistri = [this.commonitems, this.commonitems, this.exotics, this.books];

  tier = 0;
  coinio = 0;
  multi = 1;
  trove = [];

  constructor(private http: HttpClient, private ngxXml2jsonService: NgxXml2jsonService) { 
    this.headers = this.headers.append('Content-Type', 'text/xml'); 
    this.headers = this.headers.append('Accept', 'text/xml');

    for (var i=0; i<this.files.length; i++) {
      this.getTable(i);
    }
    console.log(this.data);
  }

  getTable(index)  {
    this.http.get(this.filelocal + this.files[index] + ".xml", {responseType: 'text'}).subscribe(xml => {
      var json = this.read(xml);

      if (json["tables"] != null)  this.arrayify(json["tables"].table).forEach(table => {
        var ntable = [];

        table.list.forEach(list => {
          var nlist = [];

          var weighttotal = 0;
          list.item.forEach(item => {
            weighttotal += (item.weight) ? Number(item.weight) : 1;
            nlist.push(this.makeItem(item, weighttotal));
          });
          ntable.push(nlist);
        });
        this.data[index].push(ntable);
      });

      var weighttotal = 0;
      if (json["tables"] == null && json["list"] != null)  this.arrayify(json["list"].item).forEach(item => {
        weighttotal += (item.weight) ? Number(item.weight) : 1;
        this.data[index].push(this.makeItem(item, weighttotal));
      });

    });
  }

  makeItem(item, weight)   {
    return {
      "name": (item != null) ? item.name : "",
      "desc": (item != null) ? item.desc : "",
      "price": (item != null) ? item.price : "",
      "weight": weight
    };
  }

  arrayify(x)  {
    if (x != undefined && x.length == undefined)  {
      var temp = new Array();
      temp.push(x);
      x = temp;
    }
    return x;
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

  multiChanged(selectChangeEvent: MatSelectChange)  {
    this.multi = selectChangeEvent.value;
  }

  rollEncounter()  {
    var coinTier = this.coins[this.tier];
    this.trove = [];

    if (this.multi != 0.2)  {
      coinTier.forEach((e, i) =>{
        var num = ((this.rollDice(e[0], e[1])*e[2])+e[3]);
        if (num > 0)  this.trove.push({"text": Math.floor(num) + " " + this.coinage[this.coinio][i], class: "nonmagic" });
      });
    }

    for (var i=0; i<this.multiVarDistribution(100); i++) {
      var GEMGEM = this.gemvals[this.tier][this.rollDice(1, 4)-1];
      var NAMENAME = this.gemmos[this.tier][this.rollDice(1, 4)-1][Math.floor(Math.random() * this.gemmos[this.tier].length)].name;
      this.trove.push({"text": this.rollDice(GEMGEM[0], GEMGEM[1]) + " " + NAMENAME + ", worth " + GEMGEM[2] + " each", class: "nonmagic" });
    }

    for (var i=0; i<this.multiVarDistribution(100); i++) {
      var select = this.rollDice(1, 4)-1;
      var item = this.commonDistri[select][Math.floor(Math.random() * this.commonDistri[select].length)]
      this.trove.push({"text": item.name + ((item.desc != null && item.desc.length > 0) ? (": " + item.desc) : ""), class: "notable" });
    }

    for (var i=0; i<this.multiVarDistribution(100); i++) {
      var c = this.minoritems[0][this.tier][Math.floor(Math.random() * this.minoritems[0][this.tier].length)];
      this.trove.push({"text": c.name, class: "common" });
    }

    for (var i=0; i<this.multiVarDistribution(this.chanceDrops[this.tier][0]); i++) {
      this.trove.push({"text": this.rollOnTable(this.majoritems[0][0]).name, class: "magic" });
    }

    for (var i=0; i<this.multiVarDistribution(this.chanceDrops[this.tier][1]); i++) {
      this.trove.push({"text": this.rollOnTable(this.majoritems[0][1]).name, class: "rare" });
    }

    for (var i=0; i<this.multiVarDistribution(this.chanceDrops[this.tier][2]); i++) {
      this.trove.push({"text": this.rollOnTable(this.majoritems[0][2]).name, class: "legendary" });
    }

    this.shuffle(this.trove);
  }

  rollDice(dice, faces)  {
    var total = 0;
    for (var i=0; i<dice; i++) 
      total += Math.floor(Math.random() * faces)+1;
    return total;
  }

  multiVarDistribution(baseChance) {
    var result = Math.floor( ( (baseChance * this.multi) + this.rollDice(1, 100) -1 ) / 100);
    if (result>0)  result += Math.floor((10 + this.rollDice(1, 100)-1) / 100);
    return result;
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

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
}
