import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { Section28Component } from './section-2-8/section-2-8.component';
import { StarbucksCoffeeProjectComponent } from './starbucks-coffee-project/starbucks-coffee-project.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, Section28Component, StarbucksCoffeeProjectComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
