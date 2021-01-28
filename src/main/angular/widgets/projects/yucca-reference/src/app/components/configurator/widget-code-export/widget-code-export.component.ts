import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Widget } from '../../../model/widget';

@Component({
  selector: 'app-widget-code-export',
  templateUrl: './widget-code-export.component.html',
  styleUrls: ['./widget-code-export.component.sass']
})
export class WidgetCodeExportComponent implements OnInit {

  @Input() widget: Widget;

  codeTab: string = "angular_code";
  demo: any;
  constructor(public activeModal: NgbActiveModal, private toast: ToastrService) { }

  ngOnInit(): void {
    console.debug("widget", this.widget);
    //let paramValues = {};
    //Object.keys(this.widget.params).forEach(s => {
    //  paramValues[s] = this.widget.params[s].demo
    //});
    const liveComponent = this.widget.createComponent("data", false);
    this.demo = liveComponent;
  }

  notify(payload: string) {
    console.info(`'${payload}' has been copied to clipboard`);
    this.toast.show("Copied", null, {
      timeOut: 1000,
    });
  }
  close(): void {
    this.activeModal.dismiss();
  }
}
