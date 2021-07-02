import Http from './Http';
import {
  IVehiclePartialInput,
  IVehicle,
} from '../interfaces/IVehicleEntry';

const http = new Http();

export default class VehicleService {
  static partialUpdate(uuid: string, args: IVehiclePartialInput) {
    return http.patch({
      endpoint: `api/v1/core/vehicle/${uuid}/`,
      payload: args,
    });
  }

  static getById(uuid: string) {
    return http.get<IVehicle>({
      endpoint: `api/v1/core/vehicle/${uuid}/`,
    });
  }

}
