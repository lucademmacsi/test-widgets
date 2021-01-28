import { Component, Input, OnInit } from '@angular/core';
import { Widget } from '../../../model/widget';

@Component({
  selector: 'app-widget-detail-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.sass']
})
export class OverviewComponent implements OnInit {


  @Input()
  widget: Widget;

  constructor() { }

  ngOnInit(): void {
  }

}
