import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AspectRatioComponent } from './aspect-ratio/aspect-ratio.component';
import { ExampleOneComponent } from './example-one/example-one.component';
import { RouterModule } from '@angular/router';
import { ExampleSingleWrapperComponent } from './example-single-wrapper/example-single-wrapper.component';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component:  ExampleSingleWrapperComponent }
    ])
  ],
  declarations: [ AppComponent, AspectRatioComponent, ExampleOneComponent, ExampleSingleWrapperComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
