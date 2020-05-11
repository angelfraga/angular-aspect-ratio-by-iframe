import { Component } from '@angular/core';

@Component({
  selector: 'app-example-one',
  templateUrl: './example-one.component.html',
  styleUrls: ['./example-one.component.css']
})
export class ExampleOneComponent {
  /**
   * example of resizing another element based on resized event
   * btw , we could call render method afterward
   */
  resizeElement(coords: ClientRect | DOMRect, element: HTMLCanvasElement) {
    // element.width = coords.width;
    // element.height = coords.height;
  }
}