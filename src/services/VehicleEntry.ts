import querystring from 'query-string';

import Http from './Http';
import {
  IVehicleEntryResponse,
  IVehiclePagingInput,
  ISingleVehicleQueryInput,
  IVehicleEntry,
  IVehicleEntryUpdate,
  IVehicleEntryInput,
  IVehiclePagingInputFilter,
} from '../interfaces/IVehicleEntry';

const http = new Http();

export default class VehicleService {
  static getVehicleEntry(args: IVehiclePagingInput) {
    let query = querystring.stringify(args);
    return http.get<IVehicleEntryResponse>({
      endpoint: `api/v1/core/vehicle-entry/?${query}`,
    });
  }

  static getVehicleEntryFilter(args: IVehiclePagingInputFilter) {
    const { limit, offset, filter } = args;
    return http.get<IVehicleEntryResponse>({
      endpoint: `api/v1/core/vehicle-entry/?limit=${limit}&offset=${offset}&${filter}`,
    });
  }

  static patchVehicleDetails(uuid: string, args: any) {
    return http.patch({
      endpoint: `api/v1/core/vehicle/${uuid}/`,
      payload: args,
    });
  }

  static getVehiclesByEntry(args: ISingleVehicleQueryInput) {
    return http.get<IVehicleEntry>({
      endpoint: `api/v1/core/vehicle-entry/${args.uuid}`,
    });
  }

  static postVehicleEntry(args: IVehicleEntryInput) {
    return http.post<IVehicleEntry>({
      endpoint: `api/v1/core/vehicle-entry/`,
      payload: args,
    });
  }
  static updateVehicleEntry(payload: IVehicleEntryUpdate) {
    return http.put<IVehicleEntryUpdate>({
      endpoint: `api/v1/core/vehicle-entry/${payload.uuid}/`,
      payload,
    });
  }
  static updateSingleVehicleEntry(args: IVehicleEntryUpdate) {
    return http.patch<IVehicleEntryUpdate>({
      endpoint: `/api/v1/core/vehicle/${args.uuid}/`,
      payload: args.payload,
    });
  }

  static getVehicleEntryById(args: ISingleVehicleQueryInput) {
    return http.get<IVehicleEntry>({
      endpoint: `api/v1/core/vehicle-entry/${args.uuid}/entered-vehicle/`,
    });
  }
}
