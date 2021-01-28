import { Component, Input, OnInit } from '@angular/core';
import { Widget } from '../../../model/widget';
import { UtilService } from '../../../services/util.service';

@Component({
  selector: 'app-widget-detail-styles',
  templateUrl: './styles.component.html',
  styleUrls: ['./styles.component.sass']
})
export class StylesComponent implements OnInit {

  @Input()
  widget: Widget;

  styles: any;

  constructor() { }

  ngOnInit(): void {
    this.styles = this.widget.getStylesGrouped();

  }

  formatCssValues(o: string): string {
    return UtilService.formatCssValues(o);
  }
  formatCssSelector(o: string): string {
    return UtilService.formatCssSelector(o);
  }

}
