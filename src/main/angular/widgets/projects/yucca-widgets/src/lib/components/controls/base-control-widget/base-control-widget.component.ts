import { Directive, Input, OnInit } from '@angular/core';
import { BroadcastService } from '../../../services/broadcast.service';

@Directive()
export abstract class BaseControlWidgetComponent implements OnInit {

  @Input() public widgetId: string;

  protected widgetType: string;

  constructor(private broadcastServiceParent: BroadcastService) { }

  ngOnInit(): void {
  }

}
