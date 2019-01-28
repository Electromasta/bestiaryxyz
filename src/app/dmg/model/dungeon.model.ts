export class Dungeon {
  public start: number;
  public end: number;
  public title: string;
  public desc: string;

  constructor(start: number, end: number, title: string, desc: string) {
    this.start = start;
    this.end = end;
    this.title = title;
    this.desc = desc;
  }
}