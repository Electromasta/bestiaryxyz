import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DiceService {

  roll(faces, dice)  {
    return Math.floor((Math.random() * faces)) * dice;
  }

  constructor() { }
}
