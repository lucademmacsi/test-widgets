import { Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WidgetParams } from '../../../configuration/params';

@Component({
  selector: 'app-widget-param-config',
  templateUrl: './widget-param-config.component.html',
  styleUrls: ['./widget-param-config.component.sass']
})
export class WidgetParamConfigComponent implements OnInit {

  @ViewChild('container', { read: ViewContainerRef, static: true }) container: ViewContainerRef;
  @Input() widget;
  @Input() p;
  @Input() s;
  @Input() modalParams;



  value: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    let component = WidgetParams.paramTypes[this.p.value.type].component;
    if (!component)
      component = WidgetParams.paramTypes["inputText"].component;

    let componentRef: ComponentRef<any>;
    const factory = this.componentFactoryResolver.resolveComponentFactory(component);
    componentRef = this.container.createComponent(factory);
    componentRef.instance.widget = this.widget;
    componentRef.instance.s = this.s;
    componentRef.instance.p = this.p;
    componentRef.instance.value = this.p.value.demo;
    componentRef.instance.modalParams = this.modalParams;
    componentRef.instance.applied.subscribe(val => this.value = val);
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  save(): void {
    console.debug(this.value);
    this.activeModal.close(this.value);
  }
}
