import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MatDialog } from '@angular/material/dialog';

import { ActivatedRoute, ParamMap } from '@angular/router';

import { NgxXml2jsonService } from 'ngx-xml2json';

@Component({
  selector: 'app-trove',
  templateUrl: './trove.component.html',
  styleUrls: ['./trove.component.css']
})
export class TroveComponent implements OnInit {
  private headers = new HttpHeaders(); 
  private audiolocal = 'assets/sounds/';
  private remote = 'https://eaknep3ofh.execute-api.us-east-1.amazonaws.com/bfapi';
  tierList = [{name: "T1(1-4) - Gritty", value: 0}, {name: "T2(5-10) - Heroic", value: 1}, {name: "T3(11-16) - Wuxia", value: 2}, {name: "T4(17+) - Diety", value: 3}];
  cultureList = [{name: "Standard", value: 0}, {name: "Jonapur", value: 1}, {name: "Akros", value: 2}, {name: "Twin Cities", value: 3}];
  audiofiles = [new Audio(this.audiolocal + "gold.wav"), new Audio(this.audiolocal + "ring.wav"), new Audio(this.audiolocal + "flippy.wav"), new Audio(this.audiolocal + "potiondrink.wav"), new Audio(this.audiolocal + "rare.wav"), new Audio(this.audiolocal + "handofgod.wav"), new Audio(this.audiolocal + "portalcast.wav")];

  showpopover = false;

  coinage = [
    ["Copper", "Silver", "Gold", "Platinum", "Platinumx10"],
    ["Copper Pesci", "Silver Pesci", "Silver Serpenti", "Gold Serpenti", "Mithril Serpenti"],
    ["Ses", "Heralds", "Denari", "Crowns", "Divines"],
    ["Papyrus Tablet", "Clay Tablet", "Ivory Tablet", "Gold Tablet", "Electrum Tablet"]
  ];

  tier = this.tierList[0];
  coinio = this.cultureList[0];
  prevseed;
  seed;
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
    //return 'http://localhost:4200/trove/?tier=' + (this.tier.value+1) + '&coin=' + (this.coinio.value+1) + '&seed=' + this.prevseed;
    return 'http://bestiary.xyz/trove/?tier=' + (this.tier.value+1) + '&coin=' + (this.coinio.value+1) + '&seed=' + this.prevseed;
  }

  rollEncounter()  {
    var result = [];
    this.trove = [];
    this.prettyprint = [];

    this.http.get<any[]>(this.remote + '/roll-item' + ((this.seed) ? "/" + this.seed : "") + "?tier=" + (this.tier.value+1)).subscribe(async xml => {
      this.prevseed = xml[0].seed;
      this.seed = null;

      await xml[0].coins.forEach((coin, i) => {
        if (coin>0) result.push({"text": coin + " " + this.coinage[this.coinio.value][i], class: "nonmagic", audio: 0});
      });

      await xml.forEach((e, i) => {
        if (i != 0) {
          console.log(e);
          if (e.key.startsWith("itm.gemmos")) { result.push({"text": e.name, "desc": e.desc, class: "nonmagic", audio: 1}); }
          if (e.key.startsWith("itm.commonitems")) { result.push({"text": e.name, "desc": e.desc, class: "notable", audio: 2}); }
          if (e.key.startsWith("itm.minoritems")) { result.push({"text": e.name, "desc": e.desc, class: "common", audio: 3}); }
          if (e.key.startsWith("itm.majoritemsF")) { result.push({"text": e.name, "desc": e.desc, class: "magic", audio: 4}); }
          if (e.key.startsWith("itm.majoritemsG")) { result.push({"text": e.name, "desc": e.desc, class: "rare", audio: 5}); }
          if (e.key.startsWith("itm.majoritemsH")) { result.push({"text": e.name, "desc": e.desc, class: "legendary", audio: 6}); }
        }
      });
      
      result.forEach(item => {
        this.prettyprint.push(item);
      });

      this.shuffle(result);
  
      for (var i=0; i<result.length; i++)  {
        this.pushToTrove(i, result[i], this.trove, this.audiofiles, this.isChecked);
      }
    });
  }

  pushToTrove(i, item, trove, audio, ischecked) {
    setTimeout(function() {
      trove.push(item);
      if (!ischecked)  audio[item.audio].play();
    }, 150 * i);
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(0.5 * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  reduce(str) {
    return (str && str.length > 200) ? str.substring(0, 200) + "..." : str;
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'interaction.html',
})
export class DialogElementsExampleDialog {}