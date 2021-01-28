import { Component, OnInit } from '@angular/core';
import { YuccaMetadataService } from 'projects/yucca-reference/src/app/services/yucca-metadata.service';
import { Observable } from 'rxjs';
import { AbstractParamTypeComponent } from '../abstract-param-type/abstract-param-type.component';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'yucca-input-tenantcode',
  templateUrl: './input-tenantcode.component.html',
  styleUrls: ['./input-tenantcode.component.sass']
})
export class InputTenantcodeComponent extends AbstractParamTypeComponent implements OnInit {

  constructor(protected metadataService: YuccaMetadataService) { super(); };

  faInfo = faInfo;
  tenantcodes: Array<string>;
  loading: boolean;
  serverError: any;

  ngOnInit(): void {
    this.loading = true;
    this.tenantcodes = new Array<string>();
    this.metadataService.loadTenantcodes().subscribe(tenantcodes => {
      this.tenantcodes = Object.keys(tenantcodes.facetCount.facetFields.tenantCode.facetItems).sort();
      this.loading = false;
      console.debug("tenantcodes", this.tenantcodes);
    }, error => {
      this.loading = false;
      this.serverError = error;
    });

    if (this.p.value.demo) { // If we want to edit
      this.value = this.p.value.demo;
      this.apply();
    }
  }

  search = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 2),
    map(term => this.tenantcodes.filter(tenantcode => new RegExp(term, 'mi').test(tenantcode)).slice(0, 10))
  )

  getValue() { }

}
