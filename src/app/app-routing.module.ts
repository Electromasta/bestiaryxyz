import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleComponent } from './console/console.component';
import { XgteComponent } from './xgte/xgte.component';
import { DmgComponent } from './dmg/dmg.component';
import { TiylComponent } from './tiyl/tiyl.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  {path: '', component: ConsoleComponent},
  {path: 'console', component: ConsoleComponent},
  {path: 'xgte', component: XgteComponent},
  {path: 'dmg', component: DmgComponent},
  {path: 'tiyl', component: TiylComponent},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
