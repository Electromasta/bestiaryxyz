import { Encounter } from './encounter.model';

export class LevelRange {
  public index: number;
  public name: string;
  public desc: string;
  public encounters: Encounter[];

  constructor(index: number, name: string, desc: string, encounters: Encounter[]) {
    this.index = index;
    this.name = name;
    this.desc = desc;
    this.encounters = encounters;
  }
}