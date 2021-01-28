import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Widget } from '../../../model/widget';

@Component({
  selector: 'app-widget-detail-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.sass']
})
export class ExampleComponent implements OnInit {
  @Input()
  widget: Widget;

  exampleCodeTab: string = "angular_code"
  demo: any;

  constructor(private toast: ToastrService) { }

  ngOnInit(): void {
    this.demo = this.widget.createComponent("data");
  }

  public notify(payload: string) {
    console.info(`'${payload}' has been copied to clipboard`);
    this.toast.show("Copied", null, {
      timeOut: 1000,
    });
  }

}
