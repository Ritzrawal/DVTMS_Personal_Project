import * as types from '../types/vehiclePatch';

const initialState: any = {
  loading: true,
  success: false,
  data: [],
  error: [],
};

const patchVehicle = (state = initialState, action: any) => {
  switch (action.type) {
    case types.VEHICLE_PATCH_LOADING:
      return {
        ...state,
        loading: true,
      };

    case types.VEHICLE_PATCH_SUCCESS:
      return {
        ...state,
        loading: true,
        data: action.payload,
      };

    case types.VEHICLE_PATCH_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default patchVehicle;
