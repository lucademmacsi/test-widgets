import { Component, OnInit } from '@angular/core';
import { YuccaMetadataService } from 'projects/yucca-reference/src/app/services/yucca-metadata.service';
import { Observable } from 'rxjs';
import { AbstractParamTypeComponent } from '../abstract-param-type/abstract-param-type.component';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'yucca-input-datasetcode',
  templateUrl: './input-datasetcode.component.html',
  styleUrls: ['./input-datasetcode.component.sass']
})
export class InputDatasetcodeComponent extends AbstractParamTypeComponent implements OnInit {

  constructor(protected metadataService: YuccaMetadataService) { super(); };

  faInfo = faInfo;
  datasetcodes: Array<string>;
  loading: boolean;
  errorMessage: any;
  warningMessage: any;

  ngOnInit(): void {
    this.loading = true;
    this.datasetcodes = new Array<string>();
    var tenantcode: string = (this.s.params.filter(param => param.name == "tenantcode"))[0].demo;

    if (!tenantcode) {
      this.loading = false;
      this.warningMessage = { title: "input_datasetcode_no_tenant_title", message: "input_datasetcode_no_tenant_message" };
    } else {
      this.metadataService.loadDatasets(tenantcode).subscribe(datasets => {
        if (datasets.count == 0) {
          this.loading = false;
          this.warningMessage = { title: "input_datasetcode_no_datasets_title", message: "input_datasetcode_no_datasets_message" }
        } else {
          datasets.metadata.forEach(dataset => {
            if (dataset.dataset) this.datasetcodes.push(dataset.dataset.code);
          });
          this.datasetcodes = this.datasetcodes.sort();
          console.debug("datasetcodes", this.datasetcodes);
          this.loading = false;
        }
      }, error => {
        console.log("loadDatasets SERVER_ERROR", error);
        this.loading = false;
        this.errorMessage = { title: "input_datasetcode_server_error_title", message: "input_datasetcode_server_error_message" };
      });
    }

    if (this.p.value.demo) { // If we want to edit
      this.value = this.p.value.demo;
      this.apply();
    }
  }

  search = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 2),
    map(term => this.datasetcodes.filter(datasetcode => new RegExp(term, 'mi').test(datasetcode)).slice(0, 10))
  )
  getValue() { }
} 
