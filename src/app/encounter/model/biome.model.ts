import { LevelRange } from './levelrange.model';

export class Biome {
  public order: number;
  public name: string;
  public desc: string;
  public levelranges: LevelRange[];

  constructor(order: number, name: string, desc: string, levelranges: LevelRange[]) {
    this.order = order;
    this.name = name;
    this.desc = desc;
    this.levelranges = levelranges;
  }
}