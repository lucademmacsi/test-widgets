// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const YUCCA_METADATAAPI_BASE_URL = "https://api.smartdatanet.it/metadataapi/api/";
const YUCCA_AUTH_URL = "https://userportal.smartdatanet.it/userportal/api/authorize?returnUrl=..%2Fdashboard%2Findex.html&typeAuth=personal";
const YUCCA_USER_INFO_URL = "https://int-userportal.smartdatanet.it/userportal/api/info";

export const environment = {
  production: false,
  YUCCA_METADATAAPI_BASE_URL: YUCCA_METADATAAPI_BASE_URL,
  YUCCA_AUTH_URL: YUCCA_AUTH_URL,
  YUCCA_USER_INFO_URL: YUCCA_USER_INFO_URL,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
