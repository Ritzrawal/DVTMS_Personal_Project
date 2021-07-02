import * as types from '../types/vehicleEntry';
import VehicleService from '../../services/VehicleEntry';
import {
  IVehicleEntryResponse,
  IVehicleEntryUpdate,
} from '../../interfaces/IVehicleEntry';

export const updateVehicleEntry = (args: IVehicleEntryUpdate) => (
  dispatch: any,
) => {
  dispatch({
    type: types.VEHICLE_ENTRIES_UPDATE_LOADING,
  });

  return VehicleService.updateVehicleEntry({
    uuid: args.uuid,
    registration_number: args.registration_number,
    registration_date: args.registration_date,
    registered_by: args.registered_by,
    manufactured_year: args.manufactured_year,
    pargayapan_number: args.pargayapan_number,
    no_of_import: args.no_of_import,
    vehicles: args.vehicles,
    payload: args.payload,
  })
    .then((response: IVehicleEntryUpdate) => {
      dispatch({
        type: types.VEHICLE_ENTRIES_UPDATE_SUCCESS,
        payload: response,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.VEHICLE_ENTRIES_UPDATE_FAILED,
        error: err.data,
      });
    });
};
