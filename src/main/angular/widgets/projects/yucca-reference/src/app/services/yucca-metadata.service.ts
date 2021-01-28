import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YuccaMetadataService {

  constructor(private httpClient: HttpClient) { }
  public loadDatasetMetadata(tenantcode: string, datasetcode: string, usertoken: string) {
    console.debug("loadMetadata", datasetcode);

    const url = environment.YUCCA_METADATAAPI_BASE_URL + "detail/" + tenantcode + "/" + datasetcode + '?';
    console.debug("loadMetadata url", url);

    let headers = new HttpHeaders();
    if (usertoken) {
      headers = headers.set("Authorization", "Bearer " + usertoken);
    }

    return this.httpClient.get<any>(url, { headers: headers });
  };

  public loadTenantcodes() {
    console.debug("loadTenantcodes");

    const url = environment.YUCCA_METADATAAPI_BASE_URL + "v02/search?rows=0&facet.field=tenantCode";
    console.debug("loadTenantcodes url", url);

    let headers = new HttpHeaders();

    // TODO Aggiungere Auth service per gestire userToken
    /*if (usertoken) {
      headers = headers.set("Authorization", "Bearer " + usertoken);
    }*/

    return this.httpClient.get<any>(url, { headers: headers });
  };

  public loadDatasets(tenantcode: string) {
    console.debug("loadDatasets");

    var url = environment.YUCCA_METADATAAPI_BASE_URL + "v02/search?rows=100000";
    if (tenantcode) {
      url += '&tenant=' + tenantcode;
    }
    console.debug("loadDatasetcodes url", url);

    let headers = new HttpHeaders();

    // TODO Aggiungere Auth service per gestire userToken
    /*if (usertoken) {
      headers = headers.set("Authorization", "Bearer " + usertoken);
    }*/

    return this.httpClient.get<any>(url, { headers: headers });
  };

}
