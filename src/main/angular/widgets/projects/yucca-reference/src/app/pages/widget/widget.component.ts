import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Compiler, Component, ComponentFactoryResolver, NgModule, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { YuccaWidgetsModule } from '../../../../../yucca-widgets/src/lib/yucca-widgets.module';
import { Widgets } from '../../configuration/widgets';
import { Widget } from '../../model/widget';
import { UtilService } from '../../services/util.service';
import { YuccaMetadataService } from '../../services/yucca-metadata.service';
import { WidgetParams } from '../../configuration/params';
import { ToastrService } from 'ngx-toastr';
import { faUniversalAccess, faWrench } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.sass']
})

export class WidgetComponent implements OnInit {

  faUniversalAccess = faUniversalAccess;
  faWrench = faWrench;

  widget: Widget;
  datasetMetadata: any;
  public demo: any;
  public params: any;
  public styles: any;
  section: string = "section_overview";

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(private route: ActivatedRoute, private compiler: Compiler, protected cdr: ChangeDetectorRef, private router: Router, private toast: ToastrService,
    private cfr: ComponentFactoryResolver, private yuccaMetadataService: YuccaMetadataService) { }

  ngOnInit(): void {
    let sub = this.route.params.subscribe(params => {
      this.widget = Widgets[params['widgetSectionKey']][params['widgetKey']];

    });
  }

  public ngAfterViewInit() {
    setTimeout(() => {
      this.params = this.widget.getParamsGrouped();
      this.styles = this.widget.getStylesGrouped();
      this.demo = this.widget.createComponent("data");
      if (!this.widget.getRelatedWidget()) {
        this.yuccaMetadataService.loadDatasetMetadata(this.demo.data[WidgetParams.param_tenantcode.name],
          this.demo.data[WidgetParams.param_datasetcode.name],
          this.demo.data[WidgetParams.param_usertoken.name]).subscribe((data: any) => {
            console.debug('load dataset metadata result', data);
            if (data && data.dataset) {
              this.datasetMetadata = data.dataset;
            }
          }, error => {
            console.log(error);
          })
      }
      let code = this.demo.code;
      let style = this.demo.style;
      let data = this.demo.data;
      let relatedData = null;
      const relateWidgetKey = this.widget.getRelatedWidget();
      if (relateWidgetKey) {
        const relatedWidget = Widgets[relateWidgetKey.section][relateWidgetKey.widget];
        let demoRelated = relatedWidget.createComponent("related");
        code += "<div class='dynamic-widget-related'>" + demoRelated.code + "</div>";
        relatedData = demoRelated.data;

      }
      this.addComponent(code, style, data, relatedData);
    });
  }

  openAccessibilityPage() {
    const widgetCode = document.getElementById("dynamic-widget-container").innerHTML;
    this.router.navigate(['/tools/widget/accessibility'], { state: { data: widgetCode } });
  }

  formatJsObject(o: string): string {
    return UtilService.formatJsObject(o);
  }

  public notify(payload: string) {
    console.info(`'${payload}' has been copied to clipboard`);
    this.toast.show("Copied", null, {
      timeOut: 1000,
    });
  }

  private addComponent(template: string, style: any, data: any, relatedData: any) {
    console.debug("template", template);
    console.debug("style", style);
    console.debug("data", data);
    console.debug("relateData", relatedData);
    class TemplateComponent {

      @ViewChild('target', { static: false, read: ViewContainerRef }) public target;

      data: any;
      related: any;
      constructor() {
        setTimeout(() => {
          this.data = data;
          this.related = relatedData;
        });
      }
    }

    class TemplateModule {
      @ViewChild('target', { static: false, read: ViewContainerRef }) public target;
    }

    const componentType = Component({ template: template + '<div #target style="width:100%"></div>', styles: [style] })(TemplateComponent)

    const componentModuleType = NgModule({
      declarations: [componentType], imports: [
        CommonModule,
        BrowserModule,
        YuccaWidgetsModule]
    })(TemplateModule)

    const mod = this.compiler.compileModuleAndAllComponentsSync(componentModuleType);
    const factory = mod.componentFactories.find((comp) =>
      comp.componentType === componentType
    );
    this.container.createComponent(factory);
  }

  public scrollToId(id: string) {
    let element = document.querySelector("#" + id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }



}
