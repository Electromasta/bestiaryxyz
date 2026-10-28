import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

// Stands in for the old AWS API (API Gateway -> Lambda -> DynamoDB "BestFriendTable"). The tables are a
// static export in assets/fakeabase, and the rolls are ported from src/assets/lambda/ as they were, quirks
// included, so a shared trove seed still rolls the same treasure.
// Each table's rows carry a cumulative weight: a roll r picks the first row with weight >= r.

const coins = [
  [[6, 6, 100], [3, 6, 100], [2, 6, 10], [0, 0, 0], [0, 0, 0]],
  [[2, 6, 100], [2, 6, 1000], [6, 6, 100], [3, 6, 10], [0, 0, 0]],
  [[0, 0, 0], [0, 0, 0], [4, 6, 1000], [5, 6, 100], [0, 0, 0]],
  [[0, 0, 0], [0, 0, 0], [12, 6, 1000], [8, 6, 1000], [0, 0, 0]]
];

const gemvals = [
  [[2, 6, 10], [2, 6, 10], [2, 4, 25], [2, 6, 50]],
  [[2, 4, 25], [3, 6, 50], [3, 6, 100], [2, 4, 250]],
  [[2, 4, 250], [2, 4, 750], [3, 6, 500], [3, 6, 1000]],
  [[3, 6, 1000], [1, 10, 2500], [1, 4, 7500], [1, 8, 5000]]
];

const chancedrops = [ //out of 100
  [0.15, 0, 0],
  [0.25, 0.05, 0],
  [0.10, 0.25, 0.05],
  [0.10, 0.10, 0.25]
];

const minorchars = ["A", "B", "C", "D", "E"];

@Injectable({
  providedIn: 'root'
})
export class FakeabaseService {
  private tables: Observable<Map<string, any[]>>;
  private seed: number;

  constructor(private http: HttpClient) {
    this.tables = this.http.get<any[]>('assets/fakeabase/BestFriendTable.json').pipe(
      map(rows => {
        const tables = new Map<string, any[]>();
        rows.forEach(row => {
          if (!tables.has(row.key)) tables.set(row.key, []);
          tables.get(row.key).push(row);
        });
        tables.forEach(table => table.sort((a, b) => a.weight - b.weight));
        return tables;
      }),
      shareReplay(1)
    );
  }

  // key is "<biome>.<levelrange>", e.g. "forest.levelrange1-4"
  rollEncounter(key: string): Observable<any> {
    return this.tables.pipe(map(tables => {
      const max = this.maxWeight(tables, "enc." + key);
      const rolled = Math.floor(Math.random() * max);
      return {desc: this.pick(tables, "enc." + key, rolled).name, rolled: rolled, max: max};
    }));
  }

  // Same shape the roll-item Lambda returned: [{seed, coins}, ...items]
  rollItems(tier: number, seed?): Observable<any[]> {
    return this.tables.pipe(map(tables => {
      seed = (seed) ? seed : new Date().getTime();
      this.seed = Number(seed);

      const result: any[] = [{seed: seed, coins: coins[tier-1].map(e => Math.floor(this.rollDice(e[0], e[1])*(e[2])))}];

      // The loop bounds are re-rolled on every pass, as in the Lambda
      for (var i=0; i<this.multiVarDistribution(0.95, 2); i++) {
        var dfour = this.rollDice(1, 4);
        result.push(this.rollOnTable(tables, "gemmos" + tier + "." + dfour, tier-1, dfour-1));
      }

      for (var i=0; i<this.multiVarDistribution(0.75, 2); i++) {
        result.push(this.rollOnTable(tables, "commonitems"));
      }

      for (var i=0; i<this.multiVarDistribution(0.75, 4); i++) {
        result.push(this.rollOnTable(tables, "minoritems" + minorchars[tier]));
      }

      var tiersum = chancedrops[tier-1][0] + chancedrops[tier-1][1] + chancedrops[tier-1][2];
      for (var i=0; i<this.multiVarDistribution(tiersum, 4); i++) {
        var picked = this.random();
        if (picked < (chancedrops[tier-1][0]/tiersum))  {
          result.push(this.rollOnTable(tables, "majoritemsF"));
        } else if (picked < (chancedrops[tier-1][1]/tiersum))  {
          result.push(this.rollOnTable(tables, "majoritemsG"));
        } else if (picked < (chancedrops[tier-1][2]/tiersum))  {
          result.push(this.rollOnTable(tables, "majoritemsH"));
        }
      }

      return result;
    }));
  }

  private maxWeight(tables: Map<string, any[]>, key: string) {
    const table = tables.get(key);
    return table[table.length-1].weight;
  }

  private pick(tables: Map<string, any[]>, key: string, weight: number) {
    return tables.get(key).find(row => row.weight >= weight);
  }

  private rollOnTable(tables: Map<string, any[]>, table: string, tier?: number, dfour?: number) {
    const key = "itm." + table;
    const result = {...this.pick(tables, key, Math.floor(this.random() * this.maxWeight(tables, key)))};

    if (tier !== undefined && dfour !== undefined) {
      var roll = this.rollDice(gemvals[tier][dfour][0], gemvals[tier][dfour][1]);
      result.name = roll + " " + result.name + " worth " + gemvals[tier][dfour][2] + " each";
    }

    return result;
  }

  private rollDice(dice: number, faces: number) {
    var total = 0;
    for (var i=0; i<dice; i++)
      total += Math.ceil(this.random() * faces);
    return total;
  }

  private multiVarDistribution(baseChance: number, face: number) {
    return (this.random() < baseChance) ? this.rollDice(1, face) : 0;
  }

  private random() {
    this.seed ^= this.seed << 21;
    this.seed ^= this.seed >>> 35;
    this.seed ^= this.seed << 4;
    this.seed = Math.abs(this.seed)%1000000000;
    return this.seed/1000000000;
  }
}
