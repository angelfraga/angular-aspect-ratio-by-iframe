import { Component  } from '@angular/core';

@Component({
  selector: 'app-example-single-wrapper',
  templateUrl: './example-single-wrapper.component.html',
  styleUrls: ['./example-single-wrapper.component.css']
})
export class ExampleSingleWrapperComponent {
  ratio: string = '16/9';
  align: string = 'center center';
}
