import { Component, Input, OnInit } from '@angular/core';
import { Widget } from '../../../model/widget';
import { UtilService } from '../../../services/util.service';

@Component({
  selector: 'app-widget-detail-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.sass']
})
export class ParamsComponent implements OnInit {

  @Input()
  widget: Widget;

  params: any;

  constructor() { }

  ngOnInit(): void {
    this.params = this.widget.getParamsGrouped();

  }
  formatJsObject(o: string): string {
    return UtilService.formatJsObject(o);
  }


}
