import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';

import { Constants } from '../yucca-widgets.constants'
import { OdataResponse } from '../model/odata-response';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  public loadSingleData(collection: string, dataset_code: string, user_token: string, internalId: string, apiDataUrl: string, useCache: string) {
    if (!apiDataUrl)
      apiDataUrl = Constants.API_DATA_URL;
    const dataUrl = "https:" + apiDataUrl + dataset_code + "/" + collection + "('" + internalId + "')?$format=json";

    let headers = new HttpHeaders();
    if (user_token) {
      headers = headers.set("Authorization", "Bearer " + user_token);
    }
    // FIXME use cache
    return this.httpClient.get<OdataResponse>(dataUrl, { headers: headers });

  };

  public loadData(collection: string, dataset_code: string, user_token: string, filter: string, skip: number, top: number,
    orderby: string, apiDataUrl: string, useCache: boolean) {
    console.debug("loadData", dataset_code);

    if (!apiDataUrl)
      apiDataUrl = Constants.API_DATA_URL;

    let dataUrl = "https:" + apiDataUrl + dataset_code + "/" + collection + "?$format=json";
    console.debug("filter", filter);
    if (filter && filter != null)
      dataUrl += '&$filter=' + filter;
    if (skip && skip != null)
      dataUrl += '&$skip=' + skip;
    if (top && top != null)
      dataUrl += '&$top=' + top;
    else
      dataUrl += '&$top=30';
    if (orderby && orderby != null)
      dataUrl += '&$orderby=' + orderby;

    let headers = new HttpHeaders();
    if (user_token) {
      headers = headers.set("Authorization", "Bearer " + user_token);
    }
    // FIXME use cache
    return this.httpClient.get<OdataResponse>(dataUrl, { headers: headers });
  };

  public loadDataStats(collection: string, dataset_code: string, user_token: string, time_group_by: string, time_group_operators: string,
    time_group_filter: string, skip: number, top: number, orderby: string, apiDataUrl: string, useCache: boolean) {

    console.debug("loadDataStats", collection, dataset_code, user_token, time_group_by, time_group_operators, time_group_filter, skip, top, orderby);
    if (!apiDataUrl)
      apiDataUrl = Constants.API_DATA_URL;

    let dataUrl = "https:" + apiDataUrl + dataset_code + "/" + collection + "?$format=json";

    if (time_group_by && time_group_by != null)
      dataUrl += '&timeGroupBy=' + time_group_by;
    if (time_group_operators && time_group_operators != null)
      dataUrl += '&timeGroupOperators=' + time_group_operators;
    if (time_group_filter && time_group_filter != null)
      dataUrl += '&timeGroupFilter=' + time_group_filter;
    if (skip && skip != null)
      dataUrl += '&$skip=' + skip;
    if (top && top != null)
      dataUrl += '&$top=' + top;
    else
      dataUrl += '&$top=1000';
    if (orderby && orderby != null)
      dataUrl += '&$orderby=' + orderby;

    let headers = new HttpHeaders();
    if (user_token) {
      headers = headers.set("Authorization", "Bearer " + user_token);
    }
    // FIXME use cache
    return this.httpClient.get<OdataResponse>(dataUrl, { headers: headers });

  };


  public loadDataGrouped(collection: string, dataset_code: string, user_token: string, group_by: string, group_operators: string,
    group_filter: string, skip: number, top: number, orderby: string, apiDataUrl: string, useCache: boolean) {
    // groupBy=provincia
    // groupOperators=sum,flag_entro_target;sum,flag_entro_doppio_target;
    // operators avg, sum, min, max
    console.debug("loadDataGrouped", collection, dataset_code, user_token, group_by, group_operators, group_filter, skip, top, orderby);

    if (!apiDataUrl)
      apiDataUrl = Constants.API_DATA_URL;

    let dataUrl = "https:" + apiDataUrl + dataset_code + "/" + collection + "?$format=json";

    if (group_by && group_by != null)
      dataUrl += '&groupBy=' + group_by;
    if (group_operators && group_operators != null)
      dataUrl += '&groupOperators=' + group_operators;
    if (group_filter && group_filter != null)
      dataUrl += '&groupFilter=' + group_filter;
    if (skip && skip != null)
      dataUrl += '&$skip=' + skip;
    if (top && top != null)
      dataUrl += '&$top=' + top;
    else
      dataUrl += '&$top=1000';
    if (orderby && orderby != null)
      dataUrl += '&$orderby=' + orderby;

    let headers = new HttpHeaders();
    if (user_token) {
      headers = headers.set("Authorization", "Bearer " + user_token);
    }
    // FIXME use cache
    return this.httpClient.get<OdataResponse>(dataUrl, { headers: headers });

  };

  public getDataEntitiesStats(dataset_code: string, request_token: string, group_by: string, group_operators: string, group_filter: string,
    skip: number, top: number, orderby: string, apiDataUrl: string, useCache: boolean) {
    return this.loadDataGrouped('DataEntitiesStats', dataset_code, request_token, group_by, group_operators, group_filter, skip, top, orderby, apiDataUrl, useCache);
  };

  public getMeasuresStats = function (dataset_code: string, request_token: string, time_group_by: string, time_group_operators: string,
    time_group_filter: string, skip: number, top: number, orderby: string, apiDataUrl: string, useCache: boolean) {
    return this.loadDataStats('MeasuresStats', dataset_code, request_token, time_group_by, time_group_operators, time_group_filter, skip, top, orderby, apiDataUrl, useCache);
  };

  public getSocialFeeds = function (dataset_code: string, user_token: string, filter: string, skip: number, top: number,
    orderby: string, apiDataUrl: string, useCache: boolean) {
    return this.loadData('SocialFeeds', dataset_code, user_token, filter, skip, top, orderby, apiDataUrl, useCache);
  };

  public getMeasures = function (dataset_code: string, user_token: string, filter: string, skip: number, top: number,
    orderby: string, apiDataUrl: string, useCache: boolean) {
    return this.loadData('Measures', dataset_code, user_token, filter, skip, top, orderby, apiDataUrl, useCache);
  };

  public getDataEntities = function (dataset_code: string, user_token: string, filter: string, skip: number, top: number, orderby: string,
    apiDataUrl: string, useCache: boolean) {
    var collection = 'DataEntities';
    if (dataset_code && dataset_code.startsWith("ds_"))
      collection = 'Measures';
    return this.loadData(collection, dataset_code, user_token, filter, skip, top, orderby, apiDataUrl, useCache);
  };

  public getSocialFeedsStats = function (dataset_code: string, user_token: string, time_group_by: string, time_group_operators: string,
    time_group_filter: string, skip: number, top: number, orderby: string, apiDataUrl: string, useCache: boolean) {
    return this.loadDataStats('SocialFeedsStats', dataset_code, user_token, time_group_by, time_group_operators, time_group_filter, skip, top, orderby, apiDataUrl, useCache);
  };

  public getMultipleDataEnties = function (dataset_code: string, user_token: string, filter: string, orderby: string, maxData: number,
    apiDataUrl: string, useCache: boolean) {
    if (maxData > 10000)
      maxData = 10000;
    let numOfLoop = Math.floor(maxData / 1000) + 1;

    console.debug("numOfLoop", numOfLoop);

    var httpCalls = [];
    var top = 1000;
    for (var i = 0; i < numOfLoop; i++) {
      httpCalls.push(this.getDataEntities(dataset_code, user_token, filter, i * top, top, orderby, apiDataUrl, useCache));

    }
    return forkJoin(httpCalls);
  };

  public getSingleSocialFeeds = function (dataset_code: string, user_token: string, internalId: string, apiDataUrl: string, useCache: boolean) {
    return this.loadSingleData('SocialFeeds', dataset_code, user_token, internalId, apiDataUrl, useCache);
  };

  public getSingleMeasures = function (dataset_code: string, user_token: string, internalId: string, apiDataUrl: string, useCache: boolean) {
    return this.loadSingleData('Measures', dataset_code, user_token, internalId, apiDataUrl, useCache);
  };

  public getSingleDataEntities = function (dataset_code: string, user_token: string, internalId: string, apiDataUrl: string, useCache: boolean) {
    return this.loadSingleData('DataEntities', dataset_code, user_token, internalId, apiDataUrl, useCache);
  };

  public downloadCSV = function (csv: any, filename: string) {
    var csvFile = new Blob([csv], { type: "text/csv" });
    var downloadLink = document.createElement("a");
    // File name
    downloadLink.download = filename;
    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);
    // Hide download link
    downloadLink.style.display = "none";
    // Add the link to DOM
    document.body.appendChild(downloadLink);
    // Click download link
    downloadLink.click();
    document.body.removeChild(downloadLink);

    return false;
  };

  public checkParams(paramsList: any, isOptional): string[] {
    var errors = [];
    paramsList.forEach(param => {
      if (!isOptional && !param.param) {
        errors.push("The parameter <strong>" + param.name + "</strong> is required");
      }
      else if (param.param && typeof (param.param) != param.type) {
        errors.push("The param  <strong>" + param.name + "</strong> has a wrong type. Expected type <strong>" +
          param.type + (param.objectType ?? "") + "</strong>");
      }
    });

    return errors;
  }

  public checkAlternatives(paramsList: Array<any>): string[] {
    var errors = [];
    if (!paramsList[0].param) {
      if (!paramsList[1].param)
        errors.push("Param required missing: at least one parameter between <strong>" + paramsList[0].name +
          " and <strong>" + paramsList[1].name + "</strong>");
      else if (typeof (paramsList[1].param) != paramsList[1].type)
        errors.push("The param <strong>" + paramsList[1].name + "</strong> has a wrong type. Expected type <strong>" +
          paramsList[1].type + (paramsList[1].objectType ?? "") + "</strong>");
    }
    else if (!paramsList[1].param) {
      if (typeof (paramsList[0].param) != paramsList[0].type)
        errors.push("The param <strong>" + paramsList[0].name + "</strong> has a wrong type. Expected type <strong>" +
          paramsList[0].type + (paramsList[0].objectType ?? "") + "</strong>");
    }
    else if (typeof (paramsList[0].param) != paramsList[0].type && typeof (paramsList[1].param) != paramsList[1].type) {
      errors.push("The param <strong>" + paramsList[0].name + "</strong> has a wrong type. Expected type <strong>" +
        paramsList[0].type + (paramsList[0].objectType ?? "") + "</strong>, or the param <strong>" + paramsList[1].name +
        "</strong> has a wrong type. Expected type <strong>" + paramsList[1].type + (paramsList[1].objectType ?? "") + "</strong>");
    };
    return errors;
  }



}
