import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {

  constructor(private httpClient: HttpClient) { }

  public getDatasetMetadata(tenantcode: string, datasetcode: string, usertoken: string) {
    console.debug("getDatasetMetadata", datasetcode);

    const url = environment.YUCCA_METADATA_API_BASE_URL + "detail/" + tenantcode + "/" + datasetcode + '?';
    console.debug("getDatasetMetadata url", url);

    let headers = new HttpHeaders();
    if (usertoken) {
      headers = headers.set("Authorization", "Bearer " + usertoken);
    }

    return this.httpClient.get<any>(url, { headers: headers });
  }

  public getStreamMetadata(tenantcode: string, streamcode: string, smartobjectcode: string, usertoken: string) {
    console.debug("getStreamMetadata", streamcode);
    const url = environment.YUCCA_METADATA_API_BASE_URL + "detail/" + tenantcode + "/" + smartobjectcode + "/" + streamcode + '?';
    console.debug("getStreamMetadata URL", url);

    let headers = new HttpHeaders();
    if (usertoken) {
      headers = headers.set("Authorization", "Bearer " + usertoken);
    }

    return this.httpClient.get<any>(url, { headers: headers });
  }
}
