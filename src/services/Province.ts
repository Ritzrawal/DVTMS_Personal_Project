import querystring from 'query-string';

import Http from './Http';

import {
  IProvinceResponse,
  IDistrictResponse,
  IMunicipalityMetropolitanResponse,
} from '../interfaces/IProvince';

const http = new Http();

export default class VehicleService {
  static getProvince() {
    return http.get<IProvinceResponse>({
      endpoint: `api/v1/province/`,
    });
  }

  static getDistrict(args: { province__slug?: string }) {
    let query = querystring.stringify(args);
    return http.get<IDistrictResponse>({
      endpoint: `/api/v1/province/district/?${query}`,
    });
  }

  static getMunicipalityMetropolitan(args: { district__slug?: string }) {
    let query = querystring.stringify(args);
    return http.get<IMunicipalityMetropolitanResponse>({
      endpoint: `/api/v1/province/municipality-metropolitan/?${query}`,
    });
  }

}
