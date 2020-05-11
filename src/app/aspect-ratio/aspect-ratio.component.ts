import { Component, ViewChild,AfterViewInit, ElementRef, HostBinding, OnDestroy, Input, Output, EventEmitter } from  '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-aspect-ratio',
  templateUrl: './aspect-ratio.component.html',
  styleUrls: ['./aspect-ratio.component.css']
})
export class AspectRatioComponent implements AfterViewInit, OnDestroy {
  aspectRatio = window.document.createElement('div') as HTMLDivElement;
  style = window.document.createElement('style') as HTMLStyleElement;

  @Input() set ratio(ratio: string) {
    this.aspectRatio.setAttribute('data-ratio', ratio);
    if(this.mask) {
      this.resizeMask(this.mask.nativeElement, this.aspectRatio, this.resized);
    }
  }

  @Input() set align(align: string) {
    this.aspectRatio.setAttribute('data-align', align);
    if(this.mask) {
      this.resizeMask(this.mask.nativeElement, this.aspectRatio, this.resized);
    }
  }

  @Output() resized = new EventEmitter<ClientRect | DOMRect>();

  @ViewChild('aspectRatioFrame') aspectRatioFrame: ElementRef<HTMLIFrameElement>;
  @ViewChild('mask') mask: ElementRef<HTMLDivElement>;

  componentDestroyed$ = new Subject();

  constructor() {
    this.ratio = '16/9';
    this.align = 'center';
  }

  ngAfterViewInit() {
    setTimeout(() => {
    this.aspectRatio.classList.add('aspect-ratio');
    this.aspectRatioFrame.nativeElement.contentDocument.body.appendChild(this.style);
    this.aspectRatioFrame.nativeElement.contentDocument.body.appendChild(this.aspectRatio);

    fromEvent(this.aspectRatioFrame.nativeElement.contentWindow, 'resize').pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe(() => this.resizeMask(this.mask.nativeElement, this.aspectRatio, this.resized));

    this.resizeMask(this.mask.nativeElement, this.aspectRatio, this.resized);
    }, 100);

    this.style.textContent = `
      html, body {
        margin: 0;
        padding: 0;
        background: transparent;
      }
      .aspect-ratio {
        margin: auto;
        position: absolute;
        max-height: 100%;
        width: 100vw;
      }

      .aspect-ratio[data-align="center center"] {
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
      }
      .aspect-ratio[data-align="center"] {
        left: 0;
        right: 0;
      }
      .aspect-ratio[data-align="center top"] {
        left: 0;
        right: 0;
        top: 0;
      }
      .aspect-ratio[data-align="center bottom"] {
        left: 0;
        right: 0;
        bottom: 0;
      }
      .aspect-ratio[data-ratio="16/9"] {
        height: 56.25vw;
        max-width: 177.78vh; /* 16/9 = 1.778 */
      }
      .aspect-ratio[data-ratio="4/3"] {
        height: 75vw;
        max-width: 133.33vh; /* 4/3 = 1.33 */
      }
      .aspect-ratio[data-ratio="3/2"] {
        height: 66.66vw;
        max-width: 150vh; /* 3/2 = 1.5 */
      }
    `
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