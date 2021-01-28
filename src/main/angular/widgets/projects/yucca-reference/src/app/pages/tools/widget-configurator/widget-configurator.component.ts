import { Compiler, Component, ElementRef, NgModule, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WidgetParamConfigComponent } from '../../../components/configurator/widget-param-config/widget-param-config.component';
import { WidgetTypeChooserComponent } from '../../../components/configurator/widget-type-chooser/widget-type-chooser.component';
import { Widget } from '../../../model/widget';
import { faAngleDown, faAngleUp, faCode, faSave, faFolderOpen, faQuestion, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { YuccaWidgetsModule } from '../../../../../../yucca-widgets/src/lib/yucca-widgets.module';
import { WidgetCodeExportComponent } from '../../../components/configurator/widget-code-export/widget-code-export.component';
import { WidgetParams } from '../../../configuration/params';
import { Constants } from '../../../app.constants';
import { Widgets } from '../../../configuration/widgets';
import { UtilService } from '../../../services/util.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-widget-configurator',
  templateUrl: './widget-configurator.component.html',
  styleUrls: ['./widget-configurator.component.sass']
})
export class WidgetConfiguratorComponent implements OnInit {

  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  faCode = faCode;
  faSave = faSave;
  faEdit = faEdit;
  faCheck = faCheck;
  faFolderOpen = faFolderOpen;
  faQuestion = faQuestion;
  w: Widget;
  params: any;

  currentConfiguration: { title: string, date?: string, widgetSection?: string, widgetType?: string, widgetParamValues?: any };
  recentConfigurations: Array<string> = [];
  toolbarSetting = { "loadDropdown": false, "renameConfigurationTitle": false };
  showHelp = false;

  configTab: string = "params";
  configTabSections: any = {};

  @ViewChild('widgetLive', { read: ViewContainerRef }) widgetLiveContainer: ViewContainerRef;
  // @ViewChild("openFileInput", { static: false }) openFileInput: ElementRef;

  // openFileInputSubscription: Subscription = new Subscription();

  constructor(public modal: NgbModal, private compiler: Compiler, private toast: ToastrService, private utilService: UtilService) { }

