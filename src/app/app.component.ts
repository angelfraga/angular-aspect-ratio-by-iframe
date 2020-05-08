import { Component, VERSION, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  implements AfterViewInit {
  @ViewChild('aspectRatio') aspectRatio: ElementRef<HTMLIFrameElement>;

  ngAfterViewInit() {
    this.aspectRatio.nativeElement.contentDocument.body.innerHTML = `
      <style>
        .aspect-ratio[data-ratio="9/16"] {
          background: silver;
          width: 100vw; 
          height: 56.25vw; /* 100/56.25 = 1.778 */
          background: pink;
          max-height: 100%;
          max-width: 177.78vh; /* 16/9 = 1.778 */
          margin: auto;
          position: absolute;
          top:0;bottom:0; /* vertical center */
          left:0;right:0; /* horizontal center */
        }
      </style>
      <div class="aspect-ratio" data-ratio="9/16"></div>
    `;
  }
}
