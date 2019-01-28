import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {};
  title = 'bestiaryxyz';
  viewName = ' /';

  changeOfRoutes()  {
    if  (this.router.url === "/dmg")
      this.viewName = " /Dungeon Masters Guide";
    if  (this.router.url === "/xgte")
      this.viewName = " /Xanathar's Guide to Everything";
    if  (this.router.url === "/tiyl")
      this.viewName = " /This is Your Life";
    if  (this.router.url === "/console")
      this.viewName = " /Console Test Bed";
  }
}
