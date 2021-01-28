import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { DatasetColumn } from '../../../model/dataset-column';
import { DataService } from '../../../services/data.service';
import { MetadataService } from '../../../services/metadata.service';
import { PrepareDataService } from '../../../services/prepare-data.service';
import { BaseDatasetWidgetComponent } from '../base-dataset-widget/base-dataset-widget.component';

import * as c3 from 'c3';

import { SafeNumberPipe } from '../../../pipes/safe-number.pipe';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { ControlSelectComponent } from '../../controls/control-select/control-select.component';
import { SingleDatasetColumn } from '../../../model/single-dataset-column';
import { DebugMessages } from '../../../model/debug-messages';
import { BroadcastService } from '../../../services/broadcast.service';


@Component({
  selector: 'yucca-singledata',
  templateUrl: './singledata.component.html',
  styleUrls: ['./singledata.component.css']
})
export class SingleDataComponent extends BaseDatasetWidgetComponent {
  @Input() public valueColumn: SingleDatasetColumn;
  @Input() public label: String;
  @Input() public growAnimation: boolean;

  value: any;
  delta: any;
  v0: any;
  tmpValue: any;

  constructor(private dataService: DataService, private metadataService: MetadataService, private prepareDataService: PrepareDataService, private cdr: ChangeDetectorRef, protected broadcastService: BroadcastService) {
    super(dataService, metadataService, prepareDataService, broadcastService);
    this.widgetType = "YuccaSingleData";
    console.debug("Constructor singledata-component");
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  protected validateParams(): DebugMessages {
    this.debugMessages = super.validateParams();

    let required = [
      { param: this.valueColumn, type: "object", name: "valueColumn", objectType: ": { key: string; label: string; countingMode: string;" },
    ];

    Array.prototype.push.apply(this.debugMessages.errors, this.dataService.checkParams(required, false));

    let optional = [
      { param: this.label, type: "string", name: "label" },
      { param: this.growAnimation, type: "boolean", name: "growAnimation" },
    ];

    Array.prototype.push.apply(this.debugMessages.warnings, this.dataService.checkParams(optional, true));

    return this.debugMessages;
  }

  protected prepareData(): void {

    var safeNumberPipe = new SafeNumberPipe();
    var numberFormat = this.numberFormat;

    console.debug("prepareData colonna key: " + this.valueColumn.key);
    console.debug("prepareData growAnimation: " + this.valueColumn.growAnimation);

    this.isLoading = true;

    // console.debug("singledata alldata---DEBUG", this.allData);

    this.label = this.valueColumn.label;
    this.tmpValue = this.allData[0][this.valueColumn.key];
    this.tmpValue = 1 * this.tmpValue;

    this.delta = 1;
    this.v0 = 0;

    if (!isNaN(parseFloat(this.tmpValue))) {
      this.value = 0;
      if (this.growAnimation === true) {
        this.delta = this.tmpValue / 100;
        this.growloop();
      } else {
        this.value = this.tmpValue;
      }
    } else {
      this.value = this.tmpValue;
    }
    this.isLoading = false;
  }

  downloadData() {
    // console.debug("downloadData", this.chartData);
    // var csvData = this.prepareDataService.prepareSeriesKeyValue(this.groupByColumn.label, this.chartData);
    // this.dataService.downloadCSV(csvData, 'data.csv');
    return;
  }

  growloop() {

    setTimeout(() => {

      this.v0 += this.delta;

      this.value = this.v0; //$yuccaHelpers.render.safeNumber(v0, decimalValue, euroValue,formatBigNumber);

      //console.debug(`this.delta: ${this.delta}, v0: ${this.v0}, tmpValue: ${this.tmpValue}`);

      if ((this.delta > 0 && this.v0 < this.tmpValue) || (this.delta < 0 && this.v0 > this.tmpValue)) {
        this.growloop();
      } else {
        this.value = this.tmpValue; //$yuccaHelpers.render.safeNumber(v, decimalValue, euroValue,formatBigNumber);
      }
    }, 1);

  };
}
