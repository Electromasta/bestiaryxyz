export class Encounter {
  public start: number;
  public end: number;
  public desc: string;

  constructor(start: number, end: number, desc: string) {
    this.start = start;
    this.end = end;
    this.desc = desc;
  }
}