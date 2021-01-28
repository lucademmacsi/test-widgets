import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractParamTypeComponent } from '../abstract-param-type/abstract-param-type.component';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.sass']
})
export class InputTextComponent extends AbstractParamTypeComponent {


  constructor() { super(); }

  getValue() { }



}
