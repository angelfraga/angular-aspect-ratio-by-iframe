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

  @ViewChild('aspectRatioFrame') aspectRatioFrame: ElementRef<HTMLIFrameElement>;
  @ViewChild('mask') mask: ElementRef<HTMLDivElement>;

  componentDestroyed$ = new Subject();

  ngAfterViewInit() {
    
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  /**
   * example of resizing another element based on resized event
   * btw , we could call render method afterward
   */
  resizeElement(coords: ClientRect | DOMRect, element: HTMLCanvasElement) {
    // element.width = coords.width;
    // element.height = coords.height;
  }
}
