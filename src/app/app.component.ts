import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bestiaryxyz';
  viewName = '/';

  constructor(private router: Router) {};

  changeOfRoutes()  {
    if  (this.router.url === "/" || this.router.url === "/hero")  {
      this.viewName = "/"
    } else  {
      this.viewName = "/notfound"
    }
  }
}
