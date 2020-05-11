import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AspectRatioComponent } from './aspect-ratio/aspect-ratio.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, AspectRatioComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
