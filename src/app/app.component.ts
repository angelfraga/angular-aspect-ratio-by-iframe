import { Component, VERSION, ViewChild, AfterViewInit, ElementRef, HostBinding, OnDestroy } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  implements AfterViewInit, OnDestroy {

  @HostBinding('class.collapsed') collapsed;

  @ViewChild('aspectRatio') aspectRatio: ElementRef<HTMLIFrameElement>;
  @ViewChild('mask') mask: ElementRef<HTMLDivElement>;

  componentDestroyed$ = new Subject();

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

    fromEvent(this.aspectRatio.nativeElement.contentWindow, 'resize').pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe(() => this.resizeMask(this.mask.nativeElement, aspectRatio));

    this.resizeMask(this.mask.nativeElement, aspectRatio);
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  resizeMask(mask: HTMLDivElement, aspectRatio: HTMLDivElement) {
    const coords = aspectRatio.getBoundingClientRect();
    mask.style.width = coords.width + 'px';
    mask.style.height = coords.height + 'px';
    mask.style.top = coords.top + 'px';
    mask.style.bottom = coords.bottom + 'px';
    mask.style.left = coords.left + 'px';
    mask.style.right = coords.right + 'px';
  }
}
