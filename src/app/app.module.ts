import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list'; 
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; 
import { ClipboardModule } from '@angular/cdk/clipboard'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxXml2jsonModule } from 'ngx-xml2json';

import { EncounterComponent } from './encounter/encounter.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { TroveComponent } from './trove/trove.component';
import { MakerComponent } from './maker/maker.component';
import { HeroComponent } from './hero/hero.component';

@NgModule({
  declarations: [
    AppComponent,
    EncounterComponent,
    NotfoundComponent,
    TroveComponent,
    MakerComponent,
    HeroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule, AppRoutingModule, BrowserAnimationsModule, HttpClientModule,
    ReactiveFormsModule, FormsModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatStepperModule,
    MatDividerModule,
    MatSelectModule,
    MatListModule,
    MatTooltipModule,
    MatSlideToggleModule,
    ClipboardModule,
    FlexLayoutModule,
    NgxXml2jsonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
