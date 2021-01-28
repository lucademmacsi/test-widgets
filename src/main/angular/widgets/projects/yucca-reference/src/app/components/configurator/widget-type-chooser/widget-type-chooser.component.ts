import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Widgets } from '../../../configuration/widgets';

@Component({
  selector: 'app-widget-type-chooser',
  templateUrl: './widget-type-chooser.component.html',
  styleUrls: ['./widget-type-chooser.component.sass']
})
export class WidgetTypeChooserComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  Widgets = Widgets;

  ngOnInit(): void {
  }

  selectWidget(section, key): void {
    console.debug("selectWidget", section, key);
    this.activeModal.close({ "section": section, "widget": Widgets[section][key] });
  }

  close() {
    this.activeModal.dismiss();
  }

}
