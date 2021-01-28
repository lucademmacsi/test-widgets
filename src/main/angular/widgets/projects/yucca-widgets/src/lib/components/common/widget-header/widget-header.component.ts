import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'yucca-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {
  @Input() public widgetTitle: string;
  @Input() public widgetSubtitle: string;
  @Input() public widgetIntro: string;

  constructor() { }

  ngOnInit(): void {
  }

}
