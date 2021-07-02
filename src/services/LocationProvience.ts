import querystring from 'query-string';

import Http from './Http';
import {
  IImportingLocation,
  IImportingLocationPagingInput,
} from '../interfaces/IImportingLocation';
import {
  IPagingResponse,
} from '../interfaces/IPaging';

const http = new Http();

export default class ImportingLocationService {
  static getImportingLocations(args: IImportingLocationPagingInput) {
    let query = querystring.stringify(args);
    return http.get<IPagingResponse<IImportingLocation>>({
      endpoint: `api/v1/province/bhansar-office/?${query}`
    });
  }
}
