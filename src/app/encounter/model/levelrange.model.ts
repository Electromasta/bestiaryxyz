import { Encounter } from './encounter.model';

export class LevelRange {
  public order: number;
  public name: string;
  public desc: string;
  public encounters: Encounter[];

  constructor(order: number, name: string, desc: string, encounters: Encounter[]) {
    this.order = order;
    this.name = name;
    this.desc = desc;
    this.encounters = encounters;
  }
}