import { Component, ViewChild,AfterViewInit, ElementRef, HostBinding, OnDestroy, Input, Output, EventEmitter } from  '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-aspect-ratio',
  templateUrl: './aspect-ratio.component.html',
  styleUrls: ['./aspect-ratio.component.css']
})
export class AspectRatioComponent implements AfterViewInit, OnDestroy {
  @Input() ratio: string = '9/16';

  @ViewChild('aspectRatioFrame') aspectRatioFrame: ElementRef<HTMLIFrameElement>;
  @ViewChild('mask') mask: ElementRef<HTMLDivElement>;

  @Output() resized = new EventEmitter<ClientRect | DOMRect>();

  componentDestroyed$ = new Subject();

  constructor() { }

  ngAfterViewInit() {
    setTimeout(() => {

    const aspectRatio = window.document.createElement('div');
    aspectRatio.classList.add('aspect-ratio');
    aspectRatio.setAttribute('data-ratio', '9/16');
    this.aspectRatioFrame.nativeElement.contentDocument.body.innerHTML = `
      <style>
        .aspect-ratio[data-ratio="9/16"] {
          width: 100vw; 
          height: 56.25vw; /* 100/56.25 = 1.778 */
          background: pink;
          max-height: 100%;
          max-width: 177.78vh; /* 16/9 = 1.778 */
          margin: auto;
          position: absolute;
          top:0; /* vertical center */
          bottom:0; /* vertical center */
          left:0;right:0; /* horizontal center */
        }
      </style>
    `;
    this.aspectRatioFrame.nativeElement.contentDocument.body.appendChild(aspectRatio)

    fromEvent(this.aspectRatioFrame.nativeElement.contentWindow, 'resize').pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe(() => this.resizeMask(this.mask.nativeElement, aspectRatio, this.resized));

    this.resizeMask(this.mask.nativeElement, aspectRatio, this.resized);
    }, 100)
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  resizeMask(
    mask: HTMLDivElement,
    aspectRatio: HTMLDivElement, 
    eventEmitter: EventEmitter<ClientRect | DOMRect>
  ) {
    const coords = aspectRatio.getBoundingClientRect();
    mask.style.width = coords.width + 'px';
    mask.style.height = coords.height + 'px';
    mask.style.top = coords.top + 'px';
    mask.style.bottom = coords.bottom + 'px';
    mask.style.left = coords.left + 'px';
    mask.style.right = coords.right + 'px';
    eventEmitter.emit(coords)
  }

}