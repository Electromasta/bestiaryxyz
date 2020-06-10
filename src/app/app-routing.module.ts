import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EncounterComponent } from './encounter/encounter.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { TroveComponent } from './trove/trove.component';
import { MakerComponent } from './maker/maker.component';
import { HeroComponent } from './hero/hero.component';


const routes: Routes = [
  {path: '', component: HeroComponent},
  {path: 'encounter', component: EncounterComponent},
  {path: 'trove', component: TroveComponent},
  {path: 'maker', component: MakerComponent},
  {path: 'hero', component: HeroComponent},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
