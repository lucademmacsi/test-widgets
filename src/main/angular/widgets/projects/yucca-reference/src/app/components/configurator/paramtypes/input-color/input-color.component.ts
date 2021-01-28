import { Component } from '@angular/core';
import { AbstractParamTypeComponent } from '../abstract-param-type/abstract-param-type.component';

@Component({
  selector: 'yucca-input-color',
  templateUrl: './input-color.component.html',
  styleUrls: ['./input-color.component.sass']
})
export class InputColorComponent extends AbstractParamTypeComponent {

  constructor() { super(); }

  getValue() {
    this.value = this.value.toString();
  };


}
