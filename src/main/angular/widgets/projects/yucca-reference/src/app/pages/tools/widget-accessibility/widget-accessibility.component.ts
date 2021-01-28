import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-widget-accessibility',
  templateUrl: './widget-accessibility.component.html',
  styleUrls: ['./widget-accessibility.component.sass']
})
export class WidgetAccessibilityComponent implements OnInit {

  constructor(private sanitizer: DomSanitizer) { }

  htmlContent: any;

  ngOnInit(): void {
    this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(history.state.data);
  }
}
