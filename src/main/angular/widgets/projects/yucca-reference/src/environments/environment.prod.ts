const YUCCA_METADATAAPI_BASE_URL = "https://api.smartdatanet.it/metadataapi/api/";
const YUCCA_AUTH_URL = "https://userportal.smartdatanet.it/userportal/api/authorize?returnUrl=..%2Fdashboard%2Findex.html&typeAuth=personal";
const YUCCA_USER_INFO_URL = "https://int-userportal.smartdatanet.it/userportal/api/info";

export const environment = {
  production: true,
  YUCCA_METADATAAPI_BASE_URL: YUCCA_METADATAAPI_BASE_URL,
  YUCCA_AUTH_URL: YUCCA_AUTH_URL,
  YUCCA_USER_INFO_URL: YUCCA_USER_INFO_URL,
};
