import { Component, Input, OnInit } from '@angular/core';
import { DebugMessages } from '../../../model/debug-messages';

@Component({
  selector: 'yucca-widget-footer',
  templateUrl: './widget-footer.component.html',
  styleUrls: ['./widget-footer.component.css']
})
export class WidgetFooterComponent implements OnInit {

  @Input() debugMessages: DebugMessages;
  @Input() widgetFooter: string;
  @Input() debug: boolean;


  constructor() { }

  ngOnInit(): void {
  }

}
