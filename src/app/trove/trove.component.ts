import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { NgxXml2jsonService } from 'ngx-xml2json';

import { MatSelectChange } from '@angular/material/select';

//const seedrandom = require('seedrandom');

@Component({
  selector: 'app-trove',
  templateUrl: './trove.component.html',
  styleUrls: ['./trove.component.css']
})
export class TroveComponent implements OnInit {
  private headers = new HttpHeaders(); 
  private filelocal = 'assets/booklet/loottables/';
  private audiolocal = 'assets/sounds/';
  tierList = [{name: "T1(1-4) - Gritty", value: 0}, {name: "T2(5-10) - Heroic", value: 1}, {name: "T3(11-16) - Wuxia", value: 2}, {name: "T4(17+) - Diety", value: 3}];
  cultureList = [{name: "Standard", value: 0}, {name: "Jonapur", value: 1}, {name: "Akros", value: 2}, {name: "Twin Cities", value: 3}];
  worldTendancyList = ["Black", "Blue", "White", "Red", "Green"];
  audiofiles = [new Audio(this.audiolocal + "gold.wav"), new Audio(this.audiolocal + "ring.wav"), new Audio(this.audiolocal + "flippy.wav"), new Audio(this.audiolocal + "potiondrink.wav"), new Audio(this.audiolocal + "rare.wav"), new Audio(this.audiolocal + "handofgod.wav"), new Audio(this.audiolocal + "portalcast.wav")];

  seed = new Date().getTime();
  prevseed = this.seed;
  showpopover = false;

  coins = [
    [[6, 6, 100], [3, 6, 100], [2, 6, 10], [0, 0, 0], [0, 0, 0]],
    [[2, 6, 100], [2, 6, 1000], [6, 6, 100], [3, 6, 10], [0, 0, 0]],
    [[0, 0, 0], [0, 0, 0], [4, 6, 1000], [5, 6, 100], [0, 0, 0]],
    [[0, 0, 0], [0, 0, 0], [12, 6, 1000], [8, 6, 1000], [0, 0, 0]]
  ];

  coinage = [
    ["Copper", "Silver", "Gold", "Platinum", "Platinumx10"],
    ["Copper Pesci", "Silver Pesci", "Silver Serpenti", "Gold Serpenti", "Mithril Serpenti"],
    ["Ses", "Heralds", "Denari", "Crowns", "Divines"],
    ["Papyrus Tablet", "Clay Tablet", "Ivory Tablet", "Gold Tablet", "Electrum Tablet"]
  ];

  gemvals = [
    [[2, 6, 10], [2, 6, 10], [2, 4, 25], [2, 6, 50]],
    [[2, 4, 25], [3, 6, 50], [3, 6, 100], [2, 4, 250]],
    [[2, 4, 250], [2, 4, 750], [3, 6, 500], [3, 6, 1000]],
    [[3, 6, 1000], [1, 10, 2500], [1, 4, 7500], [1, 8, 5000]]
  ];

