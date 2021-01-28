import { Component, OnInit } from '@angular/core';
import { YuccaMetadataService } from 'projects/yucca-reference/src/app/services/yucca-metadata.service';
import { AbstractParamTypeComponent } from '../abstract-param-type/abstract-param-type.component';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-input-datasetcolumns',
  templateUrl: './input-datasetcolumns.component.html',
  styleUrls: ['./input-datasetcolumns.component.sass']
})
export class InputDatasetcolumnsComponent extends AbstractParamTypeComponent {
  constructor(protected metadataService: YuccaMetadataService) { super(); };

  loading: boolean;
  columns: Array<any>;
  columnsHeaders: Array<string>;
  warningMessage: any;
  errorMessage: any;
  faInfo = faInfo;

  suggestColumn;
  column: { key: string, label: string, countingMode: string } = { key: null, label: null, countingMode: null };
  datasetColumns = [];

  ngOnInit(): void {
    this.loading = true;
    this.columns = new Array<any>();
    var tenantcode: string = (this.widget.params.tenantcode.demo);
    var datasetcode: string = (this.widget.params.datasetcode.demo);

    if (!tenantcode || !datasetcode) {
      this.loading = false;
      this.warningMessage = { title: "input_datasetcolumn_tenant_or_datasetcode_missing_title", message: "input_datasetcolumn_tenant_or_datasetcode_missing_message" };
    } else {
      this.metadataService.loadDatasetMetadata(tenantcode, datasetcode, null/* TODO fix per usertoken, spostarlo in authService*/).subscribe(datasetMetadata => {
        datasetMetadata.dataset.columns.forEach(column => {
          this.columns.push(column);
        });
        this.columnsHeaders = Object.keys(this.columns[0]);
        console.debug("Columns", this.columns);
        this.loading = false;
      }, error => {
        console.log("loadDatasets SERVER_ERROR", error);
        this.loading = false;
        this.errorMessage = { title: "input_datasetcolumn_server_error_title", message: "input_datasetcolumn_server_error_message" };
      });
    }

    if (this.p.value.demo) { // If we want to edit
      //this.value = this.p.value.demo;
      this.datasetColumns = JSON.parse(this.p.value.demo);
      this.apply();
    }

  }

  getValue() {

  }

  selectColumnKey() {
    if (this.suggestColumn && this.suggestColumn.name) {
      this.column.key = this.suggestColumn.name;
      this.column.label = this.suggestColumn.alias;
    }
    else
      this.column.key = this.suggestColumn;
    this.suggestColumn = null;
  }

  addColumn() {
    this.datasetColumns.push(Object.assign({}, this.column));
    this.value = JSON.stringify(this.datasetColumns);
    super.apply();
  }

  removeColumn(index) {
    this.datasetColumns.splice(index, 1);
    super.apply();
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.columns.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  formatter = (x) => { console.debug("x", x); return x.name };

}
