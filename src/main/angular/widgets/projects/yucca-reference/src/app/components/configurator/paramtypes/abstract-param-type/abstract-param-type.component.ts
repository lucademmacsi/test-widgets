import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-abstract-param-type',
  templateUrl: './abstract-param-type.component.html',
  styleUrls: ['./abstract-param-type.component.sass']
})
export abstract class AbstractParamTypeComponent implements OnInit {
  @Input() widget;
  @Input() p;
  @Input() s;
  @Input() modalParams;
  @Output() applied = new EventEmitter<any>();

  value: any;

  constructor() { }

  ngOnInit(): void {
  }

  abstract getValue();

  apply() {
    console.debug("apply");
    this.getValue();
    console.debug("apply, value", this.value);

    this.applied.emit(this.value);
  }
}
