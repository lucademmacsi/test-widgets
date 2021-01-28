import { Component, OnInit } from '@angular/core';
import { AbstractParamTypeComponent } from '../abstract-param-type/abstract-param-type.component';

@Component({
  selector: 'app-input-boolean',
  templateUrl: './input-boolean.component.html',
  styleUrls: ['./input-boolean.component.sass']
})
export class InputBooleanComponent extends AbstractParamTypeComponent {

  constructor() { super(); }

  getValue() { }

}
