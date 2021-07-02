import * as types from '../types/vehiclePatch';
import VehicleService from '../../services/VehicleEntry';

export const patchVehicleDetails = (uuid: string, data: any) => (
  dispatch: any,
) => {
  dispatch({
    type: types.VEHICLE_PATCH_LOADING,
  });

  return VehicleService.patchVehicleDetails(uuid, data)
    .then((response: any) => {
      dispatch({
        type: types.VEHICLE_PATCH_SUCCESS,
        payload: response,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.VEHICLE_PATCH_FAILED,
        payload: err.data,
      });
    });
};
