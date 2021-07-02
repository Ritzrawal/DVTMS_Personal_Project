import querystring from 'query-string';

import Http from './Http';
import {
  IImportingGroup,
  IImportingGroupPagingInput,
} from '../interfaces/IImportingGroup';
import {
  IPagingResponse,
} from '../interfaces/IPaging';

const http = new Http();

export default class ImportingGroupService {
  static getImportingVehicles(args: IImportingGroupPagingInput) {
    let query = querystring.stringify(args);
    return http.get<IPagingResponse<IImportingGroup>>({
      endpoint: `api/v1/importing-group/?${query}`
    });
  }
}