  chanceDrops = [ //out of 100
    [0.15, 0, 0],
    [0.25, 0.05, 0],
    [0.10, 0.25, 0.05],
    [0.10, 0.10, 0.25]
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

  tier = this.tierList[0];
  coinio = this.cultureList[0];
  multi = 1;
  isChecked = false;

  trove = [];
  prettyprint = [];
  runningTotal = 0;

  constructor(private http: HttpClient, private ngxXml2jsonService: NgxXml2jsonService, private route: ActivatedRoute, public dialog: MatDialog) { 
    this.headers = this.headers.append('Content-Type', 'text/xml');
    this.headers = this.headers.append('Accept', 'text/xml');

    this.audiofiles.forEach(a => {
      a.volume = 0.3;
    });

    for (var i=0; i<this.files.length; i++) {
      this.getTable(i);
    }

    this.route.queryParams.subscribe(params => {
      if (params['tier']) {
        this.tier = (params['tier']) ? this.tierList[params['tier']-1] : this.tierList[0];
        this.coinio = (params['coin']) ? this.cultureList[params['coin']-1] : this.cultureList[0];
        this.seed = params['seed'];
        this.openDialog();
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.rollEncounter();
    });
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
      "type": (item != null) ? item.type : "",
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

  copyToClipboard() {
    return 'http://localhost:4200/trove/?tier=' + (this.tier.value+1) + '&coin=' + (this.coinio.value+1) + '&seed=' + this.prevseed;
    //return 'http://bestiary.xyz/trove/?tier=' + (this.tier.value+1) + '&coin=' + (this.coinio.value+1) + '&seed=' + this.prevseed;
  }

  rollEncounter()  {
    var coinTier = this.coins[this.tier.value];
    var result = [];
    this.trove = [];
    this.prettyprint = [];

    this.prevseed = this.seed;

    coinTier.forEach((e, i) =>{
      var num = ((this.rollDice(e[0], e[1])*(e[2])));
      if (num > 0)  result.push({"text": Math.floor(num) + " " + this.coinage[this.coinio.value][i], class: "nonmagic", audio: 0});
    });

    for (var i=0; i<this.multiVarDistribution(0.95, 2); i++) {
      var GEMGEM = this.gemvals[this.tier.value][this.rollDice(1, 4)-1];
      var NAMENAME = this.gemmos[this.tier.value][this.rollDice(1, 4)-1][Math.floor(this.random() * this.gemmos[this.tier.value].length)].name;
      result.push({"text": this.rollDice(GEMGEM[0], GEMGEM[1]) + " " + NAMENAME + ", worth " + GEMGEM[2] + " each", class: "nonmagic", audio: 1});
    }

    for (var i=0; i<this.multiVarDistribution(0.75, 2); i++) {
      var select = this.rollDice(1, 4)-1;
      var item = this.commonDistri[select][Math.floor(this.random() * this.commonDistri[select].length)]
      result.push({"text": item.name, "desc": ((item.desc != null && item.desc.length > 0) ? item.desc : ""), class: "notable", audio: 2});
    }

    for (var i=0; i<this.multiVarDistribution(0.75, 6); i++) {
      var c = this.minoritems[0][this.tier.value][Math.floor(this.random() * this.minoritems[0][this.tier.value].length)];
      result.push({"text": c.name, class: "common", audio: 3});
    }

    var tierSum = this.chanceDrops[this.tier.value][0] + this.chanceDrops[this.tier.value][1] + this.chanceDrops[this.tier.value][2];
    for (var i=0; i<this.multiVarDistribution(tierSum, 4); i++) {
      var picked = this.random();
      if (picked < (this.chanceDrops[this.tier.value][0]/tierSum))  {
        var item = this.rollOnTable(this.majoritems[0][0]);
        result.push({"text": item.name, "type": item.type, "desc": item.desc, "class": "magic", "audio": 4});
      } else if (picked < (this.chanceDrops[this.tier.value][1]/tierSum))  {
        var item = this.rollOnTable(this.majoritems[0][1]);
        result.push({"text": item.name, "type": item.type, "desc": item.desc, "class": "rare", "audio": 5});
      } else if (picked < (this.chanceDrops[this.tier.value][2]/tierSum))  {
        var item = this.rollOnTable(this.majoritems[0][2]);
        result.push({"text": item.name, "type": item.type, "desc": item.desc, "class": "legendary", "audio": 6});
      }
    }

    result.forEach(item => {
      this.prettyprint.push(item);
    });

    this.shuffle(result);

    for (var i=0; i<result.length; i++)  {
      this.pushToTrove(i, result[i], this.trove, this.audiofiles, this.isChecked);
    }
    
  }

  pushToTrove(i, item, trove, audio, ischecked) {
    var namespace = this;
    setTimeout(function() {
      trove.push(item);
      if (!ischecked)  audio[item.audio].play();
    }, 150 * i);
  }

  rollDice(dice, faces)  {
    var total = 0;
    for (var i=0; i<dice; i++) 
      total += Math.ceil(this.random() * faces);
    return total;
  }

  multiVarDistribution(baseChance, face) {
    var result = 0;
    for (var i=0; i<this.multi; i++) {
      result += (this.random() < baseChance) ? this.rollDice(1, face) : 0;
    }
    return result;
  }

  rollOnTable(table) {
    var index = 0;
    var rweight = Math.floor(this.random() * table[table.length-1].weight);
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
      randomIndex = Math.floor(this.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  random()  {
    this.seed ^= this.seed << 21;
    this.seed ^= this.seed >>> 35;
    this.seed ^= this.seed << 4;
    this.seed = Math.abs(this.seed)%1000000000;
    return this.seed/1000000000;
  }
}


@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'interaction.html',
})
export class DialogElementsExampleDialog {}