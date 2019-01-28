import { LevelRange } from './levelrange.model';

export class Biome {
  public index: number;
  public name: string;
  public desc: string;
  public levelranges: LevelRange[];

  constructor(index: number, name: string, desc: string, levelranges: LevelRange[]) {
    this.index = index;
    this.name = name;
    this.desc = desc;
    this.levelranges = levelranges;
  }
}