  ngOnInit(): void {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.lastIndexOf(Constants.LOCALSTORAGE_KEYS.CONFIGURATOR_WIDGET_PREFIX, 0) === 0)
        this.recentConfigurations.push(JSON.parse(localStorage.getItem(key)));
    }
  }

  /*
  ngAfterViewInit() {
    this.openFileInputSubscription = fromEvent(this.openFileInput.nativeElement, 'click').subscribe(() => console.log('element clicked'));
  }

  ngOnDestroy() {
    this.openFileInputSubscription.unsubscribe();
  }
  openLoadConfiguration() {
    this.openFileInput.nativeElement.click();
  }
  */

  openChooseWidgetType(): void {
    this.modal.open(WidgetTypeChooserComponent, { size: 'lg' }).result.then((result) => {
      console.debug("WidgetConfiguratorComponent: openChooseWidgetType OK", result);
      this.w = result.widget;
      if (this.w) {
        this.w.params["debug"].demo = true;
        if (!this.currentConfiguration || !this.currentConfiguration.title)
          this.currentConfiguration = { title: "New Configuration", "widgetSection": result.section }

        this.params = this.w.getParamsGrouped();
        this.createWidgetLive();
        this.saveConfigurationToStorage();
      }
      console.debug(this.params);
    }, (reason) => {
      console.debug("WidgetConfiguratorComponent: openChooseWidgetType CANCEL");
    });
  }

  openWidgetCodeExport(): void {
    const modalRef = this.modal.open(WidgetCodeExportComponent, { size: 'xl' });
    modalRef.componentInstance.widget = this.w;
  }
  openParamDialog(widget, section, param): void {
    console.debug("openParamDialog", param);
    let size = 'lg';
    if (param.value.type == "inputTexts" || param.value.type == "inputColors" || param.value.type == "inputDatasetcolumns" || param.value.type == "inputDatasetcolumns")
      size = 'xl';

    const modalRef = this.modal.open(WidgetParamConfigComponent, { size: WidgetParams.paramTypes[param.value.type].modalSize });
    modalRef.componentInstance.widget = widget;
    modalRef.componentInstance.s = section;
    modalRef.componentInstance.p = param;
    modalRef.componentInstance.modalParams = WidgetParams.paramTypes[param.value.type].modalParams;


    modalRef.result.then((result) => {
      console.debug("WidgetConfiguratorComponent: openChooseWidgetType OK", result);
      this.w.params[param.value.name].demo = result;
      this.createWidgetLive();
    }, (reason) => {
      console.debug("WidgetConfiguratorComponent: openChooseWidgetType CANCEL");
    });

    this.saveConfigurationToStorage();
  }

  createWidgetLive() {
    console.debug("createWidgetLive", this.w);

    let liveComponent = this.w.createComponent("data", false);
    const data = liveComponent.data
    const template = liveComponent.code
    const style = liveComponent.style

    //data = liveComponent.data;

    console.debug("data", data);
    console.debug("template", template);
    class TemplateComponent {

      @ViewChild('target', { static: false, read: ViewContainerRef }) public target;

      data: any;
      related: any;
      constructor() {
        setTimeout(() => {
          this.data = data;
          //this.related = relatedData;
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
    this.widgetLiveContainer.clear();
    this.widgetLiveContainer.createComponent(factory);
  }

  saveConfigurationToFile(): void {
    const filename = this.currentConfiguration.title + ".json";
    const content = this.prepareToSaveConfiguration();
    this.utilService.saveFile(content, filename);
    this.toast.show("Configuration Saved", null, {
      timeOut: 1000,
    });
  }

  saveConfigurationToStorage(): void {
    const filename = this.currentConfiguration.title + ".json";
    const content = this.prepareToSaveConfiguration();
    localStorage.setItem(Constants.LOCALSTORAGE_KEYS.CONFIGURATOR_WIDGET_PREFIX + this.currentConfiguration.title, JSON.stringify(this.currentConfiguration))
  }

  prepareToSaveConfiguration(): string {
    if (this.currentConfiguration) {
      const d = new Date();
      this.currentConfiguration.date = ("0" + d.getUTCDate()).slice(-2) + "/" +
        ("0" + (d.getUTCMonth() + 1)).slice(-2) + "/" +
        d.getUTCFullYear() + " " +
        ("0" + d.getUTCHours()).slice(-2) + ":" +
        ("0" + d.getUTCMinutes()).slice(-2);

      this.currentConfiguration.widgetType = this.w.key;
      this.currentConfiguration.widgetParamValues = {}
      Object.keys(this.w.params).forEach(k => {
        if (this.w.params[k].demo)
          this.currentConfiguration.widgetParamValues[k] = this.w.params[k].demo;
      });

    }
    return JSON.stringify(this.currentConfiguration);
  }



  loadConfigurationFromFile(e): void {
    console.debug("loadConfigurationFromFile", e.target.files[0]);
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.loadConfiguration(fileReader.result.toString());
    }
    fileReader.readAsText(e.target.files[0]);
  }

  loadConfigurationFromStorage(title: string): void {
    const loadedConfiguration = localStorage.getItem(Constants.LOCALSTORAGE_KEYS.CONFIGURATOR_WIDGET_PREFIX + title);
    this.loadConfiguration(loadedConfiguration);

  }

  loadConfiguration(loadedConfiguration: string): void {
    this.toolbarSetting.loadDropdown = false;
    this.currentConfiguration = JSON.parse(loadedConfiguration);
    this.w = Widgets[this.currentConfiguration.widgetSection][this.currentConfiguration.widgetType];
    if (this.currentConfiguration.widgetParamValues) {
      Object.keys(this.currentConfiguration.widgetParamValues).forEach(k => {
        if (this.w.params[k])
          this.w.params[k].demo = this.currentConfiguration.widgetParamValues[k];
      });
    }
    this.createWidgetLive();
    this.configTab = "params";
    this.params = this.w.getParamsGrouped();
  }
}
