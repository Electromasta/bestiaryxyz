import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ConsoleComponent } from './console/console.component';
import { XgteComponent } from './xgte/xgte.component';
import { DmgComponent } from './dmg/dmg.component';
import { NotfoundComponent } from './notfound/notfound.component';

import { DiceService } from './dice.service';
import { TiylComponent } from './tiyl/tiyl.component';

@NgModule({
  declarations: [
    AppComponent,
    ConsoleComponent,
    XgteComponent,
    DmgComponent,
    NotfoundComponent,
    TiylComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
