import { Component, VERSION, ViewChild, AfterViewInit, ElementRef, HostBinding } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  implements AfterViewInit {

  @HostBinding('class.collapsed') collapsed;

  @ViewChild('aspectRatio') aspectRatio: ElementRef<HTMLIFrameElement>;
  @ViewChild('mask') mask: ElementRef<HTMLDivElement>;

  ngAfterViewInit() {
    const aspectRatio = window.document.createElement('div');
    aspectRatio.classList.add('aspect-ratio');
    aspectRatio.setAttribute('data-ratio', '9/16');
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
          top:0; /* vertical center */
          left:0;right:0; /* horizontal center */
        }
      </style>
    `;
    this.aspectRatio.nativeElement.contentDocument.body.appendChild(aspectRatio)

    this.aspectRatio.nativeElement.contentWindow.onresize = () => {
      const coords = aspectRatio.getBoundingClientRect();
      this.mask.nativeElement.style.width = coords.width + 'px';
      this.mask.nativeElement.style.height = coords.height + 'px';
      this.mask.nativeElement.style.top = coords.top + 'px';
      this.mask.nativeElement.style.bottom = coords.bottom + 'px';
      this.mask.nativeElement.style.left = coords.left + 'px';
      this.mask.nativeElement.style.right = coords.right + 'px';
    }
  }
}